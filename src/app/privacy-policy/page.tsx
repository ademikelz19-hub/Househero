import React from 'react';
import Link from 'next/link';
import { Shield, Lock, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | House Hero',
  description: 'House Hero customer privacy and data security policies.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full">
      {/* Hero Section with Functional Section Links */}
      <section className="relative pt-6 pb-12 lg:pt-12 lg:pb-16 overflow-hidden border-b border-amber-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold uppercase tracking-wide">
                <span>Data Protection</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight">
                Customer Privacy &amp; Data Security
              </h1>
              <p className="text-base text-stone-600 max-w-xl">
                We safeguard your personal address, telephone, and billing records. We never sell homeowner information to third-party marketing brokers.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <a href="#collection" className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold">
                  1. Information Collected
                </a>
                <a href="#usage" className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold">
                  2. Dispatch Usage
                </a>
                <a href="#security" className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold">
                  3. Encryption Standards
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-amber-500/10 border border-white/80 aspect-4/3 sm:aspect-5/4">
                <img
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=85"
                  alt="Customer data security"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 space-y-8 text-xs sm:text-sm text-stone-700">
        <div className="bg-white border border-stone-200/80 p-6 sm:p-10 rounded-2xl shadow-xs space-y-6">
          <div id="collection" className="space-y-2">
            <h2 className="text-base font-bold text-stone-900">1. Information We Collect</h2>
            <p className="leading-relaxed">
              When you schedule an appointment, request a callback, or lookup a reservation, we collect the necessary dispatch details: Full Name, Service Address, 5-digit US ZIP Code, Email Address, and Phone Number for SMS arrival alerts.
            </p>
          </div>

          <div id="usage" className="space-y-2 pt-4 border-t border-stone-100">
            <h2 className="text-base font-bold text-stone-900">2. How We Use Dispatch Data</h2>
            <p className="leading-relaxed">
              Your details are used solely to generate accurate USD estimates, route mobile service vans, deliver arrival status notifications, and process payments upon completed service. We do not license, sell, or rent homeowner contact information.
            </p>
          </div>

          <div id="security" className="space-y-2 pt-4 border-t border-stone-100">
            <h2 className="text-base font-bold text-stone-900">3. Storage &amp; Encryption</h2>
            <p className="leading-relaxed">
              All digital communications and booking receipts are encrypted via standard TLS 1.3 encryption. For questions regarding your service records, email <strong>dispatch@House Heropropertycare.us</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
