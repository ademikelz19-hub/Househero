'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, DollarSign, Clock, MapPin, CheckCircle } from 'lucide-react';
import { SERVICES } from '@/data/services';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

export default function GalleryPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filtered = selectedFilter === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === selectedFilter);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Visual Project Portfolio
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Before & After Project Showcase
        </h1>
        <p className="text-sm text-stone-700">
          Explore real property transformations across the United States. Slide each divider to see the power of our commercial equipment and certified technicians.
        </p>

        {/* Filter buttons */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pt-2">
          {[
            { id: 'all', label: 'All 10 Services' },
            { id: 'interior', label: 'Interior Care' },
            { id: 'exterior', label: 'Exterior & Yard' },
            { id: 'winter', label: 'Winter & Storm' },
            { id: 'systems', label: 'Systems & Safety' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === tab.id
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-white/90 backdrop-blur-xl text-stone-500 hover:text-white border border-amber-200/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-white/90 backdrop-blur-xl border border-amber-200/70 rounded-3xl p-6 shadow-xl space-y-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {s.category.toUpperCase()}
                </span>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
              </div>
              <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                ${s.caseStudyCost}.00 USD
              </span>
            </div>

            <BeforeAfterSlider
              beforeImage={s.beforeImage}
              afterImage={s.afterImage}
              beforeLabel="BEFORE"
              afterLabel="AFTER"
            />

            <div>
              <div className="text-xs font-bold text-stone-800">{s.caseStudyTitle}</div>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">{s.shortDesc}</p>
            </div>

            <div className="pt-3 border-t border-amber-200/70 flex items-center justify-between text-xs">
              <span className="text-stone-500">Duration: <strong>{s.avgDuration}</strong></span>
              <Link
                href={`/book?service=${s.id}`}
                className="py-2 px-4 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-1.5"
              >
                <span>Book This Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
