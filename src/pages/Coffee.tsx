import React, { useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CoffeeShop, BookingData } from '../types';
import coffeeData from '../sf_coffee_shops_100.json';
import SFMap from '../components/SFMap';
import Confetti from '../components/Confetti';

// All shops with valid coordinates
const ALL_SHOPS: CoffeeShop[] = (coffeeData.coffee_shops as CoffeeShop[]).filter(
  s => s.coordinates && s.coordinates[0] !== 0
);

function pickRandom(arr: CoffeeShop[], n: number): CoffeeShop[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function getTodayHours(shop: CoffeeShop): string {
  if (!shop.weekly_hours) return shop.hours;
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
  const today = days[new Date().getDay()];
  const h = shop.weekly_hours[today];
  if (!h || h.open === 'Closed' || h.open === 'N/A' || h.open === 'none' || h.open === 'Unknown') {
    return 'closed today';
  }
  return `${h.open} – ${h.close}`;
}

const Coffee: React.FC = () => {
  const navigate = useNavigate();
  const [mapShops, setMapShops] = useState<CoffeeShop[]>(() => pickRandom(ALL_SHOPS, 30));
  const [selectedShop, setSelectedShop] = useState<CoffeeShop | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [listSearch, setListSearch] = useState('');

  const [bookingData, setBookingData] = useState<BookingData>({
    date: null, time: null, name: '', email: '', phone: '', note: ''
  });

  const handleRefresh = useCallback((): void => {
    setMapShops(pickRandom(ALL_SHOPS, 30));
    setSelectedShop(null);
  }, []);

  const handleSelectShop = useCallback((shop: CoffeeShop): void => {
    setSelectedShop(shop);
    setBookingData(prev => ({ ...prev, date: null, time: null }));
    setStep(1);
    setIsBookingOpen(true);
  }, []);

  const handleCloseBooking = (): void => {
    setIsBookingOpen(false);
    setTimeout(() => { setStep(1); setSelectedShop(null); }, 300);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!selectedShop) return;

    const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;
    if (formId) {
      try {
        await fetch(`https://formspree.io/f/${formId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            _replyto: bookingData.email,
            shop: selectedShop.name,
            address: selectedShop.address,
            date: bookingData.date,
            time: bookingData.time,
            name: bookingData.name,
            email: bookingData.email,
            phone: bookingData.phone || '(not provided)',
            note: bookingData.note || '(none)',
            _subject: `Coffee chat: ${bookingData.name} @ ${selectedShop.name}`,
          }),
        });
      } catch (err) {
        console.error('Failed to send booking email', err);
      }
    }

    setIsBookingOpen(false);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      navigate('/');
    }, 1000);
    setBookingData({ date: null, time: null, name: '', email: '', phone: '', note: '' });
    setSelectedShop(null);
  };

  const filteredList = useMemo(() => {
    if (!listSearch.trim()) return ALL_SHOPS;
    const q = listSearch.toLowerCase();
    return ALL_SHOPS.filter(s =>
      s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q)
    );
  }, [listSearch]);

  // 2 weeks (14 days) starting from tomorrow
  const nextDates = useMemo(() => {
    const dates: Date[] = [];
    for (let i = 1; i <= 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    return dates;
  }, []);

  // Weekdays (Mon–Fri): 2 PM – 8 PM; Weekends: 9 AM – 5 PM
  const availableTimes = useMemo(() => {
    if (!bookingData.date) return [];
    const d = new Date(bookingData.date);
    const day = d.getDay(); // 0 = Sun, 6 = Sat
    const isWeekend = day === 0 || day === 6;
    if (isWeekend) {
      return ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
    }
    return ['02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'];
  }, [bookingData.date]);

  return (
    <div className="relative flex flex-col">
      {showConfetti && <Confetti />}

      {/* Back link */}
      <div className="mb-6 sm:mb-8 flex-none">
        <Link
          to="/"
          className="text-stone-400 hover:text-black transition-colors text-sm font-mono flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> back
        </Link>
      </div>

      {/* Header row: text + actions */}
      <div className="flex items-end justify-between mb-5 sm:mb-6 flex-none">
        <p className="text-lg sm:text-xl text-stone-800 font-light max-w-sm">
          pick a spot, coffee is on me :)
        </p>
        <div className="flex items-center gap-1.5 ml-4 shrink-0">
          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            title="shuffle 30 random shops"
            className="p-1.5 rounded-sm border border-stone-200 text-stone-400 hover:text-stone-900 hover:border-stone-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
            </svg>
          </button>
          {/* List button */}
          <button
            onClick={() => setIsListOpen(true)}
            title="view all shops"
            className="p-1.5 rounded-sm border border-stone-200 text-stone-400 hover:text-stone-900 hover:border-stone-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Map */}
      <section className="flex flex-col">
        <div className="w-full aspect-[4/3] sm:aspect-[16/11] min-h-[280px] sm:min-h-[340px] bg-[#F5F4F2] rounded-sm border border-stone-200/60 overflow-hidden relative">
          <SFMap
            shops={mapShops}
            onSelectShop={handleSelectShop}
            selectedShopName={selectedShop?.name || null}
          />
        </div>
        <p className="mt-3 sm:mt-4 text-[10px] sm:text-[11px] text-stone-400 font-mono text-center">
          showing {mapShops.length} of {ALL_SHOPS.length} spots &middot; <span className="hidden sm:inline">hover</span><span className="sm:hidden">tap</span> for details &middot; refresh for new
        </p>
      </section>

      {/* ===== LIST MODAL ===== */}
      {isListOpen && (
        <>
          <div className="fixed inset-0 z-[60] bg-stone-900/20 backdrop-blur-sm" onClick={() => setIsListOpen(false)} />

          <div
            className="fixed z-[61] bg-white w-[calc(100%-2rem)] max-w-md sm:max-w-lg rounded-sm shadow-xl flex flex-col"
            style={{ top: '60%', left: '50%', transform: 'translate(-50%, -50%)', height: '65vh' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-5 pt-4 sm:pt-5 pb-3 border-b border-stone-100 flex-none">
              <div>
                <h3 className="text-sm font-medium text-stone-900">all coffee spots</h3>
                <p className="text-[11px] text-stone-400 font-mono mt-0.5">{ALL_SHOPS.length} places</p>
              </div>
              <button
                onClick={() => setIsListOpen(false)}
                className="text-stone-400 hover:text-black transition-colors text-lg leading-none p-1"
              >
                &times;
              </button>
            </div>

            {/* Search */}
            <div className="px-4 sm:px-5 py-3 border-b border-stone-100 flex-none">
              <input
                type="text"
                placeholder="search by name or address..."
                value={listSearch}
                onChange={e => setListSearch(e.target.value)}
                className="w-full text-sm text-stone-900 bg-stone-50 border border-stone-200 rounded-sm px-3 py-2 focus:outline-none focus:border-stone-400 placeholder:text-stone-300"
              />
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {filteredList.length === 0 ? (
                <p className="text-sm text-stone-400 text-center py-12">no matches found</p>
              ) : (
                filteredList.map((shop, i) => (
                  <button
                    key={`${shop.name}-${i}`}
                    onClick={() => {
                      setIsListOpen(false);
                      handleSelectShop(shop);
                    }}
                    className="w-full text-left px-4 sm:px-5 py-3 sm:py-3.5 border-b border-stone-50 hover:bg-stone-50 active:bg-stone-100 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[13px] sm:text-sm font-medium text-stone-900 truncate group-hover:text-black">
                          {shop.name}
                        </p>
                        <p className="text-[11px] text-stone-400 truncate mt-0.5">{shop.address}</p>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 shrink-0 mt-0.5">
                        {getTodayHours(shop)}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* ===== BOOKING MODAL ===== */}
      {isBookingOpen && selectedShop && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4">
          <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm" onClick={handleCloseBooking} />

          <div className="bg-white w-full max-w-sm sm:max-w-md p-5 sm:p-8 rounded-sm shadow-xl relative animate-in zoom-in-95 duration-300">
            <button
              onClick={handleCloseBooking}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-stone-400 hover:text-black transition-colors"
            >
              &times;
            </button>

            <div className="mb-4 sm:mb-6 border-b border-stone-100 pb-3 sm:pb-4">
              <h3 className="text-xl sm:text-2xl font-serif text-stone-900 italic">{selectedShop.name}</h3>
              <p className="text-xs sm:text-sm text-stone-500">{selectedShop.address}</p>
              <p className="text-[11px] font-mono text-stone-400 mt-1">today: {getTodayHours(selectedShop)}</p>
            </div>

            {step === 1 && (
              <div className="animate-in slide-in-from-right-4 duration-300">
                <h4 className="text-sm font-bold text-stone-900 mb-3 sm:mb-4">select date & time</h4>

                <div className="mb-4 sm:mb-6">
                  <label className="text-xs text-stone-400 mb-2 block uppercase tracking-wider">date</label>
                  <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {nextDates.map(date => {
                      const iso = date.toISOString().slice(0, 10);
                      const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                      const isSelected = bookingData.date === iso;
                      return (
                        <button
                          key={iso}
                          onClick={() => setBookingData(p => {
                            const next = { ...p, date: iso };
                            // Clear time if it won't be valid for the new date
                            const day = date.getDay();
                            const isWeekend = day === 0 || day === 6;
                            const weekdayTimes = ['02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'];
                            const weekendTimes = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
                            const valid = isWeekend ? weekendTimes : weekdayTimes;
                            if (p.time && !valid.includes(p.time)) next.time = null;
                            return next;
                          })}
                          className={`flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 rounded-sm border text-xs sm:text-sm transition-all ${
                            isSelected
                              ? 'border-stone-900 bg-stone-900 text-white'
                              : 'border-stone-200 text-stone-600 hover:border-stone-400'
                          }`}
                        >
                          {dateStr}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-6 sm:mb-8">
                  <label className="text-xs text-stone-400 mb-2 block uppercase tracking-wider">time slot</label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimes.map(time => {
                      const isSelected = bookingData.time === time;
                      return (
                        <button
                          key={time}
                          onClick={() => setBookingData(p => ({ ...p, time }))}
                          className={`px-2 py-2 text-center rounded-sm border text-xs transition-all ${
                            isSelected
                              ? 'border-stone-900 bg-stone-900 text-white'
                              : 'border-stone-200 text-stone-600 hover:border-stone-400'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  disabled={!bookingData.date || !bookingData.time}
                  onClick={() => setStep(2)}
                  className="w-full bg-stone-900 text-white py-2.5 sm:py-3 rounded-sm hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  lets go &rarr;
                </button>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="animate-in slide-in-from-right-4 duration-300">
                <h4 className="text-sm font-bold text-stone-900 mb-3 sm:mb-4">your details</h4>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <input
                    type="text"
                    placeholder="your name"
                    required
                    className="w-full border-b border-stone-200 py-2 text-stone-900 focus:outline-none focus:border-black bg-transparent placeholder:text-stone-300 text-sm sm:text-base"
                    value={bookingData.name}
                    onChange={e => setBookingData(p => ({ ...p, name: e.target.value }))}
                  />
                  <input
                    type="email"
                    placeholder="email address"
                    required
                    className="w-full border-b border-stone-200 py-2 text-stone-900 focus:outline-none focus:border-black bg-transparent placeholder:text-stone-300 text-sm sm:text-base"
                    value={bookingData.email}
                    onChange={e => setBookingData(p => ({ ...p, email: e.target.value }))}
                  />
                  <input
                    type="tel"
                    placeholder="phone number (optional)"
                    className="w-full border-b border-stone-200 py-2 text-stone-900 focus:outline-none focus:border-black bg-transparent placeholder:text-stone-300 text-sm sm:text-base"
                    value={bookingData.phone}
                    onChange={e => setBookingData(p => ({ ...p, phone: e.target.value }))}
                  />
                  <textarea
                    placeholder="anything specific you want to chat about?"
                    rows={3}
                    className="w-full border-b border-stone-200 py-2 text-stone-900 focus:outline-none focus:border-black bg-transparent placeholder:text-stone-300 resize-none text-sm sm:text-base"
                    value={bookingData.note}
                    onChange={e => setBookingData(p => ({ ...p, note: e.target.value }))}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 border border-stone-200 text-stone-500 py-2.5 sm:py-3 rounded-sm hover:bg-stone-50 transition-colors text-sm"
                  >
                    back
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] bg-stone-900 text-white py-2.5 sm:py-3 rounded-sm hover:bg-black transition-colors text-sm"
                  >
                    see ya soon
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Coffee;
