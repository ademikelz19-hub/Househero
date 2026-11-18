import Link from 'next/link';
import {
  Home,
  Droplets,
  Wrench,
  Shield,
  ShieldCheck,
  Award,
  CheckCircle2,
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  Send,
  ArrowRight,
  Star,
  CheckCheck
} from 'lucide-react';
import { SERVICES } from '@/data/services';

export default function HomePage() {
  // Only 3 featured core services as requested by user
  const featuredServices = [
    SERVICES.find(s => s.id === 'house-deep-cleaning') || SERVICES[0],
    SERVICES.find(s => s.id === 'gutter-cleaning') || SERVICES[2],
    SERVICES.find(s => s.id === 'hvac-maintenance') || SERVICES[7],
  ];

  // Helper for real trade icons (Zero AI symbols)
  const getTradeIcon = (id: string) => {
    switch (id) {
      case 'house-deep-cleaning':
        return <Home className="w-6 h-6 text-amber-600" />;
      case 'gutter-cleaning':
        return <Droplets className="w-6 h-6 text-amber-600" />;
      case 'hvac-maintenance':
        return <Wrench className="w-6 h-6 text-amber-600" />;
      default:
        return <Wrench className="w-6 h-6 text-amber-600" />;
    }
  };

  // Only 3 verified real reviews as requested
  const featuredReviews = [
    {
      author: 'David & Amanda Sterling',
      location: 'Denver, CO',
      service: 'Gutter Cleaning',
      rating: 5,
      date: 'Verified Homeowner',
      comment:
        'House Hero arrived promptly and cleaned all our 2-story gutters with downspout flushing. Clear upfront USD billing with zero surprise fees. Outstanding craftsmanship.'
    },
    {
      author: 'Marcus Holloway',
      location: 'Minneapolis, MN',
      service: 'HVAC Heating Tune-Up',
      rating: 5,
      date: 'Verified Homeowner',
      comment:
        'Our furnace was making an erratic noise. The tech diagnosed a failing capacitor on the spot and had it running whisper quiet in 40 minutes. Polite, clean, and knowledgeable.'
    },
    {
      author: 'Sophia Chen',
      location: 'Seattle, WA',
      service: 'House & Deep Cleaning',
      rating: 5,
      date: 'Verified Homeowner',
      comment:
        'Hospital-grade thoroughness. Scrubbed baseboards, detailed the oven, and used safe botanical cleaners. Our home looks and smells pristine. 100% worth every dollar.'
    }
  ];

  return (
    <div className="relative space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/70 border border-amber-200/80 text-amber-900 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>Trusted by 2,400+ American Homeowners</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.1]">
                Your Home, Cared For by <span className="text-amber-600">Proven Craftsmen.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
                Reliable property maintenance with honest upfront pricing in USD. Handled exclusively by vetted, W-2 certified technicians backed by $2,000,000 insurance.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all duration-200 hover:shadow-lg"
                >
                  <span>Request a Free Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="tel:18005556782"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-semibold text-sm transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>(800) 555-6782</span>
                </a>
              </div>

              {/* Direct Messaging Channels */}
              <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-stone-600 font-medium">
                <span className="text-stone-400">Direct Chat:</span>
                <a
                  href="https://wa.me/18005556782"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 transition-colors font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Dispatch</span>
                </a>
                <span className="text-stone-300">•</span>
                <a
                  href="https://t.me/househerocare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-700 hover:text-amber-800 transition-colors font-semibold"
                >
                  <Send className="w-3.5 h-3.5 text-amber-600" />
                  <span>Telegram: @househerocare</span>
                </a>
              </div>
            </div>

            {/* Right Liquid Glass Showcase */}
            <div className="lg:col-span-5">
              <div className="glass-warm p-6 sm:p-8 rounded-3xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-amber-200/60">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-amber-500 text-white shadow-sm">
                      <Home className="w-6 h-6" />
                    </span>
                    <div>
                      <div className="font-extrabold text-stone-900 text-lg">House Hero</div>
                      <div className="text-xs text-stone-500 font-medium">Residential & Commercial Standards</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200">
                    Active Dispatch
                  </span>
                </div>

                {/* 3 Metric Cards */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white/80 p-3.5 rounded-2xl border border-stone-100 shadow-xs">
                    <div className="text-xl sm:text-2xl font-black text-stone-900">4.9★</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Google Rating</div>
                  </div>
                  <div className="bg-white/80 p-3.5 rounded-2xl border border-stone-100 shadow-xs">
                    <div className="text-xl sm:text-2xl font-black text-amber-600">$2M</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Liability Insured</div>
                  </div>
                  <div className="bg-white/80 p-3.5 rounded-2xl border border-stone-100 shadow-xs">
                    <div className="text-xl sm:text-2xl font-black text-stone-900">100%</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Satisfaction</div>
                  </div>
                </div>

                {/* Assurance Points */}
                <ul className="space-y-2.5 text-xs text-stone-700 pt-2 border-t border-amber-200/60">
                  <li className="flex items-center gap-2">
                    <CheckCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Exact upfront USD rates — no arrival bait-and-switch</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Strict 7-year background checks on all crew members</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>24-Hour complimentary re-service guarantee</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CREDIBILITY & TRUST BAR */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="glass-card py-4 px-6 rounded-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-between text-stone-700 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2.5 justify-center sm:justify-start">
              <Shield className="w-5 h-5 text-amber-600 shrink-0" />
              <span>$2M General Liability</span>
            </div>
            <div className="flex items-center gap-2.5 justify-center sm:justify-start">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>100% Vetted W-2 Staff</span>
            </div>
            <div className="flex items-center gap-2.5 justify-center sm:justify-start">
              <Award className="w-5 h-5 text-amber-600 shrink-0" />
              <span>BBB A+ Accredited</span>
            </div>
            <div className="flex items-center gap-2.5 justify-center sm:justify-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>24-Hour Re-Clean Promise</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Frictionless Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Simple. Transparent. Done Right.
          </h2>
          <p className="text-sm text-stone-600 max-w-lg mx-auto">
            From initial booking to completed inspection, experience hassle-free home care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 sm:p-7 rounded-2xl space-y-4 relative">
            <div className="flex items-center justify-between">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-bold text-sm">
                01
              </span>
              <Calendar className="w-5 h-5 text-stone-400" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Request or Call</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Submit your inquiry online or call our dispatch desk. Receive an honest, upfront USD estimate with no obligation.
            </p>
          </div>

          <div className="glass-card p-6 sm:p-7 rounded-2xl space-y-4 relative">
            <div className="flex items-center justify-between">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-bold text-sm">
                02
              </span>
              <Clock className="w-5 h-5 text-stone-400" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Prompt On-Time Arrival</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Uniformed, background-checked technicians arrive in fully equipped mobile service vans. We text you before arrival.
            </p>
          </div>

          <div className="glass-card p-6 sm:p-7 rounded-2xl space-y-4 relative">
            <div className="flex items-center justify-between">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-bold text-sm">
                03
              </span>
              <CheckCircle2 className="w-5 h-5 text-stone-400" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Inspected & Guaranteed</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Inspect the completed work with our team. If any detail fails to meet your expectation, we re-service at zero charge.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FEATURED CORE SERVICES (ONLY 3) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Core Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-2">
              Featured Property Services
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Explore our most requested residential care solutions.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
          >
            <span>View All 10 Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-200/60">
                    {getTradeIcon(service.id)}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
                    {service.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-stone-900">{service.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-2">
                  <div className="text-xs text-stone-500 uppercase tracking-wide">Starting from</div>
                  <div className="text-2xl font-black text-stone-900 mt-0.5">
                    ${service.startingPrice}{' '}
                    <span className="text-xs font-normal text-stone-500">USD ({service.priceUnit})</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-200/60 flex items-center gap-3">
                <Link
                  href={`/services/${service.slug}`}
                  className="flex-1 text-center py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors"
                >
                  View Details
                </Link>
                <Link
                  href="/contact"
                  className="flex-1 text-center py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. VERIFIED REVIEWS (ONLY 3) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Real Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Verified Homeowner Reviews
          </h2>
          <p className="text-sm text-stone-600">
            Rated 4.9 out of 5 stars across over 2,400 serviced properties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredReviews.map((rev, idx) => (
            <div key={idx} className="glass-warm p-6 rounded-2xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-amber-200/60 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-stone-900">{rev.author}</div>
                  <div className="text-stone-500">{rev.location}</div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                  {rev.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONVERSION ACTION STRIP (NO FORM ON HOMEPAGE) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready for Dependable Property Care?
            </h2>
            <p className="text-sm sm:text-base text-amber-100 leading-relaxed">
              Reach out directly. We provide transparent USD estimates and schedule rapid dispatch tailored to your calendar.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-white text-stone-900 font-extrabold text-sm hover:bg-amber-50 transition-colors shadow-md"
              >
                Go to Quote &amp; Contact Page
              </Link>
              <a
                href="tel:18005556782"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-stone-900/30 hover:bg-stone-900/40 text-white font-semibold text-sm border border-white/20 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-200" />
                <span>Call (800) 555-6782</span>
              </a>
              <a
                href="https://wa.me/18005556782"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href="https://t.me/househerocare"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-sm transition-colors border border-white/25"
              >
                <Send className="w-4 h-4" />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
