import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Clock, Phone, Sparkles } from 'lucide-react';

export const metadata = {
  title: '100% Satisfaction Guarantee | NorthStar Property Care',
  description: 'Our 24-hour re-service policy and 100% satisfaction guarantee.',
};

export default function SatisfactionGuaranteePage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10 text-xs leading-relaxed text-stone-700">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
          <ShieldCheck className="w-9 h-9" />
        </div>
        <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">
          The NorthStar Promise
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          100% Satisfaction Guarantee & 24-Hour Re-Service Policy
        </h1>
        <p className="text-sm text-stone-500 max-w-xl mx-auto">
          We don’t stop until you are thrilled with your property. No excuses, no hidden re-visit fees.
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-xl border border-amber-200/70 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
        <div className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">1.</span> The 24-Hour Re-Service Window
          </h2>
          <p>
            Inspect your property after any service. If any area does not match our documented 64-point touchpoint standards or leaves you unsatisfied, notify us within 24 hours of job completion. A certified crew supervisor will return within 24 hours to re-clean, re-flush, or re-treat the area free of charge.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">2.</span> How to Trigger a Re-Service
          </h2>
          <p>
            Triggering a re-service is simple:
          </p>
          <ul className="space-y-1.5 pl-4 list-disc text-stone-700">
            <li>Call our dispatch hotline directly at <strong>(800) 582-CARE</strong></li>
            <li>Or log into your <strong>Customer Portal</strong>, open your completed booking, and click "Request Guarantee Re-Check"</li>
            <li>You may attach photos to help our team arrive with targeted specialty equipment</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span className="text-emerald-400">3.</span> Zero Financial Risk
          </h2>
          <p>
            If after our re-service visit you remain unsatisfied with the quality, we will gladly issue a full refund of that service line item in USD ($). We stand by our work 100%.
          </p>
        </div>

        <div className="pt-4 border-t border-amber-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-stone-500 text-[11px]">
            Have a question about a completed booking?
          </div>
          <Link
            href="/contact"
            className="py-2.5 px-5 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors"
          >
            Contact Customer Dispatch
          </Link>
        </div>
      </div>
    </div>
  );
}
