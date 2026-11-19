'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  CheckCircle2,
  Send,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

const ALL_SERVICES = [
  'House & Deep Cleaning',
  'Carpet Cleaning',
  'Gutter Cleaning',
  'Snow Removal',
  'Pressure Washing & Soft-Wash',
  'Junk Removal & Hauling',
  'Dryer Vent Cleaning',
  'Lawn & Garden Cleanup',
  'HVAC Maintenance & Tune-Up',
  'Driveway & Walkway De-Icing',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    services: [] as string[],
    address: '',
    message: ''
  });

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    setSubmitted(true);
  };

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 animate-slide-up">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          Request a Quote &amp; Dispatch
        </h1>
        <p className="text-sm sm:text-base text-stone-600">
          Tell us about your home care project. We respond promptly with an upfront USD estimate and available arrival windows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact & Booking Form (Liquid Glass) */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-stone-900">Send an Inquiry or Booking Request</h2>
            <p className="text-xs text-stone-500 mt-1">
              Directly routed to our central dispatch email. No obligations or hidden fees.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">Thank You, {formData.name || 'Valued Homeowner'}!</h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Your request has been routed to our dispatch desk. A team supervisor will contact you via email or phone shortly with confirmation.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form
              action="https://formsubmit.co/househero.dispatch@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-4 text-xs sm:text-sm"
            >
              {/* FormSubmit Configurations for Gmail routing */}
              <input type="hidden" name="_subject" value="New Property Care Inquiry - House Hero" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              {/* Hidden input sends comma-separated selected services to formsubmit */}
              <input type="hidden" name="services" value={formData.services.join(', ')} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1.5">
                    Full Name <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. John Miller"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/90 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1.5">
                    Email Address <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/90 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1.5">
                  Phone Number <span className="text-amber-600">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. (303) 555-0182"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/90 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              {/* Multi-service selection chips */}
              <div>
                <label className="block font-semibold text-stone-700 mb-2">
                  Services Needed <span className="text-stone-400 font-normal">(select all that apply)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {ALL_SERVICES.map((service) => {
                    const isSelected = formData.services.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-amber-300 hover:bg-amber-50'
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1.5">
                  Property Address or City / ZIP
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="e.g. 742 Evergreen Terrace, Denver, CO 80201"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white/90 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1.5">
                  Project Details / Special Instructions
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Describe your home size, square footage, specific issue, or preferred service date/time..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/90 border border-stone-200 rounded-xl p-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit to Dispatch Desk</span>
              </button>
            </form>
          )}
        </div>

        {/* Direct Channels & Offices (Liquid Glass Warm) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Chat Channels */}
          <div className="glass-warm p-6 sm:p-7 rounded-3xl space-y-5">
            <h3 className="font-extrabold text-stone-900 text-base">
              Instant Contact Channels
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Prefer direct messaging? Our dispatch team is available via Phone, WhatsApp, and Telegram.
            </p>

            <div className="space-y-3">
              {/* Phone */}
              <a
                href="tel:18005556782"
                className="card-hover flex items-center justify-between p-3.5 rounded-xl bg-white/80 hover:bg-white border border-amber-200/60 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-stone-900">Toll-Free Phone</div>
                    <div className="text-xs text-stone-600">(800) 555-6782</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 transition-colors" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/18005556782"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/80 hover:bg-emerald-50 border border-emerald-200 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-emerald-900">WhatsApp Desk</div>
                    <div className="text-xs text-emerald-700">Chat with Dispatch Directly</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/househerocare"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center justify-between p-3.5 rounded-xl bg-amber-50/80 hover:bg-amber-100/70 border border-amber-200 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-stone-900">Telegram Channel</div>
                    <div className="text-xs text-stone-600">@househerocare</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Email */}
              <a
                href="mailto:dispatch@househero.com"
                className="card-hover flex items-center justify-between p-3.5 rounded-xl bg-white/80 hover:bg-white border border-amber-200/60 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-bold text-stone-900">Email Dispatch</div>
                    <div className="text-xs text-stone-600">dispatch@househero.com</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 transition-colors" />
              </a>
            </div>
          </div>

          {/* Operating Hours & HQ */}
          <div className="glass-card p-6 rounded-3xl space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-stone-900">Support Hours</div>
                <div className="text-stone-600">Monday – Sunday: 7:00 AM – 8:00 PM EST</div>
                <div className="text-stone-500 text-[11px] mt-0.5">24/7 on-call dispatch for severe freeze &amp; storm emergencies</div>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-stone-200/60">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-stone-900">Corporate Dispatch Office</div>
                <div className="text-stone-600">
                  House Hero LLC<br />
                  1201 N Orange St, Suite 700<br />
                  Wilmington, DE 19801
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
