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
  CheckCheck,
  Sparkles
} from 'lucide-react';
import { SERVICES } from '@/data/services';

export default function HomePage() {
  // 3 featured core services
  const featuredServices = [
    SERVICES.find(s => s.id === 'house-deep-cleaning') || SERVICES[0],
    SERVICES.find(s => s.id === 'gutter-cleaning') || SERVICES[2],
    SERVICES.find(s => s.id === 'hvac-maintenance') || SERVICES[7],
  ];

  // Helper for real trade icons
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

  // 3 verified real reviews
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
            <div className="lg:col-span-7 space-y-6 text-left animate-slide-up">
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/70 border border-amber-200/80 text-amber-900 text-xs font-semibold shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Multi-Service Booking Available · Zero On-Site Payment</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.1]">
                Your Home, Cared For by <span className="text-gradient">Proven Craftsmen.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
                Reliable property maintenance with honest upfront pricing in USD. Handled exclusively by vetted, W-2 certified technicians backed by $2,000,000 insurance.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all duration-200 hover:shadow-lg pulse-ring"
                >
                  <span>Book Multiple Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-semibold text-sm transition-colors shadow-xs"
                >
                  <span>Request a Free Quote</span>
                </Link>

                <a
                  href="tel:18005556782"
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-stone-100/80 hover:bg-stone-200 text-stone-800 font-semibold text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>(800) 555-6782</span>
                </a>
              </div>

              {/* Direct Messaging Channels */}
              <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-stone-600 font-medium">
                <span className="text-stone-400">Direct Dispatch:</span>
                <a
                  href="https://wa.me/18005556782"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 transition-colors font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Desk</span>
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

            {/* Right Liquid Glass Showcase with Nexora Animate Float */}
            <div className="lg:col-span-5">
              <div className="glass-warm animate-float p-6 sm:p-8 rounded-3xl space-y-6 shadow-depth-lg border border-amber-200/80">
                <div className="flex items-center justify-between pb-4 border-b border-amber-200/60">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-amber-500 text-white shadow-sm">
                      <Home className="w-6 h-6" />
                    </span>
                    <div>
                      <div className="font-extrabold text-stone-900 text-lg">House Hero</div>
                      <div className="text-xs text-stone-500 font-medium">Residential &amp; Commercial Standards</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200">
                    Active Dispatch
                  </span>
                </div>

                {/* 3 Metric Cards */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white/80 p-3.5 rounded-2xl border border-stone-100 shadow-xs card-hover">
                    <div className="text-xl sm:text-2xl font-black text-stone-900">4.9★</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Google Rating</div>
                  </div>
                  <div className="bg-white/80 p-3.5 rounded-2xl border border-stone-100 shadow-xs card-hover">
                    <div className="text-xl sm:text-2xl font-black text-amber-600">$2M</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Liability Insured</div>
                  </div>
                  <div className="bg-white/80 p-3.5 rounded-2xl border border-stone-100 shadow-xs card-hover">
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

      {/* 2. HOW IT WORKS (3 SIMPLE STEPS WITH CARD HOVER) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-12 animate-slide-up">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Frictionless Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Simple. Transparent. Done Right.
          </h2>
          <p className="text-sm text-stone-600 max-w-lg mx-auto">
            From picking multiple services to sending your booking direct to dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card card-hover p-6 sm:p-7 rounded-2xl space-y-4 relative border border-stone-200/70">
            <div className="flex items-center justify-between">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-bold text-sm">
                01
              </span>
              <Calendar className="w-5 h-5 text-stone-400" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Pick Multiple Services</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Select 1, 2, or all 10 services needed for your home. View transparent, upfront USD pricing instantly.
            </p>
          </div>

          <div className="glass-card card-hover p-6 sm:p-7 rounded-2xl space-y-4 relative border border-stone-200/70">
            <div className="flex items-center justify-between">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-bold text-sm">
                02
              </span>
              <MessageCircle className="w-5 h-5 text-stone-400" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Auto-Generated Message</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Your booking details are packaged into an automated brief. Send it via Gmail, WhatsApp, or Telegram with zero on-site payment.
            </p>
          </div>

          <div className="glass-card card-hover p-6 sm:p-7 rounded-2xl space-y-4 relative border border-stone-200/70">
            <div className="flex items-center justify-between">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-bold text-sm">
                03
              </span>
              <CheckCircle2 className="w-5 h-5 text-stone-400" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Inspected &amp; Guaranteed</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Uniformed, vetted technicians arrive on time. Inspect the completed work with our crew backed by our 24-hr guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CORE SERVICES (NEXORA CARD HOVER & SHIMMER) */}
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

          <div className="flex items-center gap-3">
            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
            >
              <span>Book Multi-Service</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-stone-300">•</span>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors"
            >
              <span>All 10 Services</span>
            </Link>
          </div>
        </div>

        {/* 3 Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="glass-card card-hover relative overflow-hidden rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-stone-200/80 shadow-depth-sm hover:shadow-depth-xl transition-all duration-300"
            >
              {/* Nexora shimmer overlay */}
              <div className="absolute inset-0 rounded-2xl animate-shimmer pointer-events-none opacity-40" />

              <div className="relative space-y-4">
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

              <div className="relative pt-6 mt-6 border-t border-stone-200/60 flex items-center gap-3">
                <Link
                  href={`/services/${service.slug}`}
                  className="flex-1 text-center py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors"
                >
                  View Details
                </Link>
                <Link
                  href="/book"
                  className="flex-1 text-center py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Book Service
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. VERIFIED REVIEWS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-10 animate-slide-up">
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
            <div
              key={idx}
              className="glass-warm card-hover p-6 rounded-2xl flex flex-col justify-between space-y-4 border border-amber-200/60 shadow-depth-sm hover:shadow-depth-md transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
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

      {/* 5. CONVERSION ACTION STRIP */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready for Dependable Property Care?
            </h2>
            <p className="text-sm sm:text-base text-amber-100 leading-relaxed">
              Book multiple services in minutes without paying on site. We auto-generate your booking request for direct transmission via Gmail, WhatsApp, or Telegram.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/book"
                className="px-6 py-3.5 rounded-xl bg-white text-stone-900 font-extrabold text-sm hover:bg-amber-50 transition-colors shadow-md flex items-center gap-2"
              >
                <span>Book Services Online</span>
                <ArrowRight className="w-4 h-4 text-amber-600" />
              </Link>
              <Link
                href="/contact"
                className="px-5 py-3.5 rounded-xl bg-stone-900/30 hover:bg-stone-900/40 text-white font-semibold text-sm border border-white/20 transition-colors"
              >
                <span>Request a Quote</span>
              </Link>
              <a
                href="https://wa.me/18005556782"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Desk</span>
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
