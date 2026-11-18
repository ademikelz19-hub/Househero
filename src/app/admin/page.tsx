'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  TrendingUp,
  Users,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Wrench,
  RotateCcw,
  Sparkles,
  Save,
  ShieldCheck,
  Search
} from 'lucide-react';
import { SERVICES } from '@/data/services';
import { useApp } from '@/context/AppContext';

export default function AdminPage() {
  const { bookings, basePrices, updateBasePrice, resetBasePrices, updateBookingStatus } = useApp();

  const [priceInputs, setPriceInputs] = useState<Record<string, number>>(basePrices);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [bookingSearch, setBookingSearch] = useState('');

  // Revenue metrics
  const totalRevenue = bookings
    .filter((b) => b.status === 'Completed' || b.status === 'Confirmed' || b.status === 'Crew Dispatched')
    .reduce((sum, b) => sum + b.totalUSD, 0);

  const completedRevenue = bookings
    .filter((b) => b.status === 'Completed')
    .reduce((sum, b) => sum + b.totalUSD, 0);

  const activeDispatches = bookings.filter((b) => b.status === 'Crew Dispatched').length;

  const handlePriceChange = (serviceId: string, val: number) => {
    setPriceInputs((prev) => ({ ...prev, [serviceId]: val }));
  };

  const handleSavePrice = (serviceId: string) => {
    const newPrice = priceInputs[serviceId];
    if (newPrice && newPrice > 0) {
      updateBasePrice(serviceId, newPrice);
      setSaveSuccess(`✓ Base rate updated for ${serviceId}! New price ($${newPrice} USD) is now live across the website.`);
      setTimeout(() => setSaveSuccess(null), 3500);
    }
  };

  const handleResetAll = () => {
    if (confirm('Reset all 10 service base prices to original defaults?')) {
      resetBasePrices();
      setSaveSuccess('✓ All base rates reset to factory defaults.');
      setTimeout(() => setSaveSuccess(null), 3000);
    }
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.id.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.customer.fullName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.customer.city.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.customer.zipCode.includes(bookingSearch)
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            Operations & Fleet Management Console
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-2">
            Admin Business Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time USD revenue tracking, field crew dispatch manager, and live website price engine.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetAll}
          className="py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 flex items-center gap-1.5 self-start sm:self-auto hover:bg-slate-800"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Default Prices</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-xs text-emerald-300 font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Gross Pipeline (USD)</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">
            ${totalRevenue}.00
          </div>
          <div className="text-[11px] text-emerald-400">All scheduled & active dispatches</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Settled Revenue (USD)</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            ${completedRevenue}.00
          </div>
          <div className="text-[11px] text-slate-400">Paid upon completed sign-off</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Active Field Crews</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">
            {activeDispatches} Dispatched
          </div>
          <div className="text-[11px] text-slate-400">Vans currently en route or on-site</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Total Bookings Handled</span>
            <CalendarCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">
            {bookings.length}
          </div>
          <div className="text-[11px] text-slate-400">Lifetime customer dispatches</div>
        </div>
      </div>

      {/* SECTION 1: LIVE PRICING EDITOR */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Pricing Engine Manager
            </span>
            <h2 className="text-2xl font-black text-white mt-1">
              Live Base Price Editor (USD)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Change any service base USD price below. Updates apply <strong>immediately</strong> across all service pages, the homepage previewer, master calculator, and booking checkout.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((s) => {
            const currentLive = basePrices[s.id] || s.startingPrice;
            const draftVal = priceInputs[s.id] ?? currentLive;
            return (
              <div
                key={s.id}
                className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl flex items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="font-bold text-white">{s.title}</div>
                  <div className="text-[11px] text-slate-400">
                    Live Rate: <strong className="text-emerald-400">${currentLive} USD</strong> ({s.priceUnit})
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative w-24">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                    <input
                      type="number"
                      min={10}
                      max={2000}
                      value={draftVal}
                      onChange={(e) => handlePriceChange(s.id, parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-6 pr-2 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400 font-bold"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSavePrice(s.id)}
                    className="p-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-colors"
                    title="Save & Publish Price Live"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: DISPATCH & BOOKING QUEUE */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Field Operations
            </span>
            <h2 className="text-2xl font-black text-white mt-1">
              Dispatch & Booking Queue
            </h2>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by ID, client, or ZIP..."
              value={bookingSearch}
              onChange={(e) => setBookingSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 placeholder-slate-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-4 font-bold">Booking ID</th>
                <th className="py-3 px-4 font-bold">Client / Location</th>
                <th className="py-3 px-4 font-bold">Services & Items</th>
                <th className="py-3 px-4 font-bold">Date & Window</th>
                <th className="py-3 px-4 font-bold">Total USD</th>
                <th className="py-3 px-4 font-bold text-right">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                    #{b.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{b.customer.fullName}</div>
                    <div className="text-[11px] text-slate-400">
                      {b.customer.city}, {b.customer.state} ({b.customer.zipCode})
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-200">
                      {b.services.map((s) => s.serviceTitle).join(', ')}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    <div className="font-semibold">{b.scheduledDate}</div>
                    <div className="text-[10px] text-slate-500">{b.timeWindow}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-black text-emerald-400 text-sm">
                    ${b.totalUSD}.00
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={b.status}
                      onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                      className={`bg-slate-900 border rounded-lg px-2 py-1 text-xs font-bold focus:outline-none ${
                        b.status === 'Confirmed'
                          ? 'border-blue-500/40 text-blue-400'
                          : b.status === 'Crew Dispatched'
                          ? 'border-amber-400/40 text-amber-400'
                          : b.status === 'Completed'
                          ? 'border-emerald-500/40 text-emerald-400'
                          : 'border-red-500/40 text-red-400'
                      }`}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Crew Dispatched">Crew Dispatched</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
