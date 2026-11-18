'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Shield,
  CheckCircle2,
  Send,
  ArrowRight
} from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'House & Deep Cleaning',
    address: '',
    message: ''
  });

  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName || !callbackPhone) return;
    setCallbackSubmitted(true);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          HERO SECTION WITH FUNCTIONAL CALLBACK & DISPATCH CENTER PHOTO
      ========================================================================= */}
      <section className="relative pt-6 pb-12 lg:pt-12 lg:pb-20 overflow-hidden border-b border-amber-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold tracking-wide uppercase">
                <span>Dispatch &amp; Support</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-stone-900 leading-tight">
                24/7 Emergency Dispatch &amp;{' '}
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                  Property Support.
                </span>
              </h1>

              <p className="text-base text-stone-600 max-w-xl font-normal leading-relaxed">
                Connect directly with our central operations desk. Whether you have an urgent blizzard blockage or need a custom commercial property bid.
              </p>

              {/* Functional Hero 10-Minute Callback Widget */}
              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-amber-200/80 shadow-lg shadow-amber-500/5 max-w-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Request 10-Minute Supervisor Callback
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                    Live Desk
                  </span>
                </div>

                {callbackSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold text-center">
                    ✓ Request logged. A regional supervisor is calling {callbackPhone} right now.
                  </div>
                ) : (
                  <form onSubmit={handleCallback} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors whitespace-nowrap"
                    >
                      Call Me Back
                    </button>
                  </form>
                )}

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500">Or dial directly:</span>
                  <a href="tel:18005556782" className="font-bold text-amber-700 hover:text-amber-800">
                    (800) 555-6782 (Toll Free)
                  </a>
                </div>
              </div>
            </div>

            {/* Right Architectural Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-amber-500/10 border border-white/80 aspect-4/3 sm:aspect-5/4">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=85"
                  alt="NorthStar dispatch headquarters"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/90 shadow-lg text-stone-800">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-stone-900 block text-sm">Central Operations</span>
                      <span className="text-stone-500 text-[11px]">Coordinating 50-state fleet dispatch</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                      24/7 Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          INQUIRY FORM & CONTACT DETAILS
      ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6">
            <div>
              <h2 className="text-2xl font-black text-stone-900 tracking-tight">
                Send an Inquiry or RFP
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                For customized commercial bids, multi-property management, or general questions.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-stone-900 text-base">Inquiry Dispatched!</h4>
                <p className="text-xs text-stone-600">
                  Thank you, {formData.name}. A regional customer coordinator will email you within 2 hours with itemized options.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. (303) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Property Service Needed
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
                    >
                      <option>House &amp; Deep Cleaning</option>
                      <option>Carpet Cleaning</option>
                      <option>Gutter Cleaning</option>
                      <option>Snow Removal &amp; De-Icing</option>
                      <option>Pressure Washing</option>
                      <option>HVAC Maintenance</option>
                      <option>Commercial Property Care</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Property Address &amp; ZIP
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1200 Market Street, Denver, CO 80202"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Details or Notes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your property size, specific requests, or urgent timing..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-amber-600 text-white font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="font-bold text-base text-stone-900">Direct Contact Details</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block">Toll-Free Dispatch</span>
                    <a href="tel:18005556782" className="text-stone-600 hover:text-amber-700">
                      (800) 555-6782
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block">Email Operations</span>
                    <a href="mailto:dispatch@northstarpropertycare.us" className="text-stone-600 hover:text-amber-700">
                      dispatch@northstarpropertycare.us
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block">Dispatch Hours</span>
                    <span className="text-stone-600">
                      Standard: Mon–Sat 7:00 AM – 7:00 PM EST<br />
                      Emergency Weather: 24/7 On-Call
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block">National Headquarters</span>
                    <span className="text-stone-600">
                      NorthStar Property Care Inc.<br />
                      1700 Lincoln Street, Suite 3200<br />
                      Denver, CO 80203
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 space-y-2">
              <span className="font-bold block">Need Emergency Snow or De-Icing?</span>
              <p className="leading-relaxed">
                During blizzard events, priority is given to registered seasonal pass holders and hospital / commercial accounts. For on-demand clearing, call directly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
