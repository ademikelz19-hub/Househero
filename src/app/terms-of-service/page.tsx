import React from 'react';
import Link from 'next/link';
import { Shield, FileText, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | House Hero',
  description: 'House Hero customer service agreement, satisfaction guarantee, and billing terms.',
};

export default function TermsOfServicePage() {
  return (
    <div className="w-full">
      {/* Hero Section with Functional Navigation */}
      <section className="relative pt-6 pb-12 lg:pt-12 lg:pb-16 overflow-hidden border-b border-amber-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold uppercase tracking-wide">
                <span>Legal Agreement</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight">
                Terms of Service &amp; Client Agreement
              </h1>
              <p className="text-base text-stone-600 max-w-xl">
                Clear, transparent terms governing our upfront USD pricing, 24-hour re-service guarantee, and property liability coverage.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <a href="#billing" className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold">
                  1. Billing Protocol
                </a>
                <a href="#guarantee" className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold">
                  2. 100% Guarantee
                </a>
                <a href="#liability" className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold">
                  3. $2M Insurance
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-amber-500/10 border border-white/80 aspect-4/3 sm:aspect-5/4">
                <img
                  src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=85"
                  alt="House Hero customer agreement"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-xs sm:text-sm text-stone-700">
        <div className="bg-white border border-stone-200/80 p-6 sm:p-10 rounded-2xl shadow-xs space-y-6">
          <div id="billing" className="space-y-2">
            <h2 className="text-base font-bold text-stone-900">1. Upfront USD Pricing &amp; Payment</h2>
            <p className="leading-relaxed">
              All prices quoted by House Hero are denominated in US Dollars ($ USD). Standard residential appointments may be paid upon completion following client walkthrough inspection via debit, check, cash, or credit invoice.
            </p>
          </div>

          <div id="guarantee" className="space-y-2 pt-4 border-t border-stone-100">
            <h2 className="text-base font-bold text-stone-900">2. 100% Satisfaction &amp; 24-Hour Re-Service Protocol</h2>
            <p className="leading-relaxed">
              If any service area fails to meet our agreed quality standards, notify our central dispatch desk within 24 hours of job completion. A certified crew supervisor will return to re-service the specified area at zero additional charge.
            </p>
          </div>

          <div id="liability" className="space-y-2 pt-4 border-t border-stone-100">
            <h2 className="text-base font-bold text-stone-900">3. General Liability &amp; Workers' Compensation</h2>
            <p className="leading-relaxed">
              House Hero maintains an active $2,000,000 general liability policy and statutory workers’ compensation for all field technicians. Certified proof of insurance certificates can be verified through our central dispatch.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
