'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Printer,
  CalendarCheck,
  XCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  FileText
} from 'lucide-react';
import { useApp, Booking } from '@/context/AppContext';

export default function CustomerPortalPage() {
  const { bookings, rescheduleBooking, cancelBooking } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newWindow, setNewWindow] = useState('Morning 8:00 AM – 11:00 AM');
  const [selectedInvoice, setSelectedInvoice] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'active') return b.status === 'Confirmed' || b.status === 'Crew Dispatched';
    if (activeTab === 'completed') return b.status === 'Completed';
    return true;
  });

  const handleSaveReschedule = (id: string) => {
    if (newDate) {
      rescheduleBooking(id, newDate, newWindow);
      setReschedulingId(null);
    }
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Crew Dispatched':
        return 'bg-amber-400/10 text-amber-400 border-amber-400/20 animate-pulse';
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            Self-Service Account Center
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-2">
            Customer Care Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your scheduled dispatches, download itemized USD receipts, and coordinate service dates.
          </p>
        </div>

        <Link
          href="/book"
          className="py-3 px-6 rounded-2xl font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Book New Service</span>
        </Link>
      </div>

      {/* KPI Overview row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs text-slate-400 font-semibold">Total Bookings on File</div>
          <div className="text-3xl font-black text-white mt-1">{bookings.length}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs text-slate-400 font-semibold">Active & Upcoming Dispatches</div>
          <div className="text-3xl font-black text-amber-400 mt-1">
            {bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Crew Dispatched').length}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs text-slate-400 font-semibold">Lifetime Investment (USD)</div>
          <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
            ${bookings.filter((b) => b.status !== 'Cancelled').reduce((sum, b) => sum + b.totalUSD, 0)}.00
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'all', label: `All Bookings (${bookings.length})` },
          { id: 'active', label: 'Active & Dispatched' },
          { id: 'completed', label: 'Completed History' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
            <CalendarCheck className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No dispatches found in this tab</h3>
            <p className="text-xs text-slate-400">Schedule your next property care appointment in 60 seconds.</p>
            <Link
              href="/book"
              className="inline-block py-2.5 px-5 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 mt-2"
            >
              Book Service Now
            </Link>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
                <div className="flex items-center gap-3">
                  <div className="text-xl font-black text-amber-400 font-mono">
                    #{b.id}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${getStatusBadge(
                      b.status
                    )}`}
                  >
                    {b.status}
                  </span>
                </div>

                <div className="text-xs text-slate-400">
                  Booked on: {new Date(b.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Service Details & Price */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div>
                  <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">
                    Services Configured:
                  </div>
                  <div className="space-y-1">
                    {b.services.map((s, idx) => (
                      <div key={idx} className="font-semibold text-white flex justify-between">
                        <span>{s.serviceTitle}</span>
                        <span className="font-mono text-emerald-400">${s.subtotal}</span>
                      </div>
                    ))}
                  </div>
                  {b.discountUSD > 0 && (
                    <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                      Bundle Savings: -${b.discountUSD}.00 USD
                    </div>
                  )}
                  <div className="text-sm font-black text-white pt-2 border-t border-slate-800 mt-2 flex justify-between">
                    <span>Total USD:</span>
                    <span className="font-mono text-emerald-400">${b.totalUSD}.00</span>
                  </div>
                </div>

                <div>
                  <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">
                    Scheduled Dispatch:
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{b.scheduledDate}</span>
                    </div>
                    <div className="text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>{b.timeWindow}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1">
                      Payment: <span className="capitalize text-slate-200">{b.paymentMethod.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">
                    Location & Client:
                  </div>
                  <div className="space-y-0.5 text-slate-300">
                    <div className="font-bold text-white">{b.customer.fullName}</div>
                    <div className="flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>
                        {b.customer.address}, {b.customer.city}, {b.customer.state} {b.customer.zipCode}
                      </span>
                    </div>
                    {b.customer.notes && (
                      <div className="text-[11px] text-slate-400 italic pt-1">
                        Note: "{b.customer.notes}"
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Reschedule Drawer */}
              {reschedulingId === b.id && (
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs animate-in fade-in duration-150">
                  <div className="font-bold text-amber-400">Select New Service Date & Window:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={newDate}
                      min="2026-11-18"
                      onChange={(e) => setNewDate(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                    <select
                      value={newWindow}
                      onChange={(e) => setNewWindow(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="Morning 8:00 AM – 11:00 AM">Morning 8:00 AM – 11:00 AM</option>
                      <option value="Midday 11:00 AM – 2:00 PM">Midday 11:00 AM – 2:00 PM</option>
                      <option value="Afternoon 2:00 PM – 5:00 PM">Afternoon 2:00 PM – 5:00 PM</option>
                      <option value="Priority Weather Dispatch (Sub-Zero)">Priority Weather Dispatch</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setReschedulingId(null)}
                      className="px-3 py-1.5 text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveReschedule(b.id)}
                      className="px-4 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold hover:bg-amber-300"
                    >
                      Confirm Reschedule
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedInvoice(b)}
                    className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-1.5 border border-slate-700"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>View / Print Invoice</span>
                  </button>

                  {b.status !== 'Cancelled' && b.status !== 'Completed' && (
                    <button
                      type="button"
                      onClick={() => {
                        setReschedulingId(b.id);
                        setNewDate(b.scheduledDate);
                      }}
                      className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold flex items-center gap-1.5 border border-slate-700"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                      <span>Reschedule</span>
                    </button>
                  )}
                </div>

                {b.status !== 'Cancelled' && b.status !== 'Completed' && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Are you sure you want to cancel booking #${b.id}?`)) {
                        cancelBooking(b.id);
                      }
                    }}
                    className="py-1.5 px-3 rounded-lg text-red-400 hover:bg-red-950/40 font-semibold"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 text-slate-100">
            <div className="flex justify-between items-start pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                  Official NorthStar Invoice
                </span>
                <h3 className="text-2xl font-black text-white font-mono">
                  #{selectedInvoice.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-slate-500">Billed To:</div>
                <div className="font-bold text-white">{selectedInvoice.customer.fullName}</div>
                <div className="text-slate-400">{selectedInvoice.customer.email}</div>
                <div className="text-slate-400">{selectedInvoice.customer.address}</div>
                <div className="text-slate-400">
                  {selectedInvoice.customer.city}, {selectedInvoice.customer.state} {selectedInvoice.customer.zipCode}
                </div>
              </div>
              <div className="text-right">
                <div className="text-slate-500">Service Date:</div>
                <div className="font-bold text-white">{selectedInvoice.scheduledDate}</div>
                <div className="text-slate-400">{selectedInvoice.timeWindow}</div>
                <div className="text-emerald-400 font-bold mt-1">Status: {selectedInvoice.status}</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              {selectedInvoice.services.map((s, idx) => (
                <div key={idx} className="flex justify-between text-slate-300">
                  <span>{s.serviceTitle}</span>
                  <span className="font-mono text-white">${s.subtotal}.00</span>
                </div>
              ))}
              {selectedInvoice.discountUSD > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold pt-1 border-t border-slate-800">
                  <span>Multi-Service Bundle Discount</span>
                  <span className="font-mono">-${selectedInvoice.discountUSD}.00</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                <span>Total Due / Paid (USD)</span>
                <span className="text-emerald-400 font-mono text-base">
                  ${selectedInvoice.totalUSD}.00
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4 text-slate-300" />
                <span>Print Invoice</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="py-2.5 px-5 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
