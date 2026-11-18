'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Compass,
  Shield,
  Star,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Phone,
  Droplet,
  Layers,
  Snowflake,
  Wrench,
  Truck,
  Flame,
  Leaf,
  ShieldCheck,
  Zap,
  MapPin,
  Calendar,
  Gift
} from 'lucide-react';
import { SERVICES, CATEGORIES, SEASONAL_BUNDLES } from '@/data/services';
import { useApp } from '@/context/AppContext';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ServiceCalculator from '@/components/ServiceCalculator';

export default function HomePage() {
  const router = useRouter();
  const { basePrices } = useApp();

  // Hero Quick Selector State
  const [heroZip, setHeroZip] = useState('');
  const [heroService, setHeroService] = useState('house-deep-cleaning');
  const [heroNotice, setHeroNotice] = useState<string | null>(null);

  // Home interactive quote previewer selected service
  const [previewServiceId, setPreviewServiceId] = useState('house-deep-cleaning');

  // Filter category in 10 services grid
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  const handleHeroRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroZip || heroZip.length < 5) {
      setHeroNotice('Please enter a valid 5-digit US ZIP code to check immediate dispatch.');
      return;
    }
    router.push(`/book?service=${heroService}&zip=${heroZip}`);
  };

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return Sparkles;
      case 'Layers': return Layers;
      case 'Droplet': return Droplet;
      case 'Snowflake': return Snowflake;
      case 'Wrench': return Wrench;
      case 'Truck': return Truck;
      case 'Flame': return Flame;
      case 'Leaf': return Leaf;
      case 'ShieldCheck': return ShieldCheck;
      default: return Wrench;
    }
  };

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.15),rgba(255,255,255,0))] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200 shadow-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-bold">Licensed, Bonded & Insured ($2M)</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.9★ (2,800+ US Reviews)
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Comprehensive Care for <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                Your American Home
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              From deep interior sanitization and carpet steam extraction to automated winter snow dispatch and high-pressure washing. Transparent upfront USD pricing with zero hidden surcharges.
            </p>
          </div>

          {/* Quick ZIP + Service Selector Widget */}
          <div className="mt-10 max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-md">
            <form onSubmit={handleHeroRoute} className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                <span>Instant Upfront Pricing & Dispatch Check</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Your US ZIP Code
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      maxLength={5}
                      required
                      placeholder="e.g. 80202"
                      value={heroZip}
                      onChange={(e) => {
                        setHeroZip(e.target.value);
                        setHeroNotice(null);
                      }}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Select Desired Service
                  </label>
                  <select
                    value={heroService}
                    onChange={(e) => setHeroService(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} (From ${basePrices[s.id] || s.startingPrice} USD)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-3 flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl font-black text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-1.5 h-[42px]"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {heroNotice && (
                <div className="text-xs text-amber-300 bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/30">
                  {heroNotice}
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                <span>✓ Zero credit card needed to view itemized quote</span>
                <span className="text-emerald-400 font-semibold">✓ 100% Satisfaction Guarantee</span>
              </div>
            </form>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
              <div className="text-xs text-slate-400 mt-0.5">Satisfaction Guaranteed</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">10 Core</div>
              <div className="text-xs text-slate-400 mt-0.5">Dedicated Home Services</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">&lt;45 min</div>
              <div className="text-xs text-slate-400 mt-0.5">Priority Storm Dispatch</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-white">$2,000,000</div>
              <div className="text-xs text-slate-400 mt-0.5">General Liability Insurance</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEASONAL SPOTLIGHT BANNER: WINTER STORM READINESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/50 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold">
                <Snowflake className="w-3.5 h-3.5 animate-spin" /> Winter Storm & Sub-Zero Readiness Dispatch
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Winter Fortress Protection Package
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Be fully prepared before freezing temperatures and heavy snow hit your roof and driveway. Bundle <strong>Snow Removal</strong>, <strong>Pet-Safe De-Icing</strong>, <strong>Gutter Clearing</strong>, and <strong>21-Point Furnace Safety Tune-Up</strong> to save <strong>$170 USD</strong> instantly.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300 pt-1">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle className="w-4 h-4" /> 2-Inch Automatic Plow Trigger
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle className="w-4 h-4" /> Pet-Safe Magnesium Chloride
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle className="w-4 h-4" /> Carbon Monoxide Heat Exchanger Check
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl text-center space-y-3">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Winter Bundle Pricing:
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-slate-500 line-through">$799</span>
                <span className="text-3xl sm:text-4xl font-black text-emerald-400">$629</span>
                <span className="text-xs text-slate-400">USD</span>
              </div>
              <div className="text-[11px] font-bold text-amber-400 bg-amber-400/10 py-1 rounded-lg">
                Instant Savings: $170 USD
              </div>
              <Link
                href="/book?bundle=winter-fortress"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 block transition-all"
              >
                Lock In Winter Bundle
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE GRID OF ALL 10 SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              The 10 Core Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Full-Spectrum Property Care
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Every service is delivered by our direct, uniformed crew with transparent USD rates and modern equipment.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((svc) => {
            const Icon = getServiceIcon(svc.iconName);
            const currentPrice = basePrices[svc.id] || svc.startingPrice;
            return (
              <div
                key={svc.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 group-hover:bg-amber-400 group-hover:text-slate-950 text-amber-400 flex items-center justify-center transition-colors shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    {svc.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-emerald-400 px-2.5 py-1 rounded-full border border-slate-700">
                        {svc.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {svc.shortDesc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1">
                    <div className="text-[11px] font-semibold text-slate-300">Included highlights:</div>
                    <ul className="text-[11px] text-slate-400 space-y-0.5">
                      {svc.includedFeatures.slice(0, 2).map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Starting at</div>
                    <div className="text-xl font-black text-emerald-400 font-mono">
                      ${currentPrice} <span className="text-xs text-slate-400 font-normal">USD</span>
                    </div>
                    <div className="text-[10px] text-slate-500">{svc.priceUnit}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/services/${svc.slug}`}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-semibold"
                    >
                      Details
                    </Link>
                    <Link
                      href={`/book?service=${svc.id}`}
                      className="py-2.5 px-3.5 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-1"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. LIVE INTERACTIVE MULTI-SERVICE QUOTE PREVIEWER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Interactive Estimator
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
              Live Homepage Quote Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Test real-time parameter changes for any of our 10 services right here. All pricing updates dynamically in USD ($).
            </p>
          </div>

          {/* Service Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setPreviewServiceId(s.id)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  previewServiceId === s.id
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Calculator Embed */}
          <ServiceCalculator serviceId={previewServiceId} showBookButton={true} />
        </div>
      </section>

      {/* 5. BEFORE & AFTER SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Proven Results
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Interactive Before & After Gallery
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Drag the slider handle sideways to see the real transformation achieved by our equipment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80"
            afterImage="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80"
            beforeLabel="BEFORE: MOLD & GRIME"
            afterLabel="AFTER: 4000 PSI ROTARY"
          />

          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Project Case Study #849
            </span>
            <h3 className="text-2xl font-bold text-white">
              Residential Siding & Concrete Driveway Restoration
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              This two-story suburban home had 4 years of stubborn algae growth on north-facing vinyl siding and deeply embedded oil spots on the driveway. Our crew performed a low-pressure algaecide soft-wash followed by a 4000 PSI rotary ground wash.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                <div className="text-slate-400">Total Project USD:</div>
                <div className="text-lg font-black text-emerald-400 font-mono">$310.00 USD</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                <div className="text-slate-400">Turnaround Time:</div>
                <div className="text-lg font-bold text-white">2.5 Hours</div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>View All 10 Service Before & After Comparisons</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS FLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            Hassle-Free Booking
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            How NorthStar Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Four simple steps from instant quote to guaranteed satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Select & Configure',
              desc: 'Choose single services or bundle multiple packages for up to 15% automatic discount.'
            },
            {
              step: '02',
              title: 'Pick Time Window',
              desc: 'Select your preferred arrival date and 3-hour window. Get a 30-min advance text alert.'
            },
            {
              step: '03',
              title: 'Certified Crew Arrives',
              desc: 'Uniformed, background-checked, and bonded technicians arrive in equipped NorthStar vans.'
            },
            {
              step: '04',
              title: '100% Satisfaction Guarantee',
              desc: 'Inspect completed work. If anything is missed, we re-service within 24 hours at zero cost.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative space-y-3"
            >
              <div className="text-3xl font-black text-amber-400/40 font-mono">
                {item.step}
              </div>
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. VERIFIED CUSTOMER REVIEWS TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Verified Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              What Homeowners Say
            </h2>
          </div>
          <Link
            href="/reviews"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
          >
            <span>Read All Verified Customer Reviews</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Sarah M.',
              loc: 'Denver, CO',
              svc: 'House Deep Cleaning',
              stars: 5,
              text: 'NorthStar did our move-out cleaning and our landlord refunded 100% of our deposit within 24 hours. The oven and tile grout looked brand new!'
            },
            {
              name: 'Marcus T.',
              loc: 'Chicago, IL',
              svc: 'Carpet Cleaning & Pet Treatment',
              stars: 5,
              text: 'Two golden retrievers had destroyed our living room rug. NorthStar extracted stains I thought were permanent. No chemical smell at all.'
            },
            {
              name: 'Robert G.',
              loc: 'Milwaukee, WI',
              svc: 'Snow Removal & Plowing',
              stars: 5,
              text: 'Woke up at 6:30 AM after a 9-inch blizzard and my entire 4-car driveway was already plowed and salted. Worth every single dollar.'
            }
          ].map((r, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(r.stars)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{r.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{r.name}</div>
                  <div className="text-[11px] text-slate-500">{r.loc}</div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {r.svc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. 100% SATISFACTION GUARANTEE STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-400/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            The NorthStar 100% Satisfaction & 24-Hour Re-Service Promise
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            If any aspect of your property service fails to meet your expectations, notify our dispatch team within 24 hours. A supervisor will return to re-service the area at zero charge to you. No excuses, no hassle.
          </p>
          <div className="pt-2">
            <Link
              href="/satisfaction-guarantee"
              className="text-xs font-bold text-amber-400 hover:underline"
            >
              Read Full 24-Hour Guarantee Documentation →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
