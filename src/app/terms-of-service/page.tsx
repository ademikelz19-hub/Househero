import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | NorthStar Property Care',
  description: 'NorthStar Property Care terms, scheduling conditions, and service agreement.',
};

export default function TermsOfServicePage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-xs leading-relaxed text-slate-300">
      <div>
        <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
          Service Agreement
        </span>
        <h1 className="text-3xl font-black text-white mt-1">Terms of Service</h1>
        <p className="text-slate-500 mt-1">Effective: November 2026</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Scope of Work & USD Pricing</h2>
          <p>
            All prices quoted and billed by NorthStar Property Care LLC are in United States Dollars (USD). Quotes are calculated based on parameters supplied by the client (such as home size, lot acreage, stories, and service tiers). Should on-site conditions differ significantly (e.g., severe bio-hazards or structural deterioration), our crew leader will provide a revised written scope for your approval before starting work.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Access & Utility Requirements</h2>
          <p>
            Clients agree to provide safe access to the service areas on the scheduled date and arrival window. For exterior pressure washing and gutter jetting, clients agree to provide an operational outdoor hose spigot. For interior services, secure arrangements for pets must be made.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Weather & Safety Postponements</h2>
          <p>
            Field technician safety is our priority. NorthStar reserves the right to postpone exterior ladder, roof, or pressure-washing work in the presence of lightning, sub-zero freezing squalls, or sustained winds over 25 mph. Postponed dispatches receive priority rescheduling within 24–48 hours.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Insurance & Damage Coverage</h2>
          <p>
            NorthStar carries $2,000,000 aggregate Commercial General Liability Insurance under Policy #US-GL-99420-2M. Any suspected property damage must be documented and submitted to our dispatch office within 48 hours of service completion for expedited adjuster review.
          </p>
        </section>
      </div>
    </div>
  );
}
