'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Phone,
  Mail,
  MapPin,
  Shield,
  Star,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SERVICES } from '@/data/services';

export default function Footer() {
  return (
    <footer className="w-full relative z-10 bg-gradient-to-b from-white via-amber-50/30 to-amber-100/20 border-t border-amber-200/50 text-stone-700 py-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Strip: Brand & Fast Hotline */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-amber-200/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-400 to-yellow-400 p-[1.5px] shadow-md shadow-amber-500/20">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl text-stone-900 tracking-tight">
                  North<span className="text-amber-500">Star</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full">
                  US Maintenance
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Luminous residential & commercial property care • $2M Insured
              </p>
            </div>
          </div>

          {/* Quick Hotline Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:18005556787"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 border border-amber-300 shadow-sm text-stone-800 text-sm font-bold hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300"
            >
              <Phone className="w-4 h-4 text-amber-600 group-hover:text-white" />
              <span>(800) 555-NSTAR</span>
            </a>
            <a
              href="#book"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold shadow-md shadow-amber-500/25 hover:from-amber-600 hover:to-orange-600 hover:-translate-y-0.5 transition-all"
            >
              <span>Instant Book</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Middle: Simplified Clean Service Tags */}
        <div className="py-8">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">
            Core Maintenance Services (All Priced in USD $)
          </p>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <a
                key={s.id}
                href={`#service-${s.id}`}
                className="px-3 py-1.5 rounded-xl bg-white/70 border border-amber-200/60 hover:border-amber-400 hover:bg-amber-50/80 text-stone-700 hover:text-amber-700 text-xs font-medium transition-all shadow-xs flex items-center gap-1.5"
              >
                <span>{s.title}</span>
                <span className="text-amber-600 font-bold">from ${s.startingPrice}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Badges & Copyright */}
        <div className="pt-6 border-t border-amber-200/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1 text-amber-700 font-medium">
              <Shield className="w-3.5 h-3.5 text-amber-600" /> $2,000,000 General Liability
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-stone-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 100% Satisfaction Guarantee
            </span>
            <span>•</span>
            <span className="font-semibold text-amber-800">
              USD ($) Transparent Pricing
            </span>
          </div>

          <div className="text-center sm:text-right">
            © 2026 NorthStar Property Care Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
