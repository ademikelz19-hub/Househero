'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, ShieldCheck, Clock, Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import { SERVICE_AREAS } from '@/data/services';

export default function ServiceAreasPage() {
  const [zipInput, setZipInput] = useState('');
  const [result, setResult] = useState<{ message: string; covered: boolean } | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = zipInput.trim();
    if (clean.length < 5) {
      setResult({ message: 'Please enter a valid 5-digit US ZIP code.', covered: false });
      return;
    }
    const priorityPrefixes = ['80', '55', '60', '53', '63', '64', '66', '98', '02', '28', '78', '43', '46', '84', '68', '97', '83', '15', '48'];
    const pfx = clean.substring(0, 2);

    if (priorityPrefixes.includes(pfx)) {
      setResult({
        message: `✓ ZIP ${clean} is verified within our Priority Metro Hub! Rapid dispatch available in under 45 minutes.`,
        covered: true
      });
    } else {
      setResult({
        message: `✓ ZIP ${clean} is active under our Nationwide Standard Dispatch Network. Bookings available starting tomorrow at 8:00 AM.`,
        covered: true
      });
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Nationwide Coverage
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Service Areas & Rapid Response Hubs
        </h1>
        <p className="text-sm text-slate-300">
          We operate centralized equipment depots and mobile response fleets across the United States.
        </p>

        {/* ZIP Verification Widget */}
        <div className="pt-4 max-w-md mx-auto">
          <form onSubmit={handleCheck} className="flex gap-2">
            <input
              type="text"
              maxLength={5}
              placeholder="Enter your 5-digit ZIP (e.g. 80202)"
              value={zipInput}
              onChange={(e) => setZipInput(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 flex-1 font-mono"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md"
            >
              Check ZIP
            </button>
          </form>
          {result && (
            <div
              className={`mt-3 p-3 rounded-xl text-xs text-left ${
                result.covered
                  ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300'
                  : 'bg-red-950/60 border border-red-500/30 text-red-300'
              }`}
            >
              {result.message}
            </div>
          )}
        </div>
      </div>

      {/* Regional Hubs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICE_AREAS.map((hub, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                  {hub.state}
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {hub.dispatchTime}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{hub.hub}</h3>
              <p className="text-xs text-slate-400 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                <span>{hub.address}</span>
              </p>
              <div className="text-xs text-slate-300 font-medium">
                Fleet: <strong>{hub.fleetCount}</strong>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-500">Residential & Commercial</span>
              <Link
                href="/book"
                className="font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>Dispatch Crew</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Residential vs Commercial Guarantee */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">Residential Property Care</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Single-family homes, townhomes, HOAs, and suburban estates. Zero contract commitments required. Transparent upfront USD pricing with automatic bundle discounts.
          </p>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>✓ Same-day and next-day availability</li>
            <li>✓ Pet-safe and eco-certified chemicals</li>
            <li>✓ Keyless entry coordination & photo audit verification</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white">Commercial & Facilities Care</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Office parks, retail strips, apartment complexes, and warehouse facilities. We provide automated blizzard snow clearing, commercial de-icing, and large-scale pressure cleaning.
          </p>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>✓ Net-30 invoicing & digital W-9 forms provided</li>
            <li>✓ $2,000,000 general liability certificate of insurance (COI)</li>
            <li>✓ OSHA 30-certified crew leaders on site</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
