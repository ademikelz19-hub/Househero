'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  ArrowRight,
  CheckCircle2,
  Clock,
  Home,
  Layers,
  Droplets,
  Snowflake,
  Wrench,
  Truck,
  Flame,
  Leaf,
  ShieldCheck,
  Shield,
  Gift
} from 'lucide-react';
import { SERVICES, CATEGORIES, SEASONAL_BUNDLES } from '@/data/services';

export default function ServicesDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Helper for Trade Icons (No AI symbols)
  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Home':
      case 'Sparkles':
        return Home;
      case 'Layers':
        return Layers;
      case 'Droplet':
      case 'Droplets':
        return Droplets;
      case 'Snowflake':
        return Snowflake;
      case 'Wrench':
        return Wrench;
      case 'Truck':
        return Truck;
      case 'Flame':
        return Flame;
      case 'Leaf':
        return Leaf;
      case 'ShieldCheck':
        return ShieldCheck;
      default:
        return Wrench;
    }
  };

  const filtered = useMemo(() => {
    return SERVICES.filter((s) => {
      const matchesCat = activeCategory === 'all' || s.category === activeCategory;
      const matchesSearch =
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.includedFeatures.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Complete Portfolio
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          All 10 Core Property Care Services
        </h1>
        <p className="text-sm sm:text-base text-stone-600">
          Professional residential maintenance with guaranteed upfront USD rates, insured standards, and certified technicians.
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search services, keywords, or features..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/90 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-xs"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`py-1.5 px-3.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white/80 text-stone-600 hover:text-stone-900 border border-stone-200/80 hover:bg-stone-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid (Liquid Glass) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((svc) => {
          const Icon = getServiceIcon(svc.iconName);
          return (
            <div
              key={svc.id}
              className="glass-card card-hover relative overflow-hidden rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl transition-all duration-200"
            >
              <div className="absolute inset-0 rounded-2xl animate-shimmer pointer-events-none" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-200/60 text-amber-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
                    {svc.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-stone-900">{svc.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                    {svc.shortDesc}
                  </p>
                </div>

                {/* Key Inclusions Preview */}
                <div className="pt-2 border-t border-stone-100 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Included Highlights:
                  </span>
                  <ul className="text-xs text-stone-600 space-y-1">
                    {svc.includedFeatures.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5 line-clamp-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Display */}
                <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase">Starting at</div>
                    <div className="text-2xl font-black text-stone-900 font-mono">
                      ${svc.startingPrice}{' '}
                      <span className="text-xs font-normal text-stone-500">USD</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-stone-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>{svc.avgDuration}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-5 border-t border-stone-100 flex items-center gap-2.5">
                <Link
                  href={`/services/${svc.slug}`}
                  className="flex-1 text-center py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors"
                >
                  Details
                </Link>
                <Link
                  href="/book"
                  className="flex-1 text-center py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Book Service
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Seasonal Bundles Section (Consolidated from /bundles) */}
      <section className="pt-8 border-t border-stone-200 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Gift className="w-3.5 h-3.5" />
            <span>Multi-Service Bundles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            Save with Property Maintenance Packages
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Bundle complementary services together and save up to $170 USD on single-dispatch visits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SEASONAL_BUNDLES.map((b) => (
            <div key={b.id} className="glass-warm card-hover p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2.5 py-0.5 rounded-md">
                    {b.tag}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    Save ${b.savings} USD
                  </span>
                </div>

                <h3 className="text-xl font-bold text-stone-900">{b.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{b.description}</p>

                {/* Features Included */}
                <div className="pt-2 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-stone-500">
                    Services Included:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {b.servicesIncluded.map((s, i) => (
                      <span key={i} className="text-xs font-medium bg-white/80 px-2.5 py-1 rounded-md text-stone-700 border border-stone-200/60">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-amber-200/60 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-stone-500 line-through">${b.originalPrice} USD</div>
                  <div className="text-2xl font-black text-stone-900 font-mono">${b.bundlePrice} <span className="text-xs font-normal text-stone-500">USD</span></div>
                </div>
                <Link
                  href="/book"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  Book Bundle
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
