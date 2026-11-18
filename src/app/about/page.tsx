import React from 'react';
import Link from 'next/link';
import { Shield, Star, CheckCircle, Users, Award, HeartHandshake, Phone, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About NorthStar Property Care | Licensed & Insured Standards',
  description: 'Learn about NorthStar Property Care: $2M general liability, background-checked technicians, Green Seal products, and our 100% satisfaction guarantee.',
};

export default function AboutPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Trust & Credentials
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Built on Reliability, Integrity & Craftsmanship
        </h1>
        <p className="text-sm text-stone-700 leading-relaxed">
          Founded with a clear mission: eliminate the frustration of unreliable contractors, hidden fees, and inconsistent work. NorthStar Property Care delivers standardized, hospital-grade property maintenance backed by transparent USD pricing.
        </p>
      </div>

      {/* 4 Pillars of Excellence */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: Shield,
            title: '$2,000,000 Liability',
            desc: 'Every technician, vehicle, and property is backed by an industry-leading $2M aggregate policy. Peace of mind is non-negotiable.'
          },
          {
            icon: Users,
            title: '100% W-2 Vetted Staff',
            desc: 'Zero random subcontractors. Our field technicians undergo rigorous background checks, 7-year criminal screening, and continuous safety training.'
          },
          {
            icon: Award,
            title: 'Exact USD Upfront Rates',
            desc: 'No vague ranges or unexpected arrival surprises. What you see calculated in USD is what you pay upon completed satisfaction.'
          },
          {
            icon: HeartHandshake,
            title: '24-Hour Re-Clean Promise',
            desc: 'If any service area does not meet your exacting standards, notify us within 24 hours. A supervisor returns to re-service at zero cost.'
          }
        ].map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-xl border border-amber-200/70 p-6 rounded-3xl shadow-xl space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center border border-amber-400/20">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">{pillar.title}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">{pillar.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Detailed Standards Section */}
      <div className="bg-white/90 backdrop-blur-xl border border-amber-200/70 rounded-3xl p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Safety & Environmental Stewardship
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Pet-Safe & Eco-Friendly by Default
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            We believe that maintaining a clean, storm-ready home should never come at the expense of your children’s health, your pets’ paws, or the groundwater table.
          </p>

          <ul className="text-xs text-stone-700 space-y-2.5">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span><strong>Pure Magnesium Chloride:</strong> De-icers that do not burn pet paws or crack concrete.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span><strong>Green Seal Certified:</strong> Zero-VOC, non-toxic plant-based interior cleaners.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span><strong>70%+ Landfill Diversion:</strong> We donate and recycle all collected junk items.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span><strong>NFPA & EPA 608 Certified:</strong> Licensed technicians for HVAC and fire safety ductwork.</span>
            </li>
          </ul>
        </div>

        <div className="bg-amber-50/70 p-6 rounded-3xl border border-amber-200/70 space-y-4 text-xs">
          <div className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
            Company Verification Badges
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/90 backdrop-blur-xl border border-amber-200/70">
              <span className="font-semibold text-white">General Liability Policy:</span>
              <span className="text-emerald-400 font-mono">#US-GL-99420-2M ($2,000,000)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/90 backdrop-blur-xl border border-amber-200/70">
              <span className="font-semibold text-white">Bonding & Licensing:</span>
              <span className="text-emerald-400 font-mono">Verified Active • All 50 States</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/90 backdrop-blur-xl border border-amber-200/70">
              <span className="font-semibold text-white">Better Business Bureau:</span>
              <span className="text-emerald-400 font-mono">A+ Accredited Member</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/90 backdrop-blur-xl border border-amber-200/70">
              <span className="font-semibold text-white">Verified Customer Reviews:</span>
              <span className="text-amber-400 font-mono">4.9 / 5.0 (2,800+ Ratings)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
