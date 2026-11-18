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
  Gift,
  CheckCircle2,
  TrendingUp,
  Award
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
    <div className="space-y-24 pb-24 overflow-hidden">
      {/* 1. HERO SECTION: Luminous, High-Converting Landing Page Header */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-slate-100/60 border-b border-slate-200/70">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_-15%,rgba(245,158,11,0.12),rgba(255,255,255,0))] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-700">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-emerald-700 font-bold">Licensed, Bonded & Insured ($2M)</span>
              <span className="text-slate-300">•</span>
              <span className="text-amber-600 flex items-center gap-1 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> 4.9★ Rated (2,800+ US Reviews)
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              America’s Premier <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700">
                Property Care & Storm Dispatch
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Hospital-grade interior cleaning, carpet steam extraction, automated winter snow removal, high-pressure washing, and HVAC tune-ups with transparent upfront USD ($) pricing.
            </p>
          </div>

          {/* Quick ZIP + Service Selector Hero Card */}
          <div className="max-w-3xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-7 shadow-xl shadow-slate-200/50">
            <form onSubmit={handleHeroRoute} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Instant Upfront Pricing & Dispatch Check</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Zero Hidden Fees
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
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
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white font-mono transition-colors"
                    />
                  </div>
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Select Desired Service
                  </label>
                  <select
                    value={heroService}
                    onChange={(e) => setHeroService(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white font-medium transition-colors"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} (From ${basePrices[s.id] || s.startingPrice} USD)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl font-black text-xs text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/25 transition-all flex items-center justify-center gap-1.5 h-[42px] hover:-translate-y-0.5"
                  >
                    <span>Get Instant Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {heroNotice && (
                <div className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  {heroNotice}
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <span>✓ Pay upon job completion or card hold</span>
                <span className="text-emerald-700 font-semibold">✓ 24-Hour Re-Service Guarantee</span>
              </div>
            </form>
          </div>

          {/* Social Proof Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center pt-2">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-slate-900">100%</div>
              <div className="text-xs text-slate-500 font-semibold mt-0.5">Satisfaction Guaranteed</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-amber-600">10 Core</div>
              <div className="text-xs text-slate-500 font-semibold mt-0.5">Specialized Home Services</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600">&lt;45 min</div>
              <div className="text-xs text-slate-500 font-semibold mt-0.5">Average Storm Dispatch</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-slate-900">$2,000,000</div>
              <div className="text-xs text-slate-500 font-semibold mt-0.5">General Liability Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEASONAL SPOTLIGHT: WINTER STORM READINESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white p-7 sm:p-12 shadow-2xl border border-slate-700">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold">
                <Snowflake className="w-3.5 h-3.5 animate-spin" /> Winter Storm & Sub-Zero Readiness Dispatch
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Winter Fortress Protection Package
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Be prepared before freezing weather and heavy snowfall strike. Bundle <strong>Snow Removal</strong>, <strong>Pet-Safe De-Icing</strong>, <strong>Gutter Clearing</strong>, and <strong>21-Point Furnace Heating Checkup</strong> to save <strong>$170 USD</strong> immediately.
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300 pt-1">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="w-4 h-4" /> Automated 2" Plow Trigger
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="w-4 h-4" /> Pet-Safe Magnesium Chloride
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="w-4 h-4" /> Carbon Monoxide Heat Exchanger Audit
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-950/80 border border-slate-700/80 p-6 rounded-2xl text-center space-y-3">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Winter Bundle Package:
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-slate-500 line-through">$799</span>
                <span className="text-4xl font-black text-emerald-400">$629</span>
                <span className="text-xs text-slate-400">USD</span>
              </div>
              <div className="text-xs font-bold text-amber-400 bg-amber-400/10 py-1 rounded-lg border border-amber-400/20">
                You Save $170 USD Instantly
              </div>
              <Link
                href="/book?bundle=winter-fortress"
                className="w-full py-3 px-4 rounded-xl font-black text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 block transition-all"
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
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              The 10 Core Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
              Full-Spectrum Property Care
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Standardized execution by NorthStar’s direct, background-checked crew with transparent USD rates and modern machinery.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-slate-200'
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
                className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-amber-400 group-hover:text-slate-950 text-slate-800 flex items-center justify-center transition-colors shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    {svc.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                        {svc.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {svc.shortDesc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <div className="text-[11px] font-bold text-slate-700">Included highlights:</div>
                    <ul className="text-[11px] text-slate-500 space-y-0.5">
                      {svc.includedFeatures.slice(0, 2).map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 mt-6 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Starting at</div>
                    <div className="text-2xl font-black text-emerald-600 font-mono">
                      ${currentPrice} <span className="text-xs text-slate-400 font-normal">USD</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">{svc.priceUnit}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/services/${svc.slug}`}
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-colors text-xs font-bold"
                    >
                      Details
                    </Link>
                    <Link
                      href={`/book?service=${svc.id}`}
                      className="py-2.5 px-4 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-1 shadow-xs"
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
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 border border-slate-800">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Interactive Estimator
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
              Live Homepage Quote Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Select any of our 10 services to test real-time pricing parameter adjustments.
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
                    : 'bg-slate-800 text-slate-300 hover:text-white'
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

      {/* 5. BEFORE & AFTER PROOF SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Visible Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            Interactive Before & After Gallery
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Drag the handle sideways to see the real difference our commercial equipment makes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm">
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80"
            afterImage="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80"
            beforeLabel="BEFORE: MOLD & GRIME"
            afterLabel="AFTER: 4000 PSI ROTARY"
          />

          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Case Study #849
            </span>
            <h3 className="text-2xl font-bold text-slate-900">
              Residential Siding & Concrete Driveway Restoration
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              This suburban property had heavy algae growth on vinyl siding and embedded vehicle oil spots on the driveway. Our team performed a low-pressure algaecide soft-wash followed by a 4000 PSI rotary ground blast.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                <div className="text-slate-500">Total Project USD:</div>
                <div className="text-xl font-black text-emerald-600 font-mono">$310.00 USD</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                <div className="text-slate-500">Turnaround Time:</div>
                <div className="text-xl font-bold text-slate-900">2.5 Hours</div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
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
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Hassle-Free Care
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            How NorthStar Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Standardized execution from instant quote to guaranteed satisfaction.
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
              className="bg-white border border-slate-200/90 rounded-3xl p-6 relative space-y-3 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="text-3xl font-black text-amber-500 font-mono">
                {item.step}
              </div>
              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. VERIFIED CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Verified Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
              What Homeowners Say
            </h2>
          </div>
          <Link
            href="/reviews"
            className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1.5"
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
              className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(r.stars)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "{r.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{r.name}</div>
                  <div className="text-[11px] text-slate-400">{r.loc}</div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {r.svc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. 100% SATISFACTION GUARANTEE STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center space-y-4 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-400/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            The NorthStar 100% Satisfaction & 24-Hour Re-Service Promise
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            If any aspect of your service does not meet your expectations, notify our dispatch team within 24 hours. A supervisor will return to re-service the area at zero charge to you. No excuses, no hassle.
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
