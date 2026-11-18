'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
  ShieldCheck,
  Droplet,
  Layers,
  Snowflake,
  Wrench,
  Truck,
  Flame,
  Leaf
} from 'lucide-react';
import { SERVICES, CATEGORIES } from '@/data/services';
import { useApp } from '@/context/AppContext';

export default function ServicesDirectoryPage() {
  const { basePrices } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

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

  const filtered = SERVICES.filter((s) => {
    const matchesCat = activeCategory === 'all' || s.category === activeCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.includedFeatures.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          The Complete Service Portfolio
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          All 10 Core Property Care Services
        </h1>
        <p className="text-sm text-slate-300">
          Every service is performed by NorthStar’s direct, background-checked crew with insured standards and exact upfront USD pricing.
        </p>

        {/* Search & Category Filter */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services, equipment, or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 shadow-inner"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pt-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Filtered Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((svc) => {
          const Icon = getServiceIcon(svc.iconName);
          const price = basePrices[svc.id] || svc.startingPrice;
          return (
            <div
              key={svc.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between group hover:border-slate-700 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    {svc.category.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {svc.shortDesc}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    What’s Included:
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {svc.includedFeatures.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Starting at</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    ${price} <span className="text-xs text-slate-400 font-normal">USD</span>
                  </div>
                  <div className="text-[10px] text-slate-500">{svc.priceUnit} • {svc.avgDuration}</div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/services/${svc.slug}`}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                  >
                    Details
                  </Link>
                  <Link
                    href={`/book?service=${svc.id}`}
                    className="py-2.5 px-4 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-1"
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

      {/* Side-by-Side Comparison Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Side-by-Side Comparison
          </span>
          <h2 className="text-2xl font-black text-white mt-1">
            Service Pricing & Response Matrix (USD)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare all 10 services at a glance with average duration, equipment tier, and starting pricing.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-4 font-bold">Service Name</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Starting Rate (USD)</th>
                <th className="py-3 px-4 font-bold">Pricing Basis</th>
                <th className="py-3 px-4 font-bold">Typical Duration</th>
                <th className="py-3 px-4 font-bold text-right">Instant Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {SERVICES.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">
                    <Link href={`/services/${s.slug}`} className="hover:text-amber-400">
                      {s.title}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px] capitalize">
                      {s.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-extrabold text-emerald-400 text-sm">
                    ${basePrices[s.id] || s.startingPrice}.00 USD
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{s.priceUnit}</td>
                  <td className="py-3.5 px-4 text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>{s.avgDuration}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/book?service=${s.id}`}
                      className="inline-block py-1.5 px-3 rounded-lg font-bold text-[11px] text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors"
                    >
                      Book Now
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
