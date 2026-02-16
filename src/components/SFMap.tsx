import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import * as d3 from 'd3';
import type { GeoPermissibleObjects } from 'd3';
import { CoffeeShop } from '../types';

interface SFMapProps {
  shops: CoffeeShop[];
  onSelectShop: (shop: CoffeeShop) => void;
  selectedShopName: string | null;
}

interface GeoFeature {
  type: string;
  properties: Record<string, unknown>;
  geometry: GeoPermissibleObjects;
}

interface GeoFeatureCollection {
  type: 'FeatureCollection';
  features: GeoFeature[];
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  shop: CoffeeShop | null;
}

const SFMap: React.FC<SFMapProps> = ({ shops, onSelectShop, selectedShopName }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [geoData, setGeoData] = useState<GeoFeatureCollection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, shop: null });
  const tooltipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Ref for second-tap detection on mobile (avoids stale closure)
  const lastTappedShopRef = useRef<string | null>(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/san-francisco.geojson')
      .then(response => {
        if (!response.ok) throw new Error(`Map data fetch failed: ${response.statusText}`);
        return response.json();
      })
      .then((data: GeoFeatureCollection) => setGeoData(data))
      .catch(err => {
        console.error("Error loading map data", err);
        setError("Could not load map data.");
      });
  }, []);

  // Detect touch device
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const renderMap = useCallback(() => {
    if (!geoData || !svgRef.current || !wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (width === 0 || height === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", width).attr("height", height).attr("viewBox", `0 0 ${width} ${height}`);

    // Tight padding so the map geography fills the container
    const padding = width < 400 ? 4 : 8;
    const projection = d3.geoMercator()
      .fitExtent(
        [[padding, padding], [width - padding, height - padding]],
        geoData as unknown as d3.GeoPermissibleObjects
      );

    const path = d3.geoPath().projection(projection);

    // Neighborhoods
    svg.append("g")
      .selectAll("path")
      .data(geoData.features)
      .enter().append("path")
      .attr("d", d => path(d.geometry) ?? '')
      .attr("fill", "#F0EFED")
      .attr("stroke", "#FAF9F7")
      .attr("stroke-width", width < 400 ? 1 : 1.5);

    const markers = svg.append("g");
    const validShops = shops.filter(s => s.coordinates && s.coordinates[0] !== 0);

    // Dot sizing -- larger on mobile for easier tap targets
    const baseR = width < 400 ? 6 : 5;
    const activeR = width < 400 ? 10 : 8;

    // Coffee dots
    markers.selectAll("circle")
      .data(validShops)
      .enter()
      .append("circle")
      .attr("cx", d => {
        const coords = projection(d.coordinates!);
        return coords ? coords[0] : 0;
      })
      .attr("cy", d => {
        const coords = projection(d.coordinates!);
        return coords ? coords[1] : 0;
      })
      .attr("r", d => d.name === selectedShopName ? activeR : baseR)
      .attr("fill", d => d.name === selectedShopName ? "#1C1917" : "#78716C")
      .attr("stroke", "#FAF9F7")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      // Desktop: hover shows tooltip
      .on("mouseenter", function(event, d) {
        if (isTouchDevice) return;
        d3.select(this).attr("r", activeR).attr("fill", "#1C1917");
        setTooltip({
          visible: true,
          x: event.clientX,
          y: event.clientY,
          shop: d,
        });
      })
      .on("mousemove", function(event) {
        if (isTouchDevice) return;
        setTooltip(prev => ({
          ...prev,
          x: event.clientX,
          y: event.clientY,
        }));
      })
      .on("mouseleave", function(_event, d) {
        if (isTouchDevice) return;
        const isSelected = d.name === selectedShopName;
        d3.select(this)
          .attr("r", isSelected ? activeR : baseR)
          .attr("fill", isSelected ? "#1C1917" : "#78716C");
        setTooltip({ visible: false, x: 0, y: 0, shop: null });
      })
      // Touch + click: on mobile, first tap shows tooltip, second tap (or direct click on desktop) opens booking
      .on("click", function(event, d) {
        if (isTouchDevice) {
          // Use ref for synchronous second-tap detection (avoids stale React state)
          if (lastTappedShopRef.current === d.name) {
            lastTappedShopRef.current = null;
            if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
            setTooltip({ visible: false, x: 0, y: 0, shop: null });
            onSelectShop(d);
            return;
          }
          // Otherwise show tooltip centered on the dot (viewport coords for portal)
          lastTappedShopRef.current = d.name;
          const coords = projection(d.coordinates!);
          if (coords && wrapperRef.current) {
            const wr = wrapperRef.current.getBoundingClientRect();
            if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
            setTooltip({
              visible: true,
              x: wr.left + coords[0],
              y: wr.top + coords[1],
              shop: d,
            });
            // Auto-hide after 3s and clear ref
            tooltipTimeoutRef.current = setTimeout(() => {
              lastTappedShopRef.current = null;
              setTooltip({ visible: false, x: 0, y: 0, shop: null });
            }, 3000);
          }
        } else {
          setTooltip({ visible: false, x: 0, y: 0, shop: null });
          onSelectShop(d);
        }
      });

  }, [geoData, shops, selectedShopName, onSelectShop, isTouchDevice]);

  // Hide tooltip when booking modal opens (e.g. from list or map click)
  useEffect(() => {
    if (selectedShopName) {
      lastTappedShopRef.current = null;
      if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
      setTooltip({ visible: false, x: 0, y: 0, shop: null });
    }
  }, [selectedShopName]);

  useEffect(() => { renderMap(); }, [renderMap]);

  useEffect(() => {
    const handleResize = (): void => { renderMap(); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderMap]);

  // Dismiss tooltip when tapping outside dots on mobile
  const handleWrapperClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const target = e.target as Element;
    if (target.tagName !== 'circle' && tooltip.visible) {
      lastTappedShopRef.current = null;
      setTooltip({ visible: false, x: 0, y: 0, shop: null });
    }
  }, [tooltip.visible]);

  const getTodayHours = (shop: CoffeeShop): string => {
    if (!shop.weekly_hours) return shop.hours;
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
    const today = days[new Date().getDay()];
    const h = shop.weekly_hours[today];
    if (!h || h.open === 'Closed' || h.open === 'N/A' || h.open === 'none' || h.open === 'Unknown') {
      return 'closed today';
    }
    return `${h.open} - ${h.close}`;
  };

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center rounded-sm border border-stone-200">
        <p className="text-stone-400 text-sm font-mono">{error}</p>
      </div>
    );
  }

  // Tooltip: render via portal with fixed position so it's never clipped by map overflow
  const showAbove = tooltip.y > 140; // flip to below when dot is near top of viewport
  const tooltipStyle: React.CSSProperties = tooltip.visible ? {
    position: 'fixed',
    left: Math.max(120, Math.min(tooltip.x, typeof window !== 'undefined' ? window.innerWidth - 120 : 400)),
    top: tooltip.y,
    transform: showAbove ? 'translate(-50%, -100%) translateY(-16px)' : 'translate(-50%, 0) translateY(16px)',
    zIndex: 9999,
    pointerEvents: isTouchDevice ? 'auto' : 'none',
  } : {};

  const handleTooltipTap = useCallback(() => {
    if (!isTouchDevice || !tooltip.shop) return;
    lastTappedShopRef.current = null;
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    setTooltip({ visible: false, x: 0, y: 0, shop: null });
    onSelectShop(tooltip.shop);
  }, [isTouchDevice, tooltip.shop, onSelectShop]);

  const tooltipEl = tooltip.visible && tooltip.shop ? (
    <div style={tooltipStyle} onClick={isTouchDevice ? handleTooltipTap : undefined} role={isTouchDevice ? 'button' : undefined} tabIndex={isTouchDevice ? 0 : undefined} onKeyDown={isTouchDevice ? (e) => e.key === 'Enter' && handleTooltipTap() : undefined}>
      <div className={`bg-white border border-stone-200 rounded-sm shadow-lg px-3 py-2 max-w-[200px] sm:max-w-[220px] ${isTouchDevice ? 'cursor-pointer touch-manipulation active:opacity-90' : ''}`}>
        <p className="text-[11px] sm:text-xs font-medium text-stone-900 leading-tight truncate">{tooltip.shop.name}</p>
        <p className="text-[10px] text-stone-400 mt-0.5 truncate">{tooltip.shop.address}</p>
        <div className="mt-1 pt-1 border-t border-stone-100">
          <p className="text-[10px] font-mono text-stone-500">{getTodayHours(tooltip.shop)}</p>
        </div>
        {isTouchDevice && (
          <p className="text-[9px] text-stone-300 mt-1">tap to book</p>
        )}
      </div>
    </div>
  ) : null;

  return (
    <div
      ref={wrapperRef}
      className="w-full h-full relative overflow-hidden rounded-sm touch-manipulation"
      onClick={handleWrapperClick}
    >
      {tooltipEl && createPortal(tooltipEl, document.body)}
      {!geoData && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-2 h-2 bg-stone-300 rounded-full animate-ping"></span>
        </div>
      )}
      <svg ref={svgRef} />

      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-white/80 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-sm border border-stone-100 pointer-events-none">
        <span className="text-[9px] sm:text-[10px] font-mono text-stone-400 uppercase">San Francisco</span>
      </div>
    </div>
  );
};

export default SFMap;
