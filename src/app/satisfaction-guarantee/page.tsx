'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  ArrowRight,
  Shield,
  FileCheck
} from 'lucide-react';

export default function SatisfactionGuaranteePage() {
  const [bookingId, setBookingId] = useState('');
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId.trim()) return;
    setClaimSubmitted(true);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          HERO SECTION WITH FUNCTIONAL RE-SERVICE INITIATOR & LUXURY RESIDENCE
      ========================================================================= */}
      <section className="relative pt-6 pb-12 lg:pt-12 lg:pb-16 overflow-hidden border-b border-amber-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold uppercase tracking-wide">
                <span>Unconditional Promise</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
                100% Satisfaction &amp;{' '}
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                  24-Hour Re-Service.
                </span>
              </h1>

              <p className="text-base text-stone-600 max-w-xl font-normal leading-relaxed">
                If any service area fails to meet our agreed quality standards, a supervisor returns to re-clean, re-flush, or re-service the area at zero additional charge.
              </p>

              {/* Functional Hero Re-Service Request Tool */}
              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-amber-200/80 shadow-lg shadow-amber-500/5 max-w-xl space-y-3">
                <div className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Request 24-Hour Supervisor Walkthrough
                </div>

                {claimSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold text-center">
                    ✓ Re-service ticket opened for #{bookingId}. Central dispatch will contact you within 30 minutes.
                  </div>
                ) : (
                  <form onSubmit={handleClaim} className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Enter Booking ID (e.g. NSPC-8491) or Phone..."
                      value={bookingId}
                      onChange={(e) => setBookingId(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-amber-600 text-white font-bold text-xs transition-colors whitespace-nowrap"
                    >
                      Open Ticket
                    </button>
                  </form>
                )}

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Zero fees or dispute friction</span>
                  <a href="tel:18005556782" className="text-amber-700 font-bold hover:underline">
                    Or call hotline: (800) 555-6782
                  </a>
                </div>
              </div>
            </div>

            {/* Right Architectural Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-amber-500/10 border border-white/80 aspect-4/3 sm:aspect-5/4">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                  alt="Verified quality inspection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/90 shadow-lg text-stone-800">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-stone-900 block text-sm">Walkthrough Guarantee</span>
                      <span className="text-stone-500 text-[11px]">Pay only after inspecting finished results</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                      Guaranteed
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          GUARANTEE PROTOCOL PILLARS
      ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-stone-200/80 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900">24-Hour Notification Window</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              If an area of your house, carpet, gutter, or driveway requires additional attention, notify us within 24 hours. A supervisor is dispatched without debate.
            </p>
          </div>

          <div className="bg-white border border-stone-200/80 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900">Pay Upon Completion</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              With our Pay Upon Completion protocol, $0 is charged upfront. You inspect the finished work first before settling your itemized USD invoice.
            </p>
          </div>

          <div className="bg-white border border-stone-200/80 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900">$2,000,000 Liability Cover</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              In the unlikely event of accidental property damage, NorthStar carries comprehensive general liability insurance with zero customer deductible.
            </p>
          </div>
        </div>

        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-8 text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-stone-900">Ready to Experience Care with Full Peace of Mind?</h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Select any of our 10 core property maintenance services with transparent USD pricing and zero upfront charge.
          </p>
          <div className="pt-2">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-stone-900 hover:bg-amber-600 text-white font-bold text-xs transition-colors"
            >
              <span>Schedule Your Appointment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
