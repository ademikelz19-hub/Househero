'use client';

import React from 'react';
import Link from 'next/link';
import {
  Gift,
  CheckCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Snowflake,
  Sun,
  Home,
  Crown
} from 'lucide-react';
import { SEASONAL_BUNDLES } from '@/data/services';

export default function BundlesPage() {
  const getBundleIcon = (id: string) => {
    switch (id) {
      case 'winter-fortress': return Snowflake;
      case 'spring-curb-appeal': return Sun;
      case 'total-interior-wellness': return Home;
      case 'all-season-vip': return Crown;
      default: return Gift;
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Seasonal & Annual Packages
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Curated Multi-Service Bundles
        </h1>
        <p className="text-sm text-slate-300">
          Maximize your property protection while locking in guaranteed USD savings of up to <strong>$481 USD</strong> per home.
        </p>
      </div>

      {/* Bundles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SEASONAL_BUNDLES.map((b) => {
          const Icon = getBundleIcon(b.id);
          return (
            <div
              key={b.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between border transition-all relative overflow-hidden shadow-2xl ${
                b.popular
                  ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-amber-400/60 ring-2 ring-amber-400/20'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              {b.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-bl-xl shadow-md">
                  ★ Most Popular Seasonal Choice
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 text-amber-400 flex items-center justify-center shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {b.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">{b.title}</h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {b.description}
                </p>

                {/* Included Services Tags */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Core Services Included:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {b.servicesIncluded.map((s, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-800 text-slate-200 text-xs px-2.5 py-1 rounded-lg border border-slate-700 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Feature Checklist */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Package Guarantees:
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5">
                    {b.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pricing & CTA footer */}
              <div className="pt-6 border-t border-slate-800 mt-8 space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Original Rate:</div>
                    <div className="text-sm text-slate-500 line-through font-mono">
                      ${b.originalPrice}.00 USD
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-amber-400 uppercase">
                      Guaranteed Package Price:
                    </div>
                    <div className="text-3xl font-black text-emerald-400 font-mono">
                      ${b.bundlePrice}.00 <span className="text-xs text-slate-400 font-normal">USD</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-xl text-center text-xs font-bold text-emerald-300">
                  You Save: ${b.savings}.00 USD with this bundle!
                </div>

                <Link
                  href={`/book?bundle=${b.id}`}
                  className="w-full py-3.5 rounded-xl font-black text-xs text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-center shadow-lg shadow-amber-500/20 block transition-all"
                >
                  Book This Bundle (${b.bundlePrice} USD)
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
