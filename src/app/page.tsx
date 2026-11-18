'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Compass,
  Phone,
  Shield,
  Star,
  Sparkles,
  Layers,
  Droplet,
  Snowflake,
  Wrench,
  Truck,
  Flame,
  Leaf,
  ShieldCheck,
  Gift,
  Image as ImageIcon,
  MapPin,
  Clock,
  User,
  ArrowRight,
  CheckCircle2,
  Calendar,
  DollarSign,
  Search,
  AlertCircle,
  Check,
  Printer,
  RefreshCw,
  Zap,
  ChevronRight
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SERVICES, CATEGORIES, ServiceData } from '@/data/services';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ReviewModal from '@/components/ReviewModal';

export default function HomePage() {
  const { addBooking, bookings, cancelBooking, rescheduleBooking } = useApp();

  // State for Service Category Tab in Hero
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // State for Quick ZIP Check in Hero
  const [heroZip, setHeroZip] = useState('');
  const [heroZipStatus, setHeroZipStatus] = useState<{ message: string; isCovered: boolean } | null>(null);

  // Simplified Fast Booking State
  const [selectedServiceId, setSelectedServiceId] = useState<string>('house-deep-cleaning');
  const [serviceTier, setServiceTier] = useState<'standard' | 'deep' | 'commercial'>('standard');
  const [addOnOven, setAddOnOven] = useState(false);
  const [addOnDownspout, setAddOnDownspout] = useState(false);
  const [addOnPet, setAddOnPet] = useState(false);

  // Booking Form Inputs
  const [custName, setCustName] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [custZip, setCustZip] = useState('');
  const [serviceDate, setServiceDate] = useState('2026-11-20');
  const [timeWindow, setTimeWindow] = useState('Morning 8:00 AM – 11:00 AM');
  const [paymentChoice, setPaymentChoice] = useState<'pay-upon-completion' | 'card-hold'>('pay-upon-completion');
  const [gateNotes, setGateNotes] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState<any | null>(null);

  // Review Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [activeReviews, setActiveReviews] = useState([
    {
      author: 'David & Amanda Sterling',
      rating: 5,
      date: 'Yesterday',
      location: 'Denver, CO',
      service: 'Gutter Cleaning & Snow Removal',
      comment: 'NorthStar arrived right after the first blizzard. Cleaned all gutters and cleared our 4-car driveway before 9 AM. Transparent USD billing with zero surprise fees!'
    },
    {
      author: 'Marcus Holloway',
      rating: 5,
      date: '3 days ago',
      location: 'Minneapolis, MN',
      service: 'HVAC Heating Tune-Up',
      comment: 'Our furnace was making a grinding noise. The tech diagnosed a failing blower motor capacitor on the spot and had it running whisper quiet in 45 minutes.'
    },
    {
      author: 'Sophia Chen',
      rating: 5,
      date: '1 week ago',
      location: 'Seattle, WA',
      service: 'House & Deep Cleaning',
      comment: 'Hospital-grade cleanliness. They cleaned behind our stove, scrubbed baseboards, and used pet-safe botanical detergents. 100% worth every dollar.'
    },
    {
      author: 'Robert Keller',
      rating: 5,
      date: '2 weeks ago',
      location: 'Boston, MA',
      service: 'Pressure Washing',
      comment: 'Removed 5 years of mildew and oil spots from our flagstone patio and driveway. Looked like a newly poured slab!'
    }
  ]);

  // Portal / Booking Tracker Lookup State
  const [trackQuery, setTrackQuery] = useState('');
  const [trackedBooking, setTrackedBooking] = useState<any | null>(null);
  const [trackSearched, setTrackSearched] = useState(false);

  // Callback Hotline Form State
  const [callName, setCallName] = useState('');
  const [callPhone, setCallPhone] = useState('');
  const [callService, setCallService] = useState('Emergency Dispatch');
  const [callSubmitted, setCallSubmitted] = useState(false);

  // Helper for Service Icon
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

  // Filtered Services for Hero Grid
  const filteredServices = useMemo(() => {
    if (selectedCategory === 'all') return SERVICES;
    return SERVICES.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  // Selected Service object for booking
  const activeServiceObj = useMemo(() => {
    return SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  }, [selectedServiceId]);

  // Calculate live USD price for simplified booking
  const calculatedBookingTotal = useMemo(() => {
    let base = activeServiceObj.startingPrice;
    let multiplier = 1.0;
    if (serviceTier === 'deep') multiplier = 1.45;
    if (serviceTier === 'commercial') multiplier = 1.8;

    let total = base * multiplier;
    if (addOnOven) total += 35;
    if (addOnDownspout) total += 35;
    if (addOnPet) total += 30;

    return Math.round(total);
  }, [activeServiceObj, serviceTier, addOnOven, addOnDownspout, addOnPet]);

  // Quick ZIP check in Hero
  const handleHeroZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroZip || heroZip.trim().length < 5) {
      setHeroZipStatus({ message: 'Please enter a valid 5-digit US ZIP code.', isCovered: false });
      return;
    }
    const clean = heroZip.trim();
    setHeroZipStatus({
      message: `✓ ZIP ${clean} is Covered! Rapid dispatch response: 30–45 mins.`,
      isCovered: true
    });
    setCustZip(clean);
  };

  // Pre-select service and scroll smoothly to booking
  const handleSelectServiceForBooking = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const element = document.getElementById('book');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pre-select seasonal bundle
  const handleSelectBundle = (bundleName: string, serviceId: string, tier: 'standard' | 'deep' | 'commercial') => {
    setSelectedServiceId(serviceId);
    setServiceTier(tier);
    const element = document.getElementById('book');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Instant Booking Submit
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim() || !custPhone.trim() || !custAddress.trim()) {
      alert('Please fill out your Name, Phone Number, and Service Address.');
      return;
    }

    const newBooking = addBooking({
      services: [
        {
          serviceId: activeServiceObj.id,
          serviceTitle: activeServiceObj.title,
          subtotal: calculatedBookingTotal,
          config: {
            tier: serviceTier,
            addOnOven,
            addOnDownspout,
            addOnPet
          }
        }
      ],
      customer: {
        fullName: custName.trim(),
        email: custEmail.trim() || 'homeowner@northstarcare.us',
        phone: custPhone.trim(),
        address: custAddress.trim(),
        city: 'Metro Service Zone',
        state: 'US',
        zipCode: custZip.trim() || '80202',
        notes: gateNotes.trim()
      },
      scheduledDate: serviceDate,
      timeWindow: timeWindow,
      paymentMethod: paymentChoice,
      subtotalUSD: calculatedBookingTotal,
      discountUSD: 0,
      totalUSD: calculatedBookingTotal
    });

    setBookingConfirmed(newBooking);
  };

  // Handle Booking Tracker Query
  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackSearched(true);
    const q = trackQuery.trim().toLowerCase();
    if (!q) {
      setTrackedBooking(null);
      return;
    }
    const found = bookings.find(
      (b) =>
        b.id.toLowerCase().includes(q) ||
        b.customer.phone.includes(q) ||
        b.customer.email.toLowerCase().includes(q)
    );
    setTrackedBooking(found || null);
  };

  // Handle Callback Request Submit
  const handleCallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callName || !callPhone) return;
    setCallSubmitted(true);
    setTimeout(() => {
      setCallName('');
      setCallPhone('');
    }, 2000);
  };

  return (
    <div className="relative w-full">
      {/* =========================================================================
          HERO SECTION: Radiant White & Golden Orange Aura + Services in Hero
      ========================================================================= */}
      <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden">
        {/* Floating Golden Liquid Blurs in Background */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10">
          <div className="absolute -top-10 left-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-amber-300/35 via-orange-300/25 to-yellow-200/40 blur-3xl animate-liquid-float" />
          <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-gradient-to-bl from-yellow-300/30 via-amber-400/20 to-orange-300/20 blur-3xl animate-liquid-float-slow" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Header Box */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            {/* Liquid Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-amber-300/70 shadow-sm shadow-amber-500/10 text-stone-800 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span className="text-amber-700">✦ NorthStar Liquid Property Care</span>
              <span className="text-amber-300">•</span>
              <span className="text-stone-600">All 10 Services Priced in USD ($)</span>
            </div>

            {/* Radiant Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 leading-[1.12]">
              America’s Purest Property Care.{' '}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Golden Standards,
              </span>{' '}
              Zero Surprises.
            </h1>

            {/* Clear Subtitle */}
            <p className="text-sm sm:text-lg text-stone-600 max-w-2xl mx-auto font-medium">
              From hospital-grade deep cleaning to winter storm snow dispatch — licensed, bonded, and backed by a $2,000,000 insurance policy with transparent USD ($) pricing.
            </p>

            {/* Quick ZIP Coverage Checker inside Hero */}
            <form
              onSubmit={handleHeroZipCheck}
              className="max-w-md mx-auto pt-2 flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="relative w-full">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                <input
                  type="text"
                  maxLength={5}
                  value={heroZip}
                  onChange={(e) => setHeroZip(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 5-Digit US ZIP Code"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-amber-300 text-stone-900 placeholder-stone-400 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto whitespace-nowrap px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-amber-500/25 transition-all hover:-translate-y-0.5"
              >
                Check Coverage
              </button>
            </form>

            {heroZipStatus && (
              <div
                className={`text-xs font-bold inline-block px-4 py-1.5 rounded-full mt-2 ${
                  heroZipStatus.isCovered
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-50 text-amber-800 border border-amber-300'
                }`}
              >
                {heroZipStatus.message}
              </div>
            )}
          </div>

          {/* =========================================================================
              THE 10 SERVICES IN THE HERO (Liquid Glass Cards & Filter Tabs)
          ========================================================================= */}
          <div className="mt-12 sm:mt-16" id="services">
            {/* Category Filter Pills */}
            <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25 scale-105'
                      : 'bg-white/70 backdrop-blur-md text-stone-700 hover:bg-white hover:text-amber-600 border border-amber-200/60 shadow-xs'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Liquid Glass Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredServices.map((service) => {
                const IconComponent = getServiceIcon(service.iconName);
                const isSelected = selectedServiceId === service.id;

                return (
                  <div
                    key={service.id}
                    id={`service-${service.id}`}
                    className={`relative rounded-3xl p-5 transition-all duration-300 group flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-b from-white via-amber-50/50 to-amber-100/30 border-2 border-amber-400 shadow-xl shadow-amber-500/15 -translate-y-1'
                        : 'bg-white/75 backdrop-blur-xl border border-white/90 hover:border-amber-300 shadow-md shadow-amber-500/5 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1'
                    }`}
                  >
                    <div>
                      {/* Top Bar: Icon + Starting USD Badge */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 p-[1.5px] shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform">
                          <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-amber-600" />
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block">
                            Starting Rate
                          </span>
                          <span className="text-base font-extrabold text-amber-700">
                            ${service.startingPrice}{' '}
                            <span className="text-[10px] font-normal text-stone-500">
                              USD
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Title & Short Description */}
                      <h3 className="font-extrabold text-base text-stone-900 group-hover:text-amber-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                        {service.shortDesc}
                      </p>

                      {/* Turnaround Pill */}
                      <div className="flex items-center gap-1.5 mt-3 text-[11px] font-semibold text-amber-800 bg-amber-50/90 px-2.5 py-1 rounded-xl border border-amber-200/60 w-fit">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>{service.avgDuration}</span>
                      </div>

                      {/* Included Highlights Preview */}
                      <ul className="mt-3.5 space-y-1.5 text-[11px] text-stone-600">
                        {service.includedFeatures.slice(0, 2).map((feature, i) => (
                          <li key={i} className="flex items-center gap-1.5 truncate">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="truncate">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button: Instant Select & Book */}
                    <div className="mt-5 pt-3 border-t border-amber-100/70 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-stone-500 font-medium">
                        Unit: {service.priceUnit}
                      </span>
                      <button
                        onClick={() => handleSelectServiceForBooking(service.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-white shadow-sm'
                            : 'bg-amber-100/80 hover:bg-amber-500 text-amber-900 hover:text-white'
                        }`}
                      >
                        <span>{isSelected ? 'Selected' : 'Book Now'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SIMPLIFIED FAST 3-STEP BOOKING & QUOTE SECTION (#book)
      ========================================================================= */}
      <section id="book" className="py-16 bg-gradient-to-b from-transparent via-amber-50/30 to-transparent relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300/50">
              Instant Scheduling
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Simplified 3-Step Instant Booking
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
              Select your service, choose your arrival window, and confirm in seconds. Zero upfront charge option available.
            </p>
          </div>

          {/* Booking Container (Liquid Glass Card) */}
          <div className="bg-white/85 backdrop-blur-2xl border border-amber-200/80 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-amber-500/10">
            {bookingConfirmed ? (
              /* Booking Confirmation Receipt Screen */
              <div className="text-center py-6 space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-md">
                  <Check className="w-9 h-9" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Booking Confirmed • Reference #{bookingConfirmed.id}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">
                    You’re On the NorthStar Schedule!
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    A confirmation dispatch notification has been sent. Your certified crew will arrive during the scheduled window.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="max-w-md mx-auto bg-amber-50/70 border border-amber-200 rounded-2xl p-5 text-left text-xs space-y-2.5">
                  <div className="flex justify-between pb-2 border-b border-amber-200/60 font-bold text-stone-800">
                    <span>Service:</span>
                    <span className="text-amber-800">{bookingConfirmed.services[0].serviceTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Date & Window:</span>
                    <span className="font-semibold text-stone-800">{bookingConfirmed.scheduledDate} ({bookingConfirmed.timeWindow})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Service Address:</span>
                    <span className="font-semibold text-stone-800">{bookingConfirmed.customer.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Payment Protocol:</span>
                    <span className="font-semibold text-emerald-700 uppercase">
                      {bookingConfirmed.paymentMethod === 'pay-upon-completion' ? 'Pay Upon Completion' : 'Card Hold'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-amber-200/60 text-sm font-extrabold text-stone-900">
                    <span>Guaranteed USD Total:</span>
                    <span className="text-amber-700">${bookingConfirmed.totalUSD}.00 USD</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl bg-white border border-amber-300 text-xs font-bold text-stone-800 hover:bg-amber-50 flex items-center gap-2 shadow-xs"
                  >
                    <Printer className="w-4 h-4 text-amber-600" />
                    <span>Print Receipt</span>
                  </button>
                  <a
                    href="#portal"
                    onClick={() => {
                      setTrackQuery(bookingConfirmed.id);
                      setTrackedBooking(bookingConfirmed);
                      setTrackSearched(true);
                    }}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-md shadow-amber-500/25 flex items-center gap-2 hover:from-amber-600 hover:to-orange-600"
                  >
                    <span>Track in Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setBookingConfirmed(null)}
                    className="px-4 py-2 rounded-xl text-stone-500 hover:text-stone-900 text-xs font-semibold"
                  >
                    Book Another Service
                  </button>
                </div>
              </div>
            ) : (
              /* The 3-Step Interactive Booking Form */
              <form onSubmit={handleConfirmBooking} className="space-y-8">
                {/* STEP 1: SERVICE & CUSTOMIZATION */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white text-xs flex items-center justify-center font-extrabold">
                      1
                    </span>
                    <span>Select Service & Property Tier</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Service Selector Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Selected Service
                      </label>
                      <select
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                        className="w-full bg-amber-50/50 border border-amber-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title} (Starting at ${s.startingPrice} USD)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Tier Selector */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        Property Scope / Tier
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setServiceTier('standard')}
                          className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            serviceTier === 'standard'
                              ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                              : 'bg-white text-stone-700 border-amber-200 hover:bg-amber-50'
                          }`}
                        >
                          Standard
                        </button>
                        <button
                          type="button"
                          onClick={() => setServiceTier('deep')}
                          className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            serviceTier === 'deep'
                              ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                              : 'bg-white text-stone-700 border-amber-200 hover:bg-amber-50'
                          }`}
                        >
                          Deep / Large
                        </button>
                        <button
                          type="button"
                          onClick={() => setServiceTier('commercial')}
                          className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            serviceTier === 'commercial'
                              ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                              : 'bg-white text-stone-700 border-amber-200 hover:bg-amber-50'
                          }`}
                        >
                          Commercial
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Optional Quick Add-ons */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-stone-700 mb-2">
                      Optional Upgrades & Add-ons (USD)
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-semibold text-stone-800 cursor-pointer hover:bg-amber-100/60">
                        <input
                          type="checkbox"
                          checked={addOnOven}
                          onChange={(e) => setAddOnOven(e.target.checked)}
                          className="rounded text-amber-500 focus:ring-amber-400"
                        />
                        <span>Inside Oven / Deep Degrease (+$35)</span>
                      </label>
                      <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-semibold text-stone-800 cursor-pointer hover:bg-amber-100/60">
                        <input
                          type="checkbox"
                          checked={addOnDownspout}
                          onChange={(e) => setAddOnDownspout(e.target.checked)}
                          className="rounded text-amber-500 focus:ring-amber-400"
                        />
                        <span>Downspout High-Pressure Flush (+$35)</span>
                      </label>
                      <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50/60 border border-amber-200 text-xs font-semibold text-stone-800 cursor-pointer hover:bg-amber-100/60">
                        <input
                          type="checkbox"
                          checked={addOnPet}
                          onChange={(e) => setAddOnPet(e.target.checked)}
                          className="rounded text-amber-500 focus:ring-amber-400"
                        />
                        <span>Pet Odor & Enzyme Treatment (+$30)</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* STEP 2: SCHEDULE & ADDRESS */}
                <div className="space-y-4 pt-4 border-t border-amber-100">
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white text-xs flex items-center justify-center font-extrabold">
                      2
                    </span>
                    <span>Service Address & Arrival Window</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 742 Evergreen Terrace"
                        value={custAddress}
                        onChange={(e) => setCustAddress(e.target.value)}
                        className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        5-Digit US ZIP
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        placeholder="e.g. 80202"
                        value={custZip}
                        onChange={(e) => setCustZip(e.target.value)}
                        className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Service Date
                      </label>
                      <input
                        type="date"
                        required
                        value={serviceDate}
                        onChange={(e) => setServiceDate(e.target.value)}
                        className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Arrival Window
                      </label>
                      <select
                        value={timeWindow}
                        onChange={(e) => setTimeWindow(e.target.value)}
                        className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                      >
                        <option value="Morning 8:00 AM – 11:00 AM">Morning 8:00 AM – 11:00 AM</option>
                        <option value="Midday 11:00 AM – 2:00 PM">Midday 11:00 AM – 2:00 PM</option>
                        <option value="Afternoon 2:00 PM – 5:00 PM">Afternoon 2:00 PM – 5:00 PM</option>
                        <option value="Priority Rapid Weather Dispatch (24/7)">Priority Rapid Weather Dispatch (24/7)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* STEP 3: CONTACT & CONFIRMATION */}
                <div className="space-y-4 pt-4 border-t border-amber-100">
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white text-xs flex items-center justify-center font-extrabold">
                      3
                    </span>
                    <span>Contact Details & Payment Protocol</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rachel Sterling"
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Phone (SMS updates)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. (303) 555-0199"
                        value={custPhone}
                        onChange={(e) => setCustPhone(e.target.value)}
                        className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. rachel@example.com"
                        value={custEmail}
                        onChange={(e) => setCustEmail(e.target.value)}
                        className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Payment Protocol Toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <label
                      onClick={() => setPaymentChoice('pay-upon-completion')}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                        paymentChoice === 'pay-upon-completion'
                          ? 'bg-amber-50/80 border-amber-400 shadow-sm'
                          : 'bg-white border-amber-200/60 hover:bg-amber-50/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentChoice === 'pay-upon-completion'}
                        onChange={() => setPaymentChoice('pay-upon-completion')}
                        className="mt-1 text-amber-500 focus:ring-amber-400"
                      />
                      <div>
                        <div className="font-bold text-xs text-stone-900">
                          Pay Upon Completion (Recommended)
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          Inspect technician work first. Zero payment charged today.
                        </div>
                      </div>
                    </label>

                    <label
                      onClick={() => setPaymentChoice('card-hold')}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                        paymentChoice === 'card-hold'
                          ? 'bg-amber-50/80 border-amber-400 shadow-sm'
                          : 'bg-white border-amber-200/60 hover:bg-amber-50/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentChoice === 'card-hold'}
                        onChange={() => setPaymentChoice('card-hold')}
                        className="mt-1 text-amber-500 focus:ring-amber-400"
                      />
                      <div>
                        <div className="font-bold text-xs text-stone-900">
                          Card On File Hold
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          Secure reservation hold. Billed only after 100% satisfaction check.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Bottom Bar: Live Transparent USD Price + Instant Book Button */}
                <div className="pt-6 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 bg-amber-50/40 -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 p-6 sm:p-8 rounded-b-3xl">
                  <div>
                    <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block">
                      Itemized Guaranteed Price
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-black text-amber-700">
                        ${calculatedBookingTotal}.00
                      </span>
                      <span className="text-xs text-stone-600 font-semibold">USD</span>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      ✓ Zero hidden fees • All supplies & labor included
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="shimmer-mask w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Confirm Booking (${calculatedBookingTotal} USD)</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEASONAL BUNDLES SECTION (#bundles)
      ========================================================================= */}
      <section id="bundles" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300/50">
            Multi-Service Value
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Curated Seasonal Packages
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Combine complimentary services into a single coordinated crew dispatch and save up to $350.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Winter Fortress Bundle */}
          <div className="rounded-3xl p-6 bg-white/80 backdrop-blur-xl border border-amber-200/80 shadow-lg shadow-amber-500/5 hover:shadow-xl hover:shadow-amber-500/15 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-50 text-blue-800 rounded-full border border-blue-200">
                  Winter Defense
                </span>
                <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  SAVE $110
                </span>
              </div>
              <h3 className="font-extrabold text-lg text-stone-900">
                Winter Fortress Bundle
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Complete winter freeze protection for driveways, gutters, and home heating.
              </p>
              <div className="my-4 pt-3 border-t border-amber-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-stone-900">$345</span>
                  <span className="text-xs text-stone-400 line-through font-semibold">$455</span>
                  <span className="text-xs font-bold text-amber-700">USD</span>
                </div>
              </div>
              <ul className="space-y-1.5 text-xs text-stone-600">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Snow Removal (Standard Driveway)
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Driveway & Walkway De-Icing
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Gutter Cleaning & Downspout Flush
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> HVAC 21-Point Furnace Check
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectBundle('Winter Fortress', 'snow-removal', 'standard')}
              className="mt-6 w-full py-2.5 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-500 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Book Bundle</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Spring Curb Appeal Bundle */}
          <div className="rounded-3xl p-6 bg-white/80 backdrop-blur-xl border border-amber-200/80 shadow-lg shadow-amber-500/5 hover:shadow-xl hover:shadow-amber-500/15 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                  Spring Revival
                </span>
                <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  SAVE $85
                </span>
              </div>
              <h3 className="font-extrabold text-lg text-stone-900">
                Spring Curb Appeal
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Wash away grime and restore pristine lawn borders and gutters.
              </p>
              <div className="my-4 pt-3 border-t border-amber-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-stone-900">$320</span>
                  <span className="text-xs text-stone-400 line-through font-semibold">$405</span>
                  <span className="text-xs font-bold text-amber-700">USD</span>
                </div>
              </div>
              <ul className="space-y-1.5 text-xs text-stone-600">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Pressure Washing (Concrete)
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Lawn & Garden Cleanup
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Full Gutter Hand-Scoop
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectBundle('Spring Curb Appeal', 'pressure-washing', 'standard')}
              className="mt-6 w-full py-2.5 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-500 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Book Bundle</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interior Wellness Bundle */}
          <div className="rounded-3xl p-6 bg-white/80 backdrop-blur-xl border border-amber-200/80 shadow-lg shadow-amber-500/5 hover:shadow-xl hover:shadow-amber-500/15 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                  Indoor Air & Floor
                </span>
                <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  SAVE $75
                </span>
              </div>
              <h3 className="font-extrabold text-lg text-stone-900">
                Interior Wellness
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Deep sanitization from kitchen baseboards to dryer vents and carpets.
              </p>
              <div className="my-4 pt-3 border-t border-amber-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-stone-900">$275</span>
                  <span className="text-xs text-stone-400 line-through font-semibold">$350</span>
                  <span className="text-xs font-bold text-amber-700">USD</span>
                </div>
              </div>
              <ul className="space-y-1.5 text-xs text-stone-600">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> House Deep Clean (64-Point)
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Hot Water Carpet Steam (3 Rooms)
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Dryer Vent De-Lint & Airflow Check
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectBundle('Interior Wellness', 'house-deep-cleaning', 'deep')}
              className="mt-6 w-full py-2.5 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-500 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Book Bundle</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* All-Season VIP Pass */}
          <div className="rounded-3xl p-6 bg-gradient-to-b from-amber-50 via-white to-orange-50/40 border-2 border-amber-400 shadow-xl shadow-amber-500/15 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-500 text-white rounded-full">
                  MOST POPULAR VIP
                </span>
                <span className="text-[11px] font-black text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full">
                  SAVE $350
                </span>
              </div>
              <h3 className="font-extrabold text-lg text-stone-900">
                All-Season VIP Pass
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Year-round scheduled maintenance across all 10 services with priority dispatch.
              </p>
              <div className="my-4 pt-3 border-t border-amber-200">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-amber-700">$999</span>
                  <span className="text-xs text-stone-400 line-through font-semibold">$1,350</span>
                  <span className="text-xs font-bold text-stone-600">/year</span>
                </div>
              </div>
              <ul className="space-y-1.5 text-xs text-stone-600">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-amber-600" /> Unlimited Priority Snow Dispatch
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-amber-600" /> 2x Annual HVAC Tune-Ups
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-amber-600" /> 2x Gutter Cleanings (Spring/Fall)
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-amber-600" /> 15% Off All Other Services
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectBundle('All-Season VIP', 'hvac-maintenance', 'commercial')}
              className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Join VIP Pass</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BEFORE & AFTER TRANSFORMATION GALLERY (#gallery)
      ========================================================================= */}
      <section id="gallery" className="py-16 bg-gradient-to-b from-transparent via-amber-50/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300/50">
              Interactive Comparisons
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Liquid Transformations: Before & After
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Drag the interactive sliders to inspect verified NorthStar property transformations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Slider 1: Pressure Washing */}
            <div className="space-y-3">
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80"
                afterImage="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
                beforeLabel="MILDEW & STAINS"
                afterLabel="SURFACE SOFT-WASHED"
              />
              <div className="flex items-center justify-between text-xs pt-1">
                <div>
                  <h4 className="font-bold text-stone-900">Concrete Driveway & Walkway Restoration</h4>
                  <p className="text-stone-500">Denver, CO • Surface Wash + Seal</p>
                </div>
                <span className="font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                  $210 USD Total
                </span>
              </div>
            </div>

            {/* Slider 2: Gutter Cleaning */}
            <div className="space-y-3">
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
                afterImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
                beforeLabel="CLOGGED WITH LEAVES"
                afterLabel="FLUSHED & CLEARED"
              />
              <div className="flex items-center justify-between text-xs pt-1">
                <div>
                  <h4 className="font-bold text-stone-900">2-Story Perimeter Gutter Hand-Scoop</h4>
                  <p className="text-stone-500">Minneapolis, MN • 180 Linear Ft</p>
                </div>
                <span className="font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                  $185 USD Total
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CUSTOMER REVIEWS SECTION (#reviews)
      ========================================================================= */}
      <section id="reviews" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-1.5 text-amber-500 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-500" />
              ))}
              <span className="ml-2 font-black text-stone-900 text-lg">4.9 / 5.0</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Verified American Homeowners
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Read transparent feedback from over 2,400 satisfied residential and commercial clients.
            </p>
          </div>

          <button
            onClick={() => setReviewModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-white border border-amber-300 text-amber-800 text-xs font-bold hover:bg-amber-500 hover:text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer w-fit"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Leave a Verified Review</span>
          </button>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeReviews.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-6 bg-white/80 backdrop-blur-xl border border-amber-200/80 shadow-md shadow-amber-500/5 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((st) => (
                      <Star key={st} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium">{rev.date}</span>
                </div>
                <p className="text-xs text-stone-700 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between text-[11px]">
                <div>
                  <span className="font-bold text-stone-900 block">{rev.author}</span>
                  <span className="text-stone-500">{rev.location}</span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SERVICE AREAS & RAPID COVERAGE (#coverage)
      ========================================================================= */}
      <section id="coverage" className="py-16 bg-gradient-to-b from-transparent via-amber-50/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300/50">
              Nationwide Hubs
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Rapid US Response & Regional Service Areas
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Our mobile care fleets operate out of major logistics hubs across all major US metropolitan areas.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { city: 'Denver Metro', state: 'Colorado', eta: '30–45 min dispatch' },
              { city: 'Twin Cities', state: 'Minnesota', eta: '30–45 min dispatch' },
              { city: 'Chicago Metro', state: 'Illinois', eta: '35–50 min dispatch' },
              { city: 'Greater Boston', state: 'Massachusetts', eta: '40 min dispatch' },
              { city: 'Seattle & Puget', state: 'Washington', eta: '35 min dispatch' },
              { city: 'Salt Lake Valley', state: 'Utah', eta: '45 min dispatch' }
            ].map((hub, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/75 backdrop-blur-xl border border-amber-200/80 shadow-xs text-center"
              >
                <MapPin className="w-5 h-5 text-amber-600 mx-auto mb-1.5" />
                <h4 className="font-extrabold text-xs text-stone-900">{hub.city}</h4>
                <p className="text-[10px] text-stone-500">{hub.state}</p>
                <span className="mt-2 inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {hub.eta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CUSTOMER PORTAL & BOOKING TRACKER (#portal)
      ========================================================================= */}
      <section id="portal" className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300/50">
            Self-Service Hub
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Track, Reschedule, or Inspect Your Booking
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Look up your booking by Reference Code (e.g. #NSPC-8491) or customer phone number.
          </p>
        </div>

        <div className="bg-white/85 backdrop-blur-2xl border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-amber-500/10">
          <form onSubmit={handleTrackSearch} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Booking ID (e.g. NSPC-8491) or Phone..."
                value={trackQuery}
                onChange={(e) => setTrackQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-amber-50/50 border border-amber-200 text-stone-900 placeholder-stone-400 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-500/25 transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
            >
              Lookup Booking
            </button>
          </form>

          {trackSearched && (
            <div className="mt-6 pt-6 border-t border-amber-100 animate-in fade-in duration-200">
              {trackedBooking ? (
                <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-amber-200/60">
                    <div>
                      <span className="font-mono font-bold text-xs text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                        #{trackedBooking.id}
                      </span>
                      <h4 className="text-base font-extrabold text-stone-900 mt-1">
                        {trackedBooking.customer.fullName}
                      </h4>
                      <p className="text-xs text-stone-500">{trackedBooking.customer.address}</p>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 w-fit">
                      ● Status: {trackedBooking.status || 'Confirmed'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-stone-500 block">Scheduled Date:</span>
                      <span className="font-bold text-stone-800">{trackedBooking.scheduledDate}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Arrival Window:</span>
                      <span className="font-bold text-stone-800">{trackedBooking.timeWindow}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Total Guaranteed USD:</span>
                      <span className="font-bold text-amber-700">${trackedBooking.totalUSD} USD</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        const newDate = prompt('Enter new service date (YYYY-MM-DD):', '2026-11-25');
                        if (newDate) {
                          rescheduleBooking(trackedBooking.id, newDate);
                          setTrackedBooking({ ...trackedBooking, scheduledDate: newDate });
                          alert('Booking successfully rescheduled.');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-white border border-amber-300 text-stone-800 text-xs font-bold hover:bg-amber-50"
                    >
                      Reschedule Date
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to cancel this booking?')) {
                          cancelBooking(trackedBooking.id);
                          setTrackedBooking({ ...trackedBooking, status: 'Cancelled' });
                        }
                      }}
                      className="px-4 py-2 rounded-xl text-stone-500 hover:text-red-600 text-xs font-semibold"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-stone-500">
                  No active booking found matching "{trackQuery}". Check your reference number or call dispatch.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          24/7 RAPID DISPATCH & HOTLINE CALLBACK (#contact)
      ========================================================================= */}
      <section id="contact" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl shadow-amber-500/25 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-wider">
                Emergency & Same-Day Care
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Need Rapid Weather or Emergency Dispatch?
              </h2>
              <p className="text-xs sm:text-sm text-amber-100 max-w-md leading-relaxed">
                Frozen gutters, blizzard driveway blockages, emergency deep cleaning, or HVAC breakdowns. Our 24/7 priority line connects directly to local supervisors.
              </p>

              <div className="pt-2">
                <a
                  href="tel:18005556787"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-stone-900 font-extrabold text-sm sm:text-base shadow-xl hover:bg-amber-50 transition-all hover:scale-105"
                >
                  <Phone className="w-5 h-5 text-amber-600 animate-bounce" />
                  <span>Call (800) 555-NSTAR</span>
                </a>
              </div>
            </div>

            {/* Quick Callback Card */}
            <div className="bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-2xl text-stone-800 shadow-xl">
              <h3 className="font-extrabold text-base text-stone-900 mb-1">
                Request a 10-Minute Supervisor Callback
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Leave your number and a field supervisor will call you back immediately.
              </p>

              {callSubmitted ? (
                <div className="text-center py-6 text-emerald-700 text-xs font-bold bg-emerald-50 rounded-xl border border-emerald-200">
                  ✓ Callback request received! A supervisor is dialing your number.
                </div>
              ) : (
                <form onSubmit={handleCallSubmit} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={callName}
                    onChange={(e) => setCallName(e.target.value)}
                    className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number (e.g. 303-555-0199)"
                    value={callPhone}
                    onChange={(e) => setCallPhone(e.target.value)}
                    className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <select
                    value={callService}
                    onChange={(e) => setCallService(e.target.value)}
                    className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  >
                    <option value="Emergency Snow / Freeze">Emergency Snow / Freeze</option>
                    <option value="House Deep Cleaning">House Deep Cleaning</option>
                    <option value="Gutter / Roof Clog">Gutter / Roof Clog</option>
                    <option value="HVAC Urgent Service">HVAC Urgent Service</option>
                    <option value="Other Service">Other Property Care Service</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Request Instant Callback
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Review Modal Trigger */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onAddReview={(newRev) => {
          setActiveReviews([
            {
              author: newRev.author,
              rating: newRev.rating,
              date: newRev.date,
              location: newRev.location,
              service: 'Verified Service',
              comment: newRev.comment
            },
            ...activeReviews
          ]);
        }}
      />
    </div>
  );
}
