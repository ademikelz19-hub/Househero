'use client';

import React, { useState } from 'react';
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
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { SERVICES } from '@/data/services';

export default function Footer() {
  const [zipInput, setZipInput] = useState('');
  const [zipResult, setZipResult] = useState<{ message: string; covered: boolean } | null>(null);

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipInput.trim();
    if (!cleanZip || cleanZip.length < 5) {
      setZipResult({ message: 'Please enter a valid 5-digit US ZIP code.', covered: false });
      return;
    }

    // Check against priority metros or general US coverage
    const priorityPrefixes = ['80', '55', '60', '53', '63', '64', '66', '98', '02', '28', '78', '43', '46', '84', '68', '97', '83', '15', '48'];
    const prefix = cleanZip.substring(0, 2);

    if (priorityPrefixes.includes(prefix)) {
      setZipResult({
        message: `✓ ZIP ${cleanZip} is in an ACTIVE PRIORITY HUB. Average rapid dispatch time: 30–45 mins.`,
        covered: true
      });
    } else {
      setZipResult({
        message: `✓ ZIP ${cleanZip} has Standard Scheduled Coverage nationwide. Next available crew: Tomorrow 8:00 AM.`,
        covered: true
      });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-sm">
      {/* Pre-Footer Action Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
              <Shield className="w-3.5 h-3.5" /> 100% Satisfaction Guarantee • 24-Hour Re-Service Promise
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to restore & protect your property?
            </h3>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Instant upfront USD pricing, background-checked technicians, and no credit card required for standard quotes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/pricing"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all text-xs"
            >
              Calculate Quote in USD ($)
            </Link>
            <Link
              href="/book"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all text-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Appointment Now</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center">
                <Compass className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">NORTHSTAR</span>
                <span className="ml-1 text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  PROPERTY CARE
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              NorthStar Property Care is the premier nationwide provider of full-spectrum residential and commercial property maintenance. Licensed, bonded, and backed by our \$2,000,000 comprehensive liability insurance.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>4.9 / 5.0 Overall Rating</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">2,800+ Verified Jobs Completed</span>
            </div>

            {/* Quick ZIP Coverage Check */}
            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Instant US ZIP Code Coverage Checker:
              </div>
              <form onSubmit={handleZipCheck} className="flex gap-2 max-w-sm">
                <input
                  type="text"
                  maxLength={5}
                  placeholder="Enter 5-digit ZIP (e.g. 80202)"
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 flex-1"
                />
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-white px-3 py-2 rounded-lg text-xs font-bold border border-slate-700 transition-colors"
                >
                  Verify
                </button>
              </form>
              {zipResult && (
                <div
                  className={`mt-2 p-2.5 rounded-lg text-xs ${
                    zipResult.covered
                      ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300'
                      : 'bg-red-950/60 border border-red-500/30 text-red-300'
                  }`}
                >
                  {zipResult.message}
                </div>
              )}
            </div>
          </div>

          {/* All 10 Services Column 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 border-b border-slate-800 pb-2">
              Interior & Systems
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/house-deep-cleaning" className="hover:text-amber-300 transition-colors">
                  House & Deep Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/carpet-cleaning" className="hover:text-amber-300 transition-colors">
                  Carpet Cleaning & Extraction
                </Link>
              </li>
              <li>
                <Link href="/services/dryer-vent-cleaning" className="hover:text-amber-300 transition-colors">
                  Dryer Vent Lint Scour
                </Link>
              </li>
              <li>
                <Link href="/services/hvac-maintenance" className="hover:text-amber-300 transition-colors">
                  HVAC Tune-Up & Check
                </Link>
              </li>
              <li>
                <Link href="/services/junk-removal" className="hover:text-amber-300 transition-colors">
                  Junk Removal & Hauling
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/services" className="text-amber-400 font-semibold hover:underline flex items-center gap-1">
                  View All 10 Services Directory <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* All 10 Services Column 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 border-b border-slate-800 pb-2">
              Exterior & Winter
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/pressure-washing" className="hover:text-amber-300 transition-colors">
                  Pressure Washing & Soft-Wash
                </Link>
              </li>
              <li>
                <Link href="/services/gutter-cleaning" className="hover:text-amber-300 transition-colors">
                  Gutter & Downspout Clean
                </Link>
              </li>
              <li>
                <Link href="/services/snow-removal" className="hover:text-amber-300 transition-colors">
                  Snow Removal & Plowing
                </Link>
              </li>
              <li>
                <Link href="/services/driveway-walkway-de-icing" className="hover:text-amber-300 transition-colors">
                  Driveway & Walkway De-Icing
                </Link>
              </li>
              <li>
                <Link href="/services/lawn-garden-cleanup" className="hover:text-amber-300 transition-colors">
                  Lawn & Garden Cleanup
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/bundles" className="text-emerald-400 font-semibold hover:underline flex items-center gap-1">
                  Seasonal Bundle Packages <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Hubs & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 border-b border-slate-800 pb-2">
              Operations & Emergency
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>
                  <strong>24/7 Hotline:</strong> <a href="tel:18005822273" className="text-white hover:underline">(800) 582-CARE</a>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>dispatch@northstarpropertycare.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Office: Mon–Sun 7:00 AM – 8:00 PM</span>
              </li>
              <li className="text-[11px] text-amber-300/90 bg-slate-900 p-2 rounded-lg border border-slate-800">
                ⚡ <strong>Severe Weather Alert:</strong> Crews on 24/7 priority standby during freezing precipitation & blizzards.
              </li>
              <li className="pt-2">
                <Link href="/portal" className="text-white hover:text-amber-300 font-semibold underline block">
                  Customer Portal & Invoices
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-500 hover:text-slate-300 text-[11px] block">
                  Operations Admin Console
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Legal & Guarantee Row */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
            <span>© 2026 NorthStar Property Care LLC. All rights reserved.</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">All pricing in USD ($)</span>
            <span>•</span>
            <span className="text-slate-400">Policy #US-GL-99420-2M ($2,000,000 Agg. Liability)</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center text-xs">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/satisfaction-guarantee" className="hover:text-emerald-400 font-medium transition-colors">
              24h Re-Clean Guarantee
            </Link>
            <Link href="/faq" className="hover:text-slate-300 transition-colors">
              FAQ & Knowledge Base
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
