'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCheck,
  ArrowRight,
  MessageCircle,
  Send,
  Mail,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { SERVICES } from '@/data/services';

export default function InteractiveQuickBooker() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'house-deep-cleaning',
    'gutter-cleaning'
  ]);
  const [zip, setZip] = useState('80203');

  const selectedServices = useMemo(
    () => SERVICES.filter((s) => selectedIds.includes(s.id)),
    [selectedIds]
  );

  const total = useMemo(
    () => selectedServices.reduce((acc, s) => acc + s.startingPrice, 0),
    [selectedServices]
  );

  const toggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const bookingText = useMemo(() => {
    const list = selectedServices.map((s) => `• ${s.title} ($${s.startingPrice} USD)`).join('\n');
    return `📋 QUICK BOOKING REQUEST — HOUSE HERO\n\nZIP: ${zip}\n\nSelected Services (${selectedServices.length}):\n${list}\n\nEst. Total: $${total} USD\nZero on-site payment required. Please reply with available arrival windows!`;
  }, [selectedServices, total, zip]);

  const whatsappUrl = `https://wa.me/2349134204578?text=${encodeURIComponent(bookingText)}`;
  const telegramUrl = `https://t.me/househerocare?text=${encodeURIComponent(bookingText)}`;
  const gmailUrl = `mailto:househero.dispatch@gmail.com?subject=${encodeURIComponent(
    `Quick Booking Request (${selectedServices.length} Services)`
  )}&body=${encodeURIComponent(bookingText)}`;

  return (
    <div className="glass-warm p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-depth-lg space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-200/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-xs">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Live Dispatch Builder</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-2">
            Build Your Multi-Service Bundle
          </h3>
          <p className="text-xs text-stone-600 mt-0.5">
            Click any trade pill to add or remove services. Watch live USD rates compute instantly.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-stone-700">ZIP:</label>
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="e.g. 80203"
            className="w-24 bg-white/90 border border-stone-200 rounded-xl px-2.5 py-1.5 text-xs text-stone-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Interactive Service Toggle Pills */}
      <div className="flex flex-wrap gap-2">
        {SERVICES.map((s) => {
          const isSelected = selectedIds.includes(s.id);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => toggle(s.id)}
              className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-500/20 scale-[1.02]'
                  : 'bg-white/80 border-stone-200/90 text-stone-700 hover:border-amber-300 hover:bg-stone-50'
              }`}
            >
              <span>{s.title}</span>
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                }`}
              >
                ${s.startingPrice}
              </span>
              {isSelected && <CheckCheck className="w-3.5 h-3.5 ml-0.5 text-white" />}
            </button>
          );
        })}
      </div>

      {/* Live Computed Pricing & Dispatch Bar */}
      <div className="pt-4 border-t border-amber-200/60 flex flex-col md:flex-row items-center justify-between gap-5 bg-white/60 p-5 rounded-2xl border border-white/80">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-stone-800">
              {selectedServices.length} Services Selected · Zero On-Site Payment Required
            </span>
          </div>
          <div className="flex items-baseline gap-2 justify-center md:justify-start">
            <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Starting Total:</span>
            <span className="text-3xl font-black text-stone-900 font-mono">${total}</span>
            <span className="text-xs font-normal text-stone-500">USD</span>
          </div>
        </div>

        {/* Action Transmission Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 justify-center md:justify-end">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Booking</span>
          </a>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Telegram</span>
          </a>

          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Gmail</span>
          </a>

          <Link
            href="/book"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <span>Full Form</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
