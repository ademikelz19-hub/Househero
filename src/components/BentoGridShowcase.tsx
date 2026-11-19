'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Layers,
  Home,
  Droplets,
  Snowflake,
  Wrench,
  Flame,
  CheckCheck,
  TrendingUp,
  Eye
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import InteractiveComparison from './InteractiveComparison';
import InteractiveQuickBooker from './InteractiveQuickBooker';

export default function BentoGridShowcase() {
  const [activePsi, setActivePsi] = useState<number>(3200);

  return (
    <section className="space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Craftsmanship Portfolio
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight mt-2">
            The Property Care <span className="text-gradient">Bento Showcase.</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-xl">
            Explore our flagship services rendered with hospital-grade equipment, certified technicians, and verified photographic audits.
          </p>
        </div>

        <Link
          href="/book"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all self-start md:self-end pulse-ring"
        >
          <span>Select Multiple Services</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* ASYMMETRIC BENTO GRID (Different Card Sizes & Interactive Widgets) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* 1. LARGE HERO BENTO (2 Columns Wide): LUXURY RESIDENTIAL INTERIOR DEEP CARE */}
        <SpotlightCard
          enableTilt={true}
          className="md:col-span-2 glass-card rounded-3xl border border-stone-200/80 shadow-depth-md hover:shadow-depth-xl group flex flex-col justify-between"
        >
          <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-t-3xl">
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85"
              alt="Luxury modern kitchen pristine deep clean"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent" />

            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-[11px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Most Requested
              </span>
              <span className="px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-200 text-[11px] font-semibold">
                64-Point Protocol
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block">
                Interior Care Standard
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                House &amp; Deep Residential Sanitization
              </h3>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Hospital-grade disinfection with Green Seal certified botanicals. From hand-scrubbed baseboards and oven descaling to HEPA backpack vacuum filtration safe for pets and children.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/50 text-[11px] font-bold text-stone-800 flex items-center gap-1.5">
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Zero-VOC Detergents</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/50 text-[11px] font-bold text-stone-800 flex items-center gap-1.5">
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Move-In / Move-Out</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/50 text-[11px] font-bold text-stone-800 flex items-center gap-1.5 col-span-2 sm:col-span-1">
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>GPS Check-In Crew</span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-stone-400 font-bold block">Starting USD Rate</span>
                <div className="text-2xl font-black text-stone-900 font-mono">$120 <span className="text-xs font-normal text-stone-500">USD</span></div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/services/house-deep-cleaning"
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold transition-colors"
                >
                  View Protocol
                </Link>
                <Link
                  href="/book"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Book Service
                </Link>
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* 2. MEDIUM TALL BENTO (1 Column Wide): PRESSURE WASHING WITH LIVE PSI DIAL */}
        <SpotlightCard
          enableTilt={true}
          className="glass-card rounded-3xl border border-stone-200/80 shadow-depth-md hover:shadow-depth-xl group flex flex-col justify-between"
        >
          <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
            <img
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=85"
              alt="High pressure water jetting stone surface"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase">
              Instant Curb Appeal
            </div>
            <div className="absolute bottom-3 left-3 text-white">
              <span className="text-[10px] uppercase text-amber-300 font-bold block">Exterior Restoration</span>
              <h3 className="text-lg font-black tracking-tight">Pressure Washing &amp; Soft-Wash</h3>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <p className="text-xs text-stone-600 leading-relaxed">
              Dual-method calibrated system: low 300 PSI soft-wash for siding/stucco and 4,000 PSI rotary scouring for flat concrete.
            </p>

            {/* Interactive PSI Mode Selector */}
            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-700">Surface Calibration:</span>
                <span className="font-black font-mono text-amber-600">{activePsi} PSI</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setActivePsi(350)}
                  className={`py-1 rounded-lg transition-colors cursor-pointer ${
                    activePsi === 350 ? 'bg-amber-500 text-white' : 'bg-white text-stone-600 border border-stone-200'
                  }`}
                >
                  Siding Soft
                </button>
                <button
                  type="button"
                  onClick={() => setActivePsi(2200)}
                  className={`py-1 rounded-lg transition-colors cursor-pointer ${
                    activePsi === 2200 ? 'bg-amber-500 text-white' : 'bg-white text-stone-600 border border-stone-200'
                  }`}
                >
                  Wood Deck
                </button>
                <button
                  type="button"
                  onClick={() => setActivePsi(4000)}
                  className={`py-1 rounded-lg transition-colors cursor-pointer ${
                    activePsi === 4000 ? 'bg-amber-500 text-white' : 'bg-white text-stone-600 border border-stone-200'
                  }`}
                >
                  Concrete 4K
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-stone-400 font-bold block">Starting at</span>
                <div className="text-xl font-black text-stone-900 font-mono">$140 <span className="text-xs font-normal text-stone-500">USD</span></div>
              </div>
              <Link
                href="/book"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-xs"
              >
                Book Now
              </Link>
            </div>
          </div>
        </SpotlightCard>

        {/* 3. MEDIUM BENTO (1 Column Wide): GUTTER CLEANING WITH AUDIT BADGE */}
        <SpotlightCard
          enableTilt={true}
          className="glass-card rounded-3xl border border-stone-200/80 shadow-depth-md hover:shadow-depth-xl group flex flex-col justify-between"
        >
          <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
            <img
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=85"
              alt="Clean roof and eave gutter line on architectural house"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-200 text-[10px] font-bold flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>Digital Photo Audit</span>
            </div>
            <div className="absolute bottom-3 left-3 text-white">
              <span className="text-[10px] uppercase text-amber-300 font-bold block">Storm Defense</span>
              <h3 className="text-lg font-black tracking-tight">Gutter Cleaning &amp; Flush</h3>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <p className="text-xs text-stone-600 leading-relaxed">
              Complete manual leaf sediment extraction, subterranean downspout jetting, and roof miter sealant inspections with timestamped photos.
            </p>

            <ul className="text-xs text-stone-600 space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Zero yard mess left behind</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Rubber ladder standoffs protect trim</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-stone-400 font-bold block">Starting at</span>
                <div className="text-xl font-black text-stone-900 font-mono">$135 <span className="text-xs font-normal text-stone-500">USD</span></div>
              </div>
              <Link
                href="/book"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-xs"
              >
                Book Now
              </Link>
            </div>
          </div>
        </SpotlightCard>

        {/* 4. LARGE BENTO (2 Columns Wide): WINTER SNOW REMOVAL & AUTOMATED 2-INCH TRIGGER */}
        <SpotlightCard
          enableTilt={true}
          className="md:col-span-2 glass-card rounded-3xl border border-stone-200/80 shadow-depth-md hover:shadow-depth-xl group flex flex-col justify-between"
        >
          <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-t-3xl">
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=85"
              alt="Pristine snow cleared driveway in winter storm"
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent" />

            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <Snowflake className="w-3.5 h-3.5" />
                24/7 Doppler Trigger
              </span>
              <span className="px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-200 text-[11px] font-semibold">
                Polyurethane Rubber Blades
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block">
                Sub-Zero Emergency Dispatch
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                Snow Removal &amp; Pet-Safe De-Icing
              </h3>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Automated fleet dispatch triggered at 2 inches of snow accumulation. Clean walkways, front porches, and multi-car driveways cleared before your 7:00 AM commute.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/50 text-[11px] font-bold text-stone-800 flex items-center gap-1.5">
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Stamped Concrete Safe</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/50 text-[11px] font-bold text-stone-800 flex items-center gap-1.5">
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Pet-Safe Magnesium Salt</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/50 text-[11px] font-bold text-stone-800 flex items-center gap-1.5 col-span-2 sm:col-span-1">
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Unlimited Pass $499</span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-stone-400 font-bold block">Starting Push Rate</span>
                <div className="text-2xl font-black text-stone-900 font-mono">$65 <span className="text-xs font-normal text-stone-500">USD</span></div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/services/snow-removal"
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold transition-colors"
                >
                  Details
                </Link>
                <Link
                  href="/book"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Book Service
                </Link>
              </div>
            </div>
          </div>
        </SpotlightCard>

      </div>

      {/* 5. INTERACTIVE BEFORE/AFTER SLIDER SECTION */}
      <div className="pt-6">
        <InteractiveComparison
          title="Verified Workmanship Transformation"
          subtitle="Slide the divider across to inspect our 4,000 PSI high-temperature surface cleaning and siding restoration."
          beforeImage="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=1200&q=80"
          afterImage="https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=1200&q=80"
          beforeLabel="Before Restoration"
          afterLabel="After House Hero Care"
        />
      </div>

      {/* 6. INTERACTIVE MULTI-SERVICE LIVE DISPATCH BUILDER (FULL WIDTH) */}
      <div className="pt-4">
        <InteractiveQuickBooker />
      </div>
    </section>
  );
}
