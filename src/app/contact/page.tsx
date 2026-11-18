'use client';

import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Shield, CheckCircle2, Send, AlertTriangle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Connect With Our Dispatch Team
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          24/7 Emergency Dispatch & Inquiries
        </h1>
        <p className="text-sm text-stone-700">
          Whether you need immediate storm plowing, emergency heating assistance, or a commercial quote, our team is ready to respond.
        </p>
      </div>

      {/* Emergency Notice Card */}
      <div className="bg-gradient-to-r from-red-950/70 via-slate-900 to-amber-950/60 border border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center flex-shrink-0 border border-red-500/40">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider">
              24/7 Severe Weather & Freeze Hotline
            </div>
            <h3 className="text-xl font-black text-white">
              Immediate Winter Storm & Heating Dispatch
            </h3>
            <p className="text-xs text-stone-700">
              For active water pipe freezes, sudden furnace breakdowns, or blocked emergency driveways, call direct.
            </p>
          </div>
        </div>

        <a
          href="tel:18005822273"
          className="py-3 px-6 rounded-2xl font-black text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-xl shadow-amber-500/25 flex items-center gap-2 whitespace-nowrap"
        >
          <Phone className="w-4 h-4" />
          <span>Call: (800) 582-CARE</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-xl border border-amber-200/70 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white">Send Dispatch an Inquiry</h3>
            <p className="text-xs text-stone-500 mt-1">
              We respond to all digital inquiries within 15 minutes during standard office hours.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-950/40 border border-emerald-500/30 p-8 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Inquiry Received!</h4>
              <p className="text-xs text-stone-700">
                Thank you, <strong>{formData.name}</strong>. A NorthStar dispatch supervisor has received your request and will call or email you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Adams"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-amber-50/70 border border-amber-200/60 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rachel@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-amber-50/70 border border-amber-200/60 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. (303) 555-0182"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-amber-50/70 border border-amber-200/60 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Service of Interest</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-amber-50/70 border border-amber-200/60 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="General Inquiry">General Property Inquiry</option>
                  <option value="House Deep Cleaning">House & Deep Cleaning</option>
                  <option value="Carpet Cleaning">Carpet Cleaning</option>
                  <option value="Gutter Cleaning">Gutter Cleaning</option>
                  <option value="Snow Removal">Snow Removal & De-Icing</option>
                  <option value="Pressure Washing">Pressure Washing</option>
                  <option value="Junk Removal">Junk Removal</option>
                  <option value="Dryer Vent Cleaning">Dryer Vent Cleaning</option>
                  <option value="Lawn & Garden">Lawn & Garden Cleanup</option>
                  <option value="HVAC Maintenance">HVAC Maintenance</option>
                  <option value="Commercial Maintenance">Commercial Property Contract</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">How Can We Help?</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your property specs, desired timeline, or special requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-amber-50/70 border border-amber-200/60 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Department Info & Offices */}
        <div className="lg:col-span-5 space-y-6 text-xs">
          <div className="bg-white/90 backdrop-blur-xl border border-amber-200/70 rounded-3xl p-6 space-y-4">
            <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
              Direct Contact Channels
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Central Operations Hotline</div>
                  <a href="tel:18005822273" className="text-stone-700 hover:underline">
                    (800) 582-CARE • (800) 582-2273
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">General Dispatch Email</div>
                  <div className="text-stone-700">dispatch@northstarpropertycare.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Customer Support Hours</div>
                  <div className="text-stone-700">Monday – Sunday: 7:00 AM – 8:00 PM EST</div>
                  <div className="text-[11px] text-amber-400 font-semibold mt-0.5">
                    (24/7 On-Call Emergency Crew for Active Freezes & Storms)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xl border border-amber-200/70 rounded-3xl p-6 space-y-3 text-xs">
            <h4 className="font-bold text-white">Corporate Headquarters</h4>
            <p className="text-stone-500 leading-relaxed">
              NorthStar Property Care LLC<br />
              1201 N Orange St, Suite 700<br />
              Wilmington, DE 19801
            </p>
            <div className="text-[11px] text-slate-500 pt-2 border-t border-amber-200/70">
              National Dispatch Control • Regional Hubs in Denver, Minneapolis, Chicago, Milwaukee & Kansas City.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
