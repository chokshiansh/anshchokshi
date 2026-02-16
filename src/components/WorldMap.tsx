import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import type { Topology, Objects } from 'topojson-specification';
import type { FeatureCollection, Geometry } from 'geojson';
import { TravelEntry } from '../types';

interface WorldMapProps {
  entries: TravelEntry[];
}

const WorldMap: React.FC<WorldMapProps> = ({ entries }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geoData, setGeoData] = useState<Topology<Objects<Geometry>> | null>(null);

  useEffect(() => {
    fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json')
      .then(response => response.json())
      .then((data: Topology<Objects<Geometry>>) => {
        setGeoData(data);
      });
  }, []);

  useEffect(() => {
    if (!geoData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 680;
    const height = 400;

    svg.selectAll("*").remove();

    const projection = d3.geoMercator()
      .scale(100)
      .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);
    
    const countries = feature(geoData, geoData.objects.countries) as unknown as FeatureCollection;

    svg.append("g")
      .selectAll("path")
      .data(countries.features)
      .enter().append("path")
      .attr("d", d => path(d.geometry) ?? '')
      .attr("fill", "#EAEAEA")
      .attr("stroke", "#FDFCF8")
      .attr("stroke-width", 0.5);

    svg.selectAll("circle")
      .data(entries)
      .enter()
      .append("circle")
      .attr("cx", d => projection(d.coordinates)![0])
      .attr("cy", d => projection(d.coordinates)![1])
      .attr("r", 4)
      .attr("fill", "#4A4A4A")
      .attr("opacity", 0.7)
      .attr("class", "cursor-pointer transition-opacity duration-300 hover:opacity-100")
      .append("title")
      .text(d => `${d.city}, ${d.country}`);

  }, [geoData, entries]);

  return (
    <div className="w-full overflow-hidden bg-[#F8F7F4] rounded-sm mb-8">
      <svg ref={svgRef} viewBox="0 0 680 400" className="w-full h-auto" />
    </div>
  );
};

export default WorldMap;
