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
  Eye,
  Activity,
  Fan,
  Wind,
  Gauge
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import InteractiveComparison from './InteractiveComparison';
import InteractiveQuickBooker from './InteractiveQuickBooker';

export default function BentoGridShowcase() {
  const [activePsi, setActivePsi] = useState<number>(3200);

  return (
    <section className="space-y-12">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Real Technicians · Authentic Craftsmanship
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight mt-2">
            Tradesmen in Action <span className="text-gradient">Portfolio.</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-xl">
            Real photos of our vetted crews performing hospital-grade sanitation, 4,000 PSI pressure jetting, high-temp carpet extraction, and winter emergency clearing.
          </p>
        </div>

        <Link
          href="/book"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all self-start md:self-end pulse-ring"
        >
          <span>Book Multi-Service Visit</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 1. HORIZONTAL SLIDING MARQUEE TRACK (Continuous Live Dispatch Stream) */}
      <div className="relative overflow-hidden py-3 rounded-2xl bg-amber-50/50 border border-amber-200/50">
        <div className="animate-marquee-left flex items-center gap-4 whitespace-nowrap">
          {[
            { tag: 'DISPATCH #4821', title: 'Pressure Washing 4,000 PSI', city: 'Denver, CO', img: '/images/pressure-washing.jpg', price: '$140 USD' },
            { tag: 'DISPATCH #4822', title: '220°F Carpet Steam Clean', city: 'Minneapolis, MN', img: '/images/carpet-cleaning.jpg', price: '$129 USD' },
            { tag: 'DISPATCH #4823', title: '64-Pt House Deep Clean', city: 'Seattle, WA', img: '/images/house-cleaning.jpg', price: '$120 USD' },
            { tag: 'DISPATCH #4824', title: '2" Snow Plow Dispatch', city: 'Milwaukee, WI', img: '/images/snow-removal.jpg', price: '$65 USD' },
            { tag: 'DISPATCH #4825', title: 'Gutter Downspout Jetting', city: 'Chicago, IL', img: '/images/gutter-cleaning.jpg', price: '$135 USD' },
            { tag: 'DISPATCH #4826', title: 'HVAC CO & Coil Tune-Up', city: 'Kansas City, MO', img: '/images/hvac-maintenance.jpg', price: '$115 USD' },
            // Duplicate for seamless infinite loop
            { tag: 'DISPATCH #4821', title: 'Pressure Washing 4,000 PSI', city: 'Denver, CO', img: '/images/pressure-washing.jpg', price: '$140 USD' },
            { tag: 'DISPATCH #4822', title: '220°F Carpet Steam Clean', city: 'Minneapolis, MN', img: '/images/carpet-cleaning.jpg', price: '$129 USD' },
            { tag: 'DISPATCH #4823', title: '64-Pt House Deep Clean', city: 'Seattle, WA', img: '/images/house-cleaning.jpg', price: '$120 USD' },
            { tag: 'DISPATCH #4824', title: '2" Snow Plow Dispatch', city: 'Milwaukee, WI', img: '/images/snow-removal.jpg', price: '$65 USD' },
            { tag: 'DISPATCH #4825', title: 'Gutter Downspout Jetting', city: 'Chicago, IL', img: '/images/gutter-cleaning.jpg', price: '$135 USD' },
            { tag: 'DISPATCH #4826', title: 'HVAC CO & Coil Tune-Up', city: 'Kansas City, MO', img: '/images/hvac-maintenance.jpg', price: '$115 USD' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/90 border border-amber-200/60 shadow-xs text-xs"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-8 h-8 rounded-lg object-cover border border-amber-300"
              />
              <div>
                <div className="font-extrabold text-stone-900">{item.title}</div>
                <div className="text-[10px] text-stone-500 font-medium">
                  {item.tag} · {item.city} · <strong className="text-amber-600">{item.price}</strong>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
          ))}
        </div>
      </div>

      {/* 2. ASYMMETRIC BENTO GRID WITH DISTINCT ANGLES & UNIQUE PER-SERVICE ANIMATIONS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

        {/* CARD A: 7-COL WIDE (ANGLED LEFT: -1.5deg) — RESIDENTIAL HOUSE CLEANING */}
        <div className="md:col-span-7 card-angle-left">
          <SpotlightCard
            enableTilt={false}
            className="h-full glass-card rounded-3xl border border-stone-200/90 shadow-depth-md flex flex-col justify-between overflow-hidden"
          >
            {/* Real Worker in Action Photo Header */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src="/images/house-cleaning.jpg"
                alt="House Hero cleaner scrubbing residential kitchen"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent" />

              {/* Sparkle Sheen Sweep Animation */}
              <div className="absolute inset-0 animate-shimmer pointer-events-none opacity-50" />

              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-[11px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Verified Crew in Action
                </span>
                <span className="px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-200 text-[11px] font-semibold">
                  64-Point Protocol
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block">
                  Hospital-Grade Residential Care
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                  House &amp; Deep Interior Sanitization
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Our bonded cleaning technicians sanitize baseboards, detail ovens, scrub bathroom grout, and deploy HEPA multi-stage filtration vacuums safe for pets and children.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/50 text-[11px] font-bold text-stone-800 flex items-center gap-1.5">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Zero-VOC Botanical Cleaners</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/50 text-[11px] font-bold text-stone-800 flex items-center gap-1.5">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Move-In / Move-Out Standard</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/50 text-[11px] font-bold text-stone-800 flex items-center gap-1.5 col-span-2 sm:col-span-1">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>GPS Tracked Technician</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 font-bold block">Starting Rate</span>
                  <div className="text-2xl font-black text-stone-900 font-mono">$120 <span className="text-xs font-normal text-stone-500">USD</span></div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/services/house-deep-cleaning"
                    className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold transition-colors"
                  >
                    View Checklist
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

        {/* CARD B: 5-COL TALL (ANGLED RIGHT: 1.8deg) — PRESSURE WASHING WITH LIVE WATER BLAST ANIMATION */}
        <div className="md:col-span-5 card-angle-right">
          <SpotlightCard
            enableTilt={false}
            className="h-full glass-card rounded-3xl border border-stone-200/90 shadow-depth-md flex flex-col justify-between overflow-hidden"
          >
            {/* Real Worker with Pressure Washer Wand */}
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src="/images/pressure-washing.jpg"
                alt="Worker holding high pressure washer wand spraying concrete"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

              {/* Unique Water Jet Wave Indicator */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm animate-water-blast">
                <Droplets className="w-3.5 h-3.5" />
                <span>Water Blast 4,000 PSI</span>
              </div>

              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[10px] uppercase text-amber-300 font-bold block">Exterior Restoration</span>
                <h3 className="text-lg font-black tracking-tight">Pressure &amp; Soft-Washing</h3>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-stone-600 leading-relaxed">
                Watch concrete, paver patios, and vinyl siding transform. We calibrate water pressure to pulverize grime while shielding delicate siding.
              </p>

              {/* Dynamic PSI Mode Switcher */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800 flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-amber-600" />
                    <span>PSI Jet Calibration:</span>
                  </span>
                  <span className="font-black font-mono text-amber-700 bg-white px-2 py-0.5 rounded-md border border-amber-200">
                    {activePsi} PSI
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setActivePsi(350)}
                    className={`py-1 rounded-lg transition-colors cursor-pointer ${
                      activePsi === 350 ? 'bg-amber-500 text-white' : 'bg-white text-stone-600 border border-stone-200'
                    }`}
                  >
                    350 Soft
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePsi(2200)}
                    className={`py-1 rounded-lg transition-colors cursor-pointer ${
                      activePsi === 2200 ? 'bg-amber-500 text-white' : 'bg-white text-stone-600 border border-stone-200'
                    }`}
                  >
                    2.2K Deck
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePsi(4000)}
                    className={`py-1 rounded-lg transition-colors cursor-pointer ${
                      activePsi === 4000 ? 'bg-amber-500 text-white' : 'bg-white text-stone-600 border border-stone-200'
                    }`}
                  >
                    4K Concrete
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 font-bold block">Starting at</span>
                  <div className="text-xl font-black text-stone-900 font-mono">$140 <span className="text-xs font-normal text-stone-500">USD</span></div>
                </div>
                <Link
                  href="/book"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Book Wash
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* CARD C: 4-COL COMPACT (ANGLED TILT: -0.8deg) — CARPET CLEANING WITH STEAM RISE ANIMATION */}
        <div className="md:col-span-4 card-angle-tilt">
          <SpotlightCard
            enableTilt={false}
            className="h-full glass-card rounded-3xl border border-stone-200/90 shadow-depth-md flex flex-col justify-between overflow-hidden"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src="/images/carpet-cleaning.jpg"
                alt="Technician operating hot water steam extraction wand on carpet"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

              {/* Rising Steam Effect */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase flex items-center gap-1 shadow-sm">
                <Flame className="w-3.5 h-3.5 animate-steam" />
                <span>220°F Steam Rinse</span>
              </div>

              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[10px] uppercase text-amber-300 font-bold block">Deep Fiber Clean</span>
                <h3 className="text-base font-black tracking-tight">Carpet &amp; Pet Enzyme Flush</h3>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-xs text-stone-600 leading-relaxed">
                Truck-mounted thermal extraction breaks down embedded allergens and pet urine crystals with 2-4 hour fast dry times.
              </p>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 font-bold block">Starting at</span>
                  <div className="text-lg font-black text-stone-900 font-mono">$129 <span className="text-xs font-normal text-stone-500">USD</span></div>
                </div>
                <Link
                  href="/book"
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Book Carpet
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* CARD D: 4-COL COMPACT (ANGLED RIGHT: 1.5deg) — GUTTER CLEANING ON LADDER */}
        <div className="md:col-span-4 card-angle-right">
          <SpotlightCard
            enableTilt={false}
            className="h-full glass-card rounded-3xl border border-stone-200/90 shadow-depth-md flex flex-col justify-between overflow-hidden"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src="/images/gutter-cleaning.jpg"
                alt="Worker on ladder cleaning roof gutters"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-200 text-[10px] font-bold flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>Digital Photo Audit</span>
              </div>

              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[10px] uppercase text-amber-300 font-bold block">Storm Defense</span>
                <h3 className="text-base font-black tracking-tight">Gutter Cleaning &amp; Flush</h3>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-xs text-stone-600 leading-relaxed">
                Hand extraction of oak sediment, pressurized downspout clear-out, and miter seal audits with video verification.
              </p>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 font-bold block">Starting at</span>
                  <div className="text-lg font-black text-stone-900 font-mono">$135 <span className="text-xs font-normal text-stone-500">USD</span></div>
                </div>
                <Link
                  href="/book"
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Book Gutters
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* CARD E: 4-COL COMPACT (ANGLED LEFT: -1.2deg) — HVAC MAINTENANCE WITH SPINNING FAN */}
        <div className="md:col-span-4 card-angle-left">
          <SpotlightCard
            enableTilt={false}
            className="h-full glass-card rounded-3xl border border-stone-200/90 shadow-depth-md flex flex-col justify-between overflow-hidden"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src="/images/hvac-maintenance.jpg"
                alt="HVAC technician inspecting air conditioner with gauges"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

              {/* Animated Mechanical Fan Spin */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase flex items-center gap-1.5 shadow-sm">
                <Fan className="w-3.5 h-3.5 animate-spin-slow" />
                <span>21-Point CO Check</span>
              </div>

              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[10px] uppercase text-amber-300 font-bold block">Systems Safety</span>
                <h3 className="text-base font-black tracking-tight">HVAC Heating &amp; AC Tune-Up</h3>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-xs text-stone-600 leading-relaxed">
                Capacitor amp testing, condenser coil descaling, and carbon monoxide heat exchanger integrity checks.
              </p>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 font-bold block">Starting at</span>
                  <div className="text-lg font-black text-stone-900 font-mono">$115 <span className="text-xs font-normal text-stone-500">USD</span></div>
                </div>
                <Link
                  href="/book"
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Book HVAC
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* CARD F: FULL 12-COL WIDE (ANGLED TILT) — SNOW REMOVAL WITH DRIFTING PARTICLES */}
        <div className="md:col-span-12 card-angle-tilt">
          <SpotlightCard
            enableTilt={false}
            className="glass-card rounded-3xl border border-stone-200/90 shadow-depth-md flex flex-col md:flex-row items-center justify-between overflow-hidden"
          >
            <div className="relative h-64 md:h-auto md:w-5/12 w-full self-stretch overflow-hidden">
              <img
                src="/images/snow-removal.jpg"
                alt="Worker clearing snow from residential property"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-stone-950/80 via-transparent to-transparent" />

              {/* Drifting Snow Crystal Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-black uppercase flex items-center gap-1.5 shadow-sm animate-snow-drift">
                  <Snowflake className="w-3.5 h-3.5" />
                  <span>Automated 2&quot; Trigger</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-stone-900/80 text-amber-200 text-[11px] font-bold">
                  Poly Rubber Blades
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8 md:w-7/12 w-full space-y-4">
              <span className="text-xs uppercase font-extrabold text-amber-600 tracking-wider">
                Winter Storm &amp; Sub-Zero Emergency Defense
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                Zero-Damage Snow Plowing &amp; Walkway Clearing
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                We trigger automated fleet dispatch whenever radar forecasts exceed 2 inches. Non-marking polyurethane plow edges protect stamped concrete, pavers, and stone driveways.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-[11px] font-bold text-stone-800">
                <div className="flex items-center gap-1.5 bg-amber-50/80 p-2 rounded-xl border border-amber-200/50">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Before 7:00 AM Commute</span>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50/80 p-2 rounded-xl border border-amber-200/50">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pet-Safe Salt Option</span>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50/80 p-2 rounded-xl border border-amber-200/50 col-span-2 sm:col-span-1">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Unlimited Pass Available</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 font-bold block">Starting Rate</span>
                  <div className="text-2xl font-black text-stone-900 font-mono">$65 <span className="text-xs font-normal text-stone-500">USD / Push</span></div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/services/snow-removal"
                    className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold transition-colors"
                  >
                    View Season Passes
                  </Link>
                  <Link
                    href="/book"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Reserve Dispatch
                  </Link>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>

      </div>

      {/* 3. INTERACTIVE BEFORE / AFTER TRANSFORMATION SLIDER (SLIDING INTERACTION) */}
      <div className="pt-4">
        <InteractiveComparison
          title="Verified Workmanship Transformation"
          subtitle="Slide the handle horizontally to inspect our high-temperature 4,000 PSI surface restoration."
          beforeImage="/images/before-patio.jpg"
          afterImage="/images/after-patio.jpg"
          beforeLabel="Before Treatment"
          afterLabel="After House Hero Care"
        />
      </div>

      {/* 4. INTERACTIVE MULTI-SERVICE LIVE DISPATCH BUILDER (FULL WIDTH) */}
      <div className="pt-2">
        <InteractiveQuickBooker />
      </div>
    </section>
  );
}
