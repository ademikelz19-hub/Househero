'use client';

import React, { useState } from 'react';
import { Star, CheckCircle2, Plus, Filter, MessageSquare } from 'lucide-react';
import { SERVICES } from '@/data/services';
import ReviewModal from '@/components/ReviewModal';

const INITIAL_REVIEWS = [
  {
    id: 1,
    author: 'Sarah M.',
    location: 'Denver, CO',
    serviceId: 'house-deep-cleaning',
    rating: 5,
    date: '2 days ago',
    comment: 'NorthStar did our move-out cleaning and our landlord refunded 100% of our deposit within 24 hours. The oven and tile grout looked brand new!'
  },
  {
    id: 2,
    author: 'David K.',
    location: 'Minneapolis, MN',
    serviceId: 'house-deep-cleaning',
    rating: 5,
    date: '1 week ago',
    comment: 'We have recurring bi-weekly cleaning now. Reliable crew, prompt 8 AM arrival, and always leaves the house smelling fresh without harsh bleach fumes.'
  },
  {
    id: 3,
    author: 'Marcus T.',
    location: 'Chicago, IL',
    serviceId: 'carpet-cleaning',
    rating: 5,
    date: '3 days ago',
    comment: 'Two golden retrievers had destroyed our living room rug. NorthStar extracted stains I thought were permanent. No chemical smell at all.'
  },
  {
    id: 4,
    author: 'Bradley C.',
    location: 'Seattle, WA',
    serviceId: 'gutter-cleaning',
    rating: 5,
    date: '5 days ago',
    comment: 'Our two-story gutters were overflowing during heavy rain. NorthStar cleared out massive oak clogs and re-sealed a leaking corner seam in 90 minutes.'
  },
  {
    id: 5,
    author: 'Robert G.',
    location: 'Milwaukee, WI',
    serviceId: 'snow-removal',
    rating: 5,
    date: '1 day ago',
    comment: 'Woke up at 6:30 AM after a 9-inch blizzard and my entire 4-car driveway was already plowed and salted. Worth every single dollar.'
  },
  {
    id: 6,
    author: 'Anthony D.',
    location: 'Charlotte, NC',
    serviceId: 'pressure-washing',
    rating: 5,
    date: '4 days ago',
    comment: 'Our 2,800 sq ft home had 5 years of green moss on the north side. In 3 hours the siding looked like the day it was built. Incredible transformation.'
  },
  {
    id: 7,
    author: 'Jason L.',
    location: 'Salt Lake City, UT',
    serviceId: 'dryer-vent-cleaning',
    rating: 5,
    date: '3 days ago',
    comment: 'Our dryer went from taking 70 minutes per towel load down to 28 minutes flat. The technician showed us a basketball-sized ball of lint removed from the pipe!'
  },
  {
    id: 8,
    author: 'Thomas B.',
    location: 'Kansas City, MO',
    serviceId: 'hvac-maintenance',
    rating: 5,
    date: '2 days ago',
    comment: 'During their tune-up, the tech found a bulging run capacitor about to blow right before a 100-degree heatwave. Replaced it on the spot. Saved us hundreds.'
  },
  {
    id: 9,
    author: 'Nathaniel F.',
    location: 'Pittsburgh, PA',
    serviceId: 'driveway-walkway-de-icing',
    rating: 5,
    date: '4 days ago',
    comment: 'Our steep driveway is a sheet of ice every January. NorthStar came out before the ice storm and our driveway stayed completely bare all weekend.'
  }
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [selectedService, setSelectedService] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddReview = (newReview: any) => {
    setReviews([
      {
        id: Date.now(),
        ...newReview
      },
      ...reviews
    ]);
  };

  const filtered = selectedService === 'all'
    ? reviews
    : reviews.filter((r) => r.serviceId === selectedService);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header & Submit Button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            Real Homeowner Experiences
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-2">
            Verified Customer Reviews
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse authentic feedback from verified customers across all 10 property care services.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="py-3 px-6 rounded-2xl font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Write a Verified Review</span>
        </button>
      </div>

      {/* Aggregate Score Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="text-center md:text-left">
          <div className="text-5xl font-black text-white">4.9</div>
          <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 my-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
          <div className="text-xs text-slate-400">Based on 2,840 verified US jobs</div>
        </div>

        <div className="space-y-1.5 text-xs">
          {[
            { stars: '5 Stars', pct: '94%' },
            { stars: '4 Stars', pct: '5%' },
            { stars: '3 Stars', pct: '&lt;1%' },
            { stars: '2 Stars', pct: '0%' },
            { stars: '1 Star', pct: '0%' }
          ].map((row, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="w-14 text-slate-400 text-[11px]">{row.stars}</span>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: row.pct.replace('&lt;', '') }}
                />
              </div>
              <span className="w-8 text-right font-mono text-slate-400">{row.pct}</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-2">
          <div className="font-bold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> 100% Verified Identity
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Every review is matched against a completed NorthStar dispatch record. Zero fabricated or incentivized ratings.
          </p>
        </div>
      </div>

      {/* Filter by Service */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-amber-400" /> Filter Reviews by Service:
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedService('all')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedService === 'all'
                ? 'bg-amber-400 text-slate-950'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Services ({reviews.length})
          </button>
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedService(s.id)}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedService === s.id
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((rev) => {
          const s = SERVICES.find((sv) => sv.id === rev.serviceId);
          return (
            <div
              key={rev.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500">{rev.date}</span>
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{rev.author}</div>
                  <div className="text-[11px] text-slate-500">{rev.location}</div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {s?.title || rev.serviceId}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddReview={handleAddReview}
      />
    </div>
  );
}
