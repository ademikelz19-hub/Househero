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
  Gift,
  Sparkles,
  CheckCheck
} from 'lucide-react';
import { SERVICES, CATEGORIES, SEASONAL_BUNDLES } from '@/data/services';
import SpotlightCard from '@/components/SpotlightCard';

export default function ServicesDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Helper for Trade Icons
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
    <div className="py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      {/* Header with Search and Category Filter */}
      <div className="text-center max-w-3xl mx-auto space-y-4 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-900 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Transparent USD Upfront Rates · Vetted W-2 Staff</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-[1.1]">
          All 10 Core Property Care <span className="text-gradient">Services.</span>
        </h1>

        <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto">
          Professional residential maintenance with guaranteed upfront USD rates, insured standards, and certified technicians. Pick any combination for a single dispatch visit.
        </p>

        {/* Search Bar */}
        <div className="pt-2 max-w-md mx-auto relative">
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
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`py-1.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                  : 'bg-white/80 text-stone-600 hover:text-stone-900 border border-stone-200/80 hover:bg-stone-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid with Spotlight Glow, 3D Tilt, & Verified Photographic Previews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((svc) => {
          const Icon = getServiceIcon(svc.iconName);
          return (
            <SpotlightCard
              key={svc.id}
              enableTilt={true}
              className="glass-card rounded-3xl border border-stone-200/80 shadow-depth-sm hover:shadow-depth-xl group flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={svc.afterImage}
                    alt={svc.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-200 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-md">
                      {svc.category}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-amber-500/90 backdrop-blur-md text-white flex items-center justify-center shadow-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="text-lg font-black tracking-tight">{svc.title}</h3>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2">
                    {svc.shortDesc}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Standard Inclusions:
                    </span>
                    <ul className="text-xs text-stone-600 space-y-1">
                      {svc.includedFeatures.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5 truncate">
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price */}
                  <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] text-stone-400 uppercase font-semibold">Starting at</div>
                      <div className="text-2xl font-black text-stone-900 font-mono">
                        ${svc.startingPrice}{' '}
                        <span className="text-xs font-normal text-stone-500">USD</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{svc.avgDuration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 sm:p-6 pt-0 flex items-center gap-2.5">
                <Link
                  href={`/services/${svc.slug}`}
                  className="flex-1 text-center py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold transition-colors"
                >
                  View Details
                </Link>
                <Link
                  href="/book"
                  className="flex-1 text-center py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Book Service
                </Link>
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      {/* Multi-Service Bundles Section */}
      <section className="pt-8 border-t border-stone-200 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Gift className="w-3.5 h-3.5" />
            <span>Seasonal Property Bundles</span>
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
            <SpotlightCard
              key={b.id}
              enableTilt={true}
              className="glass-warm p-6 sm:p-7 rounded-3xl border border-amber-200/60 shadow-depth-sm hover:shadow-depth-md flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200/70 px-2.5 py-0.5 rounded-md">
                    {b.tag}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
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
                      <span
                        key={i}
                        className="text-xs font-semibold bg-white/90 px-2.5 py-1 rounded-md text-stone-700 border border-stone-200/60"
                      >
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
                  <div className="text-2xl font-black text-stone-900 font-mono">
                    ${b.bundlePrice} <span className="text-xs font-normal text-stone-500">USD</span>
                  </div>
                </div>
                <Link
                  href="/book"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  Book Bundle
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </div>
  );
}
