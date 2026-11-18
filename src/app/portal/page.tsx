'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Calendar,
  Clock,
  Printer,
  XCircle,
  CheckCircle2,
  Phone,
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function PortalPage() {
  const { bookings, cancelBooking, rescheduleBooking } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = bookings.filter((b) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      b.id.toLowerCase().includes(q) ||
      b.customer.fullName.toLowerCase().includes(q) ||
      b.customer.phone.includes(q) ||
      b.customer.email.toLowerCase().includes(q) ||
      b.customer.address.toLowerCase().includes(q);

    const matchesStatus = filterStatus === 'all' || b.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full">
      {/* =========================================================================
          HERO SECTION WITH FUNCTIONAL LOOKUP & CLIENT DASHBOARD PHOTOGRAPHY
      ========================================================================= */}
      <section className="relative pt-6 pb-12 lg:pt-12 lg:pb-20 overflow-hidden border-b border-amber-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold tracking-wide uppercase">
                <span>Self-Service Portal</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-stone-900 leading-tight">
                Manage, Reschedule &amp;{' '}
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                  Track Your Booking.
                </span>
              </h1>

              <p className="text-base text-stone-600 max-w-xl font-normal leading-relaxed">
                Look up your appointment by Reference ID (e.g. #NSPC-8491) or phone number. Reschedule arrival dates, download itemized USD receipts, or update notes.
              </p>

              {/* Functional Hero Interactive Lookup Form */}
              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-amber-200/80 shadow-lg shadow-amber-500/5 max-w-xl space-y-4">
                <div className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Live Reservation Search
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by Reference Code (NSPC-XXXX), Phone, or Email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-semibold text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['all', 'confirmed', 'dispatched', 'completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                        filterStatus === status
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Found {filtered.length} appointment record(s)</span>
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-amber-700 hover:underline font-bold">
                      Clear Filter
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Architectural Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-amber-500/10 border border-white/80 aspect-4/3 sm:aspect-5/4">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85"
                  alt="Modern homeowner dashboard"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/90 shadow-lg text-stone-800">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-stone-900 block text-sm">Paperless Invoicing</span>
                      <span className="text-stone-500 text-[11px]">Instant printable receipts in exact USD</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                      Synchronized
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          RESERVATIONS LIST & ACTIONS
      ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {filtered.length === 0 ? (
          <div className="bg-white border border-stone-200/80 rounded-2xl p-12 text-center space-y-4 max-w-xl mx-auto shadow-xs">
            <h3 className="font-bold text-lg text-stone-900">No Reservations Found</h3>
            <p className="text-xs text-stone-500">
              No booking matches your search criteria. Check your spelling or book a new appointment.
            </p>
            <Link
              href="/book"
              className="inline-block px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-amber-600 transition-colors"
            >
              Book a Service Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                      #{b.id}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      ● {b.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-stone-900">
                    {b.services.map((s) => s.serviceTitle).join(' + ')}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{b.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{b.timeWindow}</span>
                    </div>
                    <span className="text-stone-400">•</span>
                    <span>{b.customer.address}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-stone-100">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">
                      Total Guaranteed
                    </span>
                    <span className="text-lg font-black text-stone-900">
                      ${b.totalUSD}.00 USD
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50"
                      title="Print Invoice"
                    >
                      <Printer className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        const newDate = prompt('Enter new service date (YYYY-MM-DD):', '2026-11-25');
                        if (newDate) {
                          rescheduleBooking(b.id, newDate);
                          alert('Appointment rescheduled to ' + newDate);
                        }
                      }}
                      className="px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
                    >
                      Reschedule
                    </button>

                    {b.status !== 'Cancelled' && (
                      <button
                        onClick={() => {
                          if (confirm(`Cancel reservation #${b.id}?`)) {
                            cancelBooking(b.id);
                          }
                        }}
                        className="px-3.5 py-2 rounded-xl text-stone-400 hover:text-red-600 text-xs font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
