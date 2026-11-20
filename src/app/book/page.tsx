'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Home,
  Layers,
  Droplets,
  Snowflake,
  Wrench,
  Truck,
  Flame,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  Mail,
  MessageCircle,
  Send,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  ArrowRight,
  FileText,
  CheckCheck,
  Copy,
  Sparkles
} from 'lucide-react';
import { SERVICES } from '@/data/services';

const getServiceIcon = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    Home,
    Sparkles: Home,
    Layers,
    Droplet: Droplets,
    Droplets,
    Snowflake,
    Wrench,
    Truck,
    Flame,
    Leaf,
    ShieldCheck
  };
  return icons[iconName] || Wrench;
};

export default function BookPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([SERVICES[0]?.id || 'house-deep-cleaning']);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
    date: '',
    timeWindow: 'Morning 8:00 AM – 11:00 AM',
    propertyType: 'Single Family Home',
    squareFootage: '1,500 – 2,500 sq ft',
    notes: ''
  });
  const [step, setStep] = useState<'select' | 'details' | 'send'>('select');
  const [copied, setCopied] = useState(false);

  const selectedServices = useMemo(
    () => SERVICES.filter((s) => selectedIds.includes(s.id)),
    [selectedIds]
  );

  const estimatedTotal = useMemo(
    () => selectedServices.reduce((sum, s) => sum + s.startingPrice, 0),
    [selectedServices]
  );

  const toggleService = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedIds(SERVICES.map((s) => s.id));
  };

  const clearAll = () => {
    setSelectedIds([]);
  };

  const composedMessage = useMemo(() => {
    const serviceList =
      selectedServices.length > 0
        ? selectedServices
            .map((s) => `  • ${s.title} (Starting at $${s.startingPrice} USD)`)
            .join('\n')
        : '  • None selected';

    return `📋 HOUSE HERO PROPERTY CARE — BOOKING REQUEST

👤 CLIENT INFORMATION
• Name: ${form.name || 'Not provided'}
• Phone: ${form.phone || 'Not provided'}
• Email: ${form.email || 'Not provided'}
• Property Address: ${form.address || 'Not provided'}${form.zip ? `, ZIP: ${form.zip}` : ''}
• Property Type: ${form.propertyType}
• Approximate Size: ${form.squareFootage}

🛠️ REQUESTED SERVICES (${selectedServices.length})
${serviceList}

📅 SCHEDULING PREFERENCE
• Requested Date: ${form.date || 'Flexible / Next Available'}
• Arrival Window: ${form.timeWindow}

💰 ESTIMATED BASE TOTAL: $${estimatedTotal} USD
(Zero on-site payment required. Final rate confirmed before work commences.)

📝 SPECIAL INSTRUCTIONS / ACCESS:
${form.notes ? form.notes : 'None provided'}

---
Sent via House Hero Automated Dispatch System`;
  }, [form, selectedServices, estimatedTotal]);

  const gmailUrl = useMemo(() => {
    const subject = encodeURIComponent(`Booking Request: ${form.name || 'Client'} (${selectedServices.length} Services)`);
    const body = encodeURIComponent(composedMessage);
    return `mailto:househero.dispatch@gmail.com?subject=${subject}&body=${body}`;
  }, [form.name, selectedServices.length, composedMessage]);

  const whatsappUrl = useMemo(() => {
    const text = encodeURIComponent(composedMessage);
    return `https://wa.me/2349134204578?text=${text}`;
  }, [composedMessage]);

  const telegramUrl = useMemo(() => {
    const text = encodeURIComponent(composedMessage);
    return `https://t.me/househerocare?text=${text}`;
  }, [composedMessage]);

  const handleCopyMessage = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(composedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Hero Header with Nexora Glass Style */}
      <div className="text-center max-w-3xl mx-auto space-y-4 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-900 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Zero On-Site Payment Required · Instant Direct Dispatch</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-[1.1]">
          Book Multiple Services, <br />
          <span className="text-gradient">Dispatch Direct via Message.</span>
        </h1>

        <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Select all the services your home requires. We automatically package your inquiry into a comprehensive dispatch brief ready to send via <strong className="text-stone-800">Gmail</strong>, <strong className="text-emerald-700">WhatsApp</strong>, or <strong className="text-amber-700">Telegram</strong>.
        </p>

        {/* Step Indicator Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 pt-4">
          <button
            type="button"
            onClick={() => setStep('select')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              step === 'select'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white/80 border border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px]">1</span>
            <span>1. Pick Services ({selectedIds.length})</span>
          </button>

          <span className="text-stone-300 font-bold">→</span>

          <button
            type="button"
            onClick={() => {
              if (selectedIds.length > 0) setStep('details');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              step === 'details'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white/80 border border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px]">2</span>
            <span>2. Home Details</span>
          </button>

          <span className="text-stone-300 font-bold">→</span>

          <button
            type="button"
            onClick={() => {
              if (selectedIds.length > 0 && form.name && form.phone) setStep('send');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              step === 'send'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white/80 border border-stone-200 text-stone-600 hover:text-stone-900'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px]">3</span>
            <span>3. Review &amp; Send</span>
          </button>
        </div>
      </div>

      {/* STEP 1: MULTI-SERVICE SELECTION */}
      {step === 'select' && (
        <div className="space-y-6 animate-slide-up">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-stone-200/80">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                Choose All Services Needed
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Click any service card to toggle. You can bundle 2, 3, or all 10 into a single booking visit.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={selectAll}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
              >
                Select All 10
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Grid of All 10 Services with Nexora-inspired Card Hover & Shimmer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {SERVICES.map((svc) => {
              const Icon = getServiceIcon(svc.iconName);
              const isSelected = selectedIds.includes(svc.id);

              return (
                <div
                  key={svc.id}
                  onClick={() => toggleService(svc.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleService(svc.id);
                    }
                  }}
                  className={`card-hover relative overflow-hidden rounded-2xl p-5 cursor-pointer text-left transition-all duration-300 border ${
                    isSelected
                      ? 'bg-amber-50/90 border-amber-500 shadow-depth-md ring-2 ring-amber-500/30'
                      : 'glass-card border-stone-200/80 hover:border-amber-300'
                  }`}
                >
                  {/* Subtle Nexora Shimmer Highlight */}
                  <div className="absolute inset-0 rounded-2xl animate-shimmer pointer-events-none opacity-40" />

                  <div className="relative flex items-start gap-3.5">
                    {/* Real Worker Action Photo Thumbnail + Trade Icon Badge */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-amber-200/70 shadow-xs">
                      <img
                        src={svc.afterImage}
                        alt={svc.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-stone-950/20" />
                      <div className="absolute bottom-1 right-1 w-6 h-6 rounded-md bg-amber-500 text-white flex items-center justify-center shadow-xs">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Service Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                          {svc.category}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-amber-500 border-amber-500 text-white'
                              : 'border-stone-300 bg-white'
                          }`}
                        >
                          {isSelected && <CheckCheck className="w-3.5 h-3.5" />}
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-stone-900 mt-1 truncate">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                        {svc.shortDesc}
                      </p>

                      <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] uppercase text-stone-400">Starting from</span>
                          <div className="text-lg font-black text-stone-900">
                            ${svc.startingPrice}{' '}
                            <span className="text-xs font-normal text-stone-500">USD</span>
                          </div>
                        </div>
                        <span className="text-[11px] text-stone-500 font-medium">
                          {svc.avgDuration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky/Bottom Summary Bar */}
          <div className="glass-warm p-5 sm:p-6 rounded-3xl border border-amber-200/80 shadow-depth-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-sm font-extrabold text-stone-900 flex items-center gap-2 justify-center sm:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{selectedIds.length} Service{selectedIds.length !== 1 ? 's' : ''} Selected</span>
              </div>
              <p className="text-xs text-stone-600 max-w-xl truncate">
                {selectedServices.map((s) => s.title).join(' • ') || 'Please pick at least one service to continue.'}
              </p>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div>
                <div className="text-[10px] uppercase text-stone-500 font-semibold text-right">Est. Starting Total</div>
                <div className="text-2xl font-black text-stone-900 font-mono text-right">
                  ${estimatedTotal} <span className="text-xs font-normal text-stone-500">USD</span>
                </div>
              </div>

              <button
                type="button"
                disabled={selectedIds.length === 0}
                onClick={() => setStep('details')}
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 pulse-ring"
              >
                <span>Continue to Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: CUSTOMER & PROPERTY DETAILS */}
      {step === 'details' && (
        <div className="max-w-3xl mx-auto space-y-6 animate-slide-up">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep('select')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
            >
              ← Back to Service Selection
            </button>
            <span className="text-xs font-bold text-stone-500">
              Step 2 of 3: Home &amp; Contact Details
            </span>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border border-stone-200/80 shadow-depth-lg">
            <div className="border-b border-stone-200/70 pb-4">
              <h2 className="text-xl font-black text-stone-900">
                Where &amp; When Should We Arrive?
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                We use this information to accurately route mobile service vans and build your custom dispatch message.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Full Name <span className="text-amber-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amanda Sterling"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/90 border border-stone-200 rounded-xl pl-9 pr-3.5 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Phone Number <span className="text-amber-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. (303) 555-0192"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-white/90 border border-stone-200 rounded-xl pl-9 pr-3.5 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Email Address <span className="text-amber-600">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. amanda@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/90 border border-stone-200 rounded-xl pl-9 pr-3.5 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Service Area ZIP Code
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. 80203"
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    className="w-full bg-white/90 border border-stone-200 rounded-xl pl-9 pr-3.5 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>
            </div>

            <div className="text-xs sm:text-sm">
              <label className="block font-bold text-stone-700 mb-1.5">
                Street Address (Optional at this stage)
              </label>
              <input
                type="text"
                placeholder="e.g. 1700 Lincoln St, Denver, CO"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full bg-white/90 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-white/90 border border-stone-200 rounded-xl pl-9 pr-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Arrival Time Window
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={form.timeWindow}
                    onChange={(e) => setForm({ ...form, timeWindow: e.target.value })}
                    className="w-full bg-white/90 border border-stone-200 rounded-xl pl-9 pr-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option>Morning 8:00 AM – 11:00 AM</option>
                    <option>Midday 11:00 AM – 2:00 PM</option>
                    <option>Afternoon 2:00 PM – 5:00 PM</option>
                    <option>Evening 5:00 PM – 8:00 PM</option>
                    <option>First Available Emergency Slot</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Property Type
                </label>
                <select
                  value={form.propertyType}
                  onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                  className="w-full bg-white/90 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  <option>Single Family Home</option>
                  <option>Townhouse / Condo</option>
                  <option>Multi-Family / Duplex</option>
                  <option>Commercial / Retail Space</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1.5">
                  Approx. Square Footage
                </label>
                <select
                  value={form.squareFootage}
                  onChange={(e) => setForm({ ...form, squareFootage: e.target.value })}
                  className="w-full bg-white/90 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  <option>Under 1,500 sq ft</option>
                  <option>1,500 – 2,500 sq ft</option>
                  <option>2,500 – 4,000 sq ft</option>
                  <option>Over 4,000 sq ft</option>
                </select>
              </div>
            </div>

            <div className="text-xs sm:text-sm">
              <label className="block font-bold text-stone-700 mb-1.5">
                Special Instructions, Access Codes, or Problem Areas
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Gate code #4821, please watch out for the small dog in the backyard, front gutters overflow by garage..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full bg-white/90 border border-stone-200 rounded-xl p-3.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            {/* Action */}
            <div className="pt-2 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep('select')}
                className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-xs transition-colors"
              >
                Back
              </button>

              <button
                type="button"
                disabled={!form.name || !form.phone || !form.email}
                onClick={() => setStep('send')}
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Proceed to Message Dispatch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: MESSAGE GENERATION & DIRECT SEND (GMAIL, WHATSAPP, TELEGRAM) */}
      {step === 'send' && (
        <div className="max-w-3xl mx-auto space-y-6 animate-slide-up">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep('details')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
            >
              ← Back to Details
            </button>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              ✓ Ready for Dispatch
            </span>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border border-stone-200/80 shadow-depth-lg">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Automated Message Generated
              </span>
              <h2 className="text-2xl font-black text-stone-900 mt-2">
                Choose Where to Send Your Booking
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                No credit card needed on site. Click your preferred messaging platform below to automatically open your pre-formatted booking text and transmit it to our live dispatch desk.
              </p>
            </div>

            {/* THREE PRIMARY SEND CHANNELS (NEXORA-STYLE CARDS) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* 1. Gmail */}
              <a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover glass-warm p-5 rounded-2xl border border-red-200/80 hover:border-red-400 flex flex-col justify-between space-y-4 group transition-all"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm">Send via Gmail</h3>
                    <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                      Opens email client with subject &amp; booking details pre-filled to dispatch desk.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-red-100 flex items-center justify-between text-xs font-bold text-red-700">
                  <span>Open Gmail</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              {/* 2. WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover glass-warm p-5 rounded-2xl border border-emerald-200/80 hover:border-emerald-400 flex flex-col justify-between space-y-4 group transition-all"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm">Send via WhatsApp</h3>
                    <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                      Instant direct chat with dispatch supervisor. Rapid response in under 5 minutes.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>Open WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              {/* 3. Telegram */}
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover glass-warm p-5 rounded-2xl border border-amber-200/80 hover:border-amber-400 flex flex-col justify-between space-y-4 group transition-all"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm">Send via Telegram</h3>
                    <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                      Transmits to our @househerocare verified business channel with arrival tracking.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-amber-700">
                  <span>Open Telegram</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>

            {/* Generated Message Preview Box */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Generated Message Preview:</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
                </button>
              </div>

              <div className="bg-stone-900 text-amber-100/90 rounded-2xl p-4 sm:p-5 font-mono text-xs overflow-x-auto leading-relaxed border border-stone-800 shadow-inner">
                <pre className="whitespace-pre-wrap">{composedMessage}</pre>
              </div>
            </div>

            {/* Phone alternative */}
            <div className="pt-4 border-t border-stone-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-600" />
                <span>Prefer to speak with an agent over the phone?</span>
              </div>
              <a
                href="tel:18005556782"
                className="font-bold text-stone-900 hover:text-amber-600 transition-colors underline"
              >
                Call (800) 555-6782 Toll-Free
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
