import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Shield,
  Star,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Phone,
  Layers,
  Wrench,
  Droplet,
  Snowflake,
  Truck,
  Flame,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';
import { SERVICES } from '@/data/services';
import ServiceCalculator from '@/components/ServiceCalculator';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return Sparkles;
      case 'Layers': return Layers;
      case 'Droplet': return Droplet;
      case 'Snowflake': return Snowflake;
      case 'Wrench': return Wrench;
      case 'Truck': return Truck;
      case 'Flame': return Flame;
      case 'Leaf': return Leaf;
      case 'ShieldCheck': return ShieldCheck;
      default: return Wrench;
    }
  };

  const IconComp = getServiceIcon(service.iconName);

  return (
    <div className="space-y-16 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-amber-200/70 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                NorthStar Property Care • {service.category.toUpperCase()}
              </span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Satisfaction Guarantee
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-2xl">
              {service.fullDesc}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-stone-700 font-semibold">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>4.9★ Verified Quality</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-400">
                <Clock className="w-4 h-4" />
                <span>Average Duration: {service.avgDuration}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Shield className="w-4 h-4" />
                <span>$2,000,000 Insured & Bonded Crew</span>
              </div>
            </div>
          </div>

          {/* Hero Sticky Pricing Card */}
          <div className="lg:col-span-4 bg-amber-50/70/90 border border-amber-200/70 p-6 rounded-3xl shadow-xl text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50/70 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
              <IconComp className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
                Upfront Pricing Starts At:
              </span>
              <div className="text-4xl font-black text-emerald-400 font-mono mt-1">
                ${service.startingPrice} <span className="text-xs text-stone-500 font-normal">USD</span>
              </div>
              <div className="text-xs text-slate-500">{service.priceUnit}</div>
            </div>

            <div className="pt-2 border-t border-amber-200/70 space-y-2">
              <Link
                href={`/book?service=${service.id}`}
                className="w-full py-3.5 px-6 rounded-xl font-black text-xs text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 block transition-all text-center"
              >
                Book {service.title} Now
              </Link>
              <a
                href="tel:18005822273"
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-stone-700 hover:text-white bg-white/90 backdrop-blur-xl border border-amber-200/70 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Hotline: (800) 582-CARE</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT'S INCLUDED CHECKLIST */}
      <section className="bg-white/90 backdrop-blur-xl border border-amber-200/70 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Standard Protocol
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            What’s Included in Every Service
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Our crews follow strict standard operating procedures with no corners cut.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {service.includedFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="bg-amber-50/70/60 border border-amber-200/60/60 p-4 rounded-2xl flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-stone-800 leading-relaxed">
                {feat}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DEDICATED SERVICE PRICING CALCULATOR */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Configure Your Job
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Interactive USD ($) Pricing Engine
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Adjust property dimensions, treatment tiers, and add-ons below for real-time itemized pricing.
          </p>
        </div>

        <ServiceCalculator serviceId={service.id} showBookButton={true} />
      </section>

      {/* 4. BEFORE & AFTER PROOF SLIDER */}
      <section className="bg-white/90 backdrop-blur-xl border border-amber-200/70 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Transformation Gallery
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Real Before & After Case Study
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {service.caseStudyTitle} • Total Investment: <strong>${service.caseStudyCost} USD</strong>
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <BeforeAfterSlider
            beforeImage={service.beforeImage}
            afterImage={service.afterImage}
            beforeLabel="BEFORE TREATMENT"
            afterLabel="AFTER NORTHSTAR CARE"
          />
        </div>
      </section>

      {/* 5. STEP-BY-STEP PROCESS */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Field Execution
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Our 4-Step Service Process
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {service.processSteps.map((s) => (
            <div
              key={s.step}
              className="bg-white/90 backdrop-blur-xl border border-amber-200/70 p-6 rounded-3xl space-y-2 relative"
            >
              <div className="text-2xl font-black text-amber-400 font-mono">
                0{s.step}
              </div>
              <h3 className="text-sm font-bold text-white">{s.title}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. EQUIPMENT & SAFETY STANDARDS */}
      <section className="bg-white/90 backdrop-blur-xl border border-amber-200/70 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Commercial Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Equipment & Safety Protocols
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            We invest in enterprise-grade machinery and continuous OSHA training so your property is always protected.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {service.equipmentSafety.map((item, idx) => (
            <div
              key={idx}
              className="bg-amber-50/50 border border-amber-200/60/60 p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold text-stone-800"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SERVICE FAQS */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {service.title} FAQs
          </h2>
        </div>

        <div className="space-y-3">
          {service.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-xl border border-amber-200/70 p-5 rounded-2xl space-y-2"
            >
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">Q:</span>
                {faq.question}
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed pl-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. VERIFIED CUSTOMER REVIEWS FOR THIS SERVICE */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Verified Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Customer Reviews for {service.title}
            </h2>
          </div>
          <Link
            href="/reviews"
            className="text-xs font-semibold text-amber-400 hover:underline"
          >
            View all 2,800+ reviews →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-xl border border-amber-200/70 p-6 rounded-3xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-slate-500">{rev.date}</span>
              </div>
              <p className="text-xs text-stone-700 italic leading-relaxed">
                "{rev.comment}"
              </p>
              <div className="pt-2 border-t border-amber-200/70 text-xs font-bold text-white">
                {rev.author} • <span className="text-stone-500 font-normal">{rev.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
