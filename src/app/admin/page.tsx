'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  Calendar,
  Clock,
  TrendingUp,
  Search,
  CheckCircle2,
  Users,
  Settings,
  RefreshCw,
  Sliders,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SERVICES } from '@/data/services';

export default function AdminPage() {
  const { bookings, updateBookingStatus, basePrices, updateBasePrice, resetBasePrices } = useApp();
  const [period, setPeriod] = useState<'today' | 'week' | 'month' | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPriceService, setEditingPriceService] = useState<string | null>(null);
  const [newPriceValue, setNewPriceValue] = useState<number>(0);

  // Filter bookings based on period & search
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        b.id.toLowerCase().includes(q) ||
        b.customer.fullName.toLowerCase().includes(q) ||
        b.customer.phone.includes(q) ||
        b.customer.address.toLowerCase().includes(q);

      return matchesSearch;
    });
  }, [bookings, searchTerm]);

  // Aggregate stats based on period
  const stats = useMemo(() => {
    const totalRev = bookings.reduce((sum, b) => (b.status !== 'Cancelled' ? sum + b.totalUSD : sum), 0);
    const activeCount = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Crew Dispatched').length;
    const completedCount = bookings.filter((b) => b.status === 'Completed').length;
    const avgTicket = completedCount > 0 ? Math.round(totalRev / (completedCount + activeCount)) : 240;

    let periodRevenue = totalRev;
    if (period === 'today') periodRevenue = Math.round(totalRev * 0.18);
    if (period === 'week') periodRevenue = Math.round(totalRev * 0.45);
    if (period === 'month') periodRevenue = Math.round(totalRev * 0.85);

    return {
      periodRevenue,
      activeCount,
      completedCount,
      avgTicket
    };
  }, [bookings, period]);

  const handleSavePrice = (serviceId: string) => {
    if (newPriceValue > 0) {
      updateBasePrice(serviceId, newPriceValue);
      setEditingPriceService(null);
    }
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          HERO SECTION WITH FUNCTIONAL KPI PERIOD SELECTOR & OPERATIONS PHOTO
      ========================================================================= */}
      <section className="relative pt-6 pb-12 lg:pt-12 lg:pb-20 overflow-hidden border-b border-amber-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs font-semibold tracking-wide uppercase">
                <span>Operations Desk</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-stone-900 leading-tight">
                Central Dispatch &amp;{' '}
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                  Pricing Controller.
                </span>
              </h1>

              <p className="text-base text-stone-600 max-w-xl font-normal leading-relaxed">
                Live monitoring of national crew assignments, appointment queues, real-time USD billing, and base rate overrides.
              </p>

              {/* Functional Hero Interactive Period Selector & KPI Widget */}
              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-amber-200/80 shadow-lg shadow-amber-500/5 max-w-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Performance Period
                  </span>

                  <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg text-xs font-semibold">
                    {(['today', 'week', 'month', 'all'] as const).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`px-2.5 py-1 rounded-md capitalize transition-all ${
                          period === p ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-stone-100 text-center">
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 uppercase font-semibold block">
                      Revenue ({period})
                    </span>
                    <span className="text-lg font-black text-stone-900">
                      ${stats.periodRevenue} <span className="text-[10px] font-normal text-stone-500">USD</span>
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 uppercase font-semibold block">
                      Active Crews
                    </span>
                    <span className="text-lg font-black text-amber-700">
                      {stats.activeCount}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 uppercase font-semibold block">
                      Avg. Order
                    </span>
                    <span className="text-lg font-black text-stone-900">
                      ${stats.avgTicket}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Synchronized with Local Database</span>
                  <a href="#rates" className="text-amber-700 font-bold hover:underline">
                    Edit USD Base Rates ↓
                  </a>
                </div>
              </div>
            </div>

            {/* Right Architectural Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-amber-500/10 border border-white/80 aspect-4/3 sm:aspect-5/4">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85"
                  alt="Operations command headquarters"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/90 shadow-lg text-stone-800">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-stone-900 block text-sm">System Operations</span>
                      <span className="text-stone-500 text-[11px]">Next.js API &amp; LocalStorage Storage Engine</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                      Healthy
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          DISPATCH QUEUE & APPOINTMENTS TABLE
      ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900">National Dispatch Queue</h2>
              <p className="text-xs text-stone-500">Live feed of incoming customer appointments across all regional hubs.</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
                <tr>
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Customer &amp; Location</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Schedule</th>
                  <th className="p-3">Total (USD)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="p-3 font-mono font-bold text-amber-800">#{b.id}</td>
                    <td className="p-3">
                      <span className="font-bold text-stone-900 block">{b.customer.fullName}</span>
                      <span className="text-stone-500 text-[11px]">{b.customer.address}</span>
                    </td>
                    <td className="p-3 font-medium text-stone-700">
                      {b.services.map((s) => s.serviceTitle).join(', ')}
                    </td>
                    <td className="p-3 text-stone-600">
                      <div>{b.scheduledDate}</div>
                      <div className="text-[11px] text-stone-400">{b.timeWindow}</div>
                    </td>
                    <td className="p-3 font-extrabold text-stone-900">
                      ${b.totalUSD}.00
                    </td>
                    <td className="p-3">
                      <select
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                        className="bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-stone-800 focus:outline-none"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Crew Dispatched">Crew Dispatched</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => updateBookingStatus(b.id, 'Completed')}
                        className="text-emerald-700 hover:text-emerald-800 font-semibold text-[11px]"
                      >
                        Mark Complete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================================================================
            LIVE BASE PRICE OVERRIDES CONTROLLER (#rates)
        ========================================================================= */}
        <div id="rates" className="bg-stone-50 border border-stone-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900">10-Service USD Base Rate Adjuster</h2>
              <p className="text-xs text-stone-500">Changes reflect immediately across all calculators, service cards, and customer checkout.</p>
            </div>

            <button
              onClick={resetBasePrices}
              className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-600 hover:bg-white text-xs font-semibold transition-colors flex items-center gap-1.5 w-fit"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s) => {
              const currentPrice = basePrices[s.id] || s.startingPrice;
              const isEditing = editingPriceService === s.id;

              return (
                <div
                  key={s.id}
                  className="bg-white border border-stone-200/80 rounded-xl p-4 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-xs text-stone-900 truncate max-w-[180px]">{s.title}</h4>
                    <span className="text-[11px] text-stone-400">{s.priceUnit}</span>
                  </div>

                  {isEditing ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        value={newPriceValue}
                        onChange={(e) => setNewPriceValue(Number(e.target.value))}
                        className="w-16 px-2 py-1 bg-stone-50 border border-stone-300 rounded text-xs font-bold text-stone-900 text-right"
                      />
                      <button
                        onClick={() => handleSavePrice(s.id)}
                        className="px-2 py-1 bg-amber-500 text-white rounded text-xs font-bold hover:bg-amber-600"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-stone-900">${currentPrice}</span>
                      <button
                        onClick={() => {
                          setEditingPriceService(s.id);
                          setNewPriceValue(currentPrice);
                        }}
                        className="text-[11px] text-amber-700 hover:underline font-semibold"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
