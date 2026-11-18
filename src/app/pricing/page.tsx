'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Calculator,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle,
  Download,
  ArrowRight,
  ShieldCheck,
  Star,
  Printer,
  FileText
} from 'lucide-react';
import { SERVICES } from '@/data/services';
import { calculateMultiServiceBundle } from '@/data/pricingEngine';
import { useApp } from '@/context/AppContext';
import ServiceCalculator from '@/components/ServiceCalculator';

export default function MasterPricingPage() {
  const router = useRouter();
  const { basePrices, saveQuote, setActiveQuoteServices } = useApp();

  const [selectedItems, setSelectedItems] = useState<{ serviceId: string; config: any }[]>([
    { serviceId: 'house-deep-cleaning', config: { homeSize: '3br', tier: 'standard', oven: false, fridge: false, windows: false, frequency: 'once' } },
    { serviceId: 'carpet-cleaning', config: { rooms: 3, hallways: 1, rugs: 0, petTreatment: false, scotchgard: false } }
  ]);

  const [activeConfigureTab, setActiveConfigureTab] = useState(selectedItems[0].serviceId);
  const [quoteSavedNotice, setQuoteSavedNotice] = useState<string | null>(null);

  const calculation = calculateMultiServiceBundle(selectedItems, basePrices);

  const handleAddService = (serviceId: string) => {
    if (!selectedItems.some((item) => item.serviceId === serviceId)) {
      const updated = [...selectedItems, { serviceId, config: {} }];
      setSelectedItems(updated);
      setActiveConfigureTab(serviceId);
    }
  };

  const handleRemoveService = (serviceId: string) => {
    if (selectedItems.length > 1) {
      const updated = selectedItems.filter((i) => i.serviceId !== serviceId);
      setSelectedItems(updated);
      if (activeConfigureTab === serviceId) {
        setActiveConfigureTab(updated[0].serviceId);
      }
    }
  };

  const handleUpdateConfig = (serviceId: string, newConfig: any) => {
    setSelectedItems((prev) =>
      prev.map((item) => (item.serviceId === serviceId ? { ...item, config: newConfig } : item))
    );
  };

  const handleSaveQuote = () => {
    const itemsToSave = selectedItems.map((item) => {
      const s = SERVICES.find((sv) => sv.id === item.serviceId);
      return {
        serviceId: item.serviceId,
        serviceTitle: s?.title || item.serviceId,
        subtotal: 0,
        config: item.config
      };
    });

    const quote = saveQuote({
      services: itemsToSave,
      subtotalUSD: calculation.combinedSubtotal,
      discountUSD: calculation.bundleDiscountAmount,
      totalUSD: calculation.finalTotal,
      zipCode: 'General US'
    });

    setQuoteSavedNotice(`✓ Quote #${quote.id} saved! Printable summary ready below.`);
    setTimeout(() => setQuoteSavedNotice(null), 4000);
  };

  const handleProceedToBooking = () => {
    setActiveQuoteServices(selectedItems);
    router.push('/book');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Master Interactive Calculator
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Configure Multi-Service Bundle Pricing (USD)
        </h1>
        <p className="text-sm text-slate-300">
          Combine any residential or commercial services together. Enjoy <strong>10% off 2 services</strong>, or <strong>15% off 3 or more services</strong> automatically!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Multi-Service Tabs & Interactive Configurator */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Bundle Service Chips */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Services in Your Working Estimate ({selectedItems.length}):
              </span>
              <span className="text-xs font-semibold text-emerald-400">
                {selectedItems.length >= 3 ? '15% Bundle Discount Applied' : selectedItems.length === 2 ? '10% Bundle Discount Applied' : 'Add 1 more for 10% discount'}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedItems.map((item) => {
                const s = SERVICES.find((sv) => sv.id === item.serviceId);
                const isActive = activeConfigureTab === item.serviceId;
                return (
                  <div
                    key={item.serviceId}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-400/50'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveConfigureTab(item.serviceId)}
                      className="text-left"
                    >
                      {s?.title || item.serviceId}
                    </button>
                    {selectedItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveService(item.serviceId)}
                        className={`p-0.5 rounded hover:bg-slate-900/40 ${
                          isActive ? 'text-slate-950' : 'text-slate-500 hover:text-red-400'
                        }`}
                        title="Remove service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Add Buttons for remaining services */}
            <div className="pt-3 border-t border-slate-800/80">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                Click to add another service to your bundle:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SERVICES.filter((s) => !selectedItems.some((i) => i.serviceId === s.id)).map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleAddService(s.id)}
                    className="py-1 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold border border-slate-700 flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3 text-amber-400" />
                    <span>{s.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Service Configurator */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              Configuring Parameters for:{' '}
              <span className="text-white">
                {SERVICES.find((s) => s.id === activeConfigureTab)?.title}
              </span>
            </div>
            <ServiceCalculator
              key={activeConfigureTab}
              serviceId={activeConfigureTab}
              initialConfig={selectedItems.find((i) => i.serviceId === activeConfigureTab)?.config}
              onConfigChange={(newCfg) => handleUpdateConfig(activeConfigureTab, newCfg)}
              showBookButton={false}
            />
          </div>
        </div>

        {/* Right Column: Live Master Quote Summary Card */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl sticky top-24 space-y-6 text-slate-100">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Itemized USD Receipt
            </span>
            <h3 className="text-xl font-black text-white mt-2">Master Estimate Summary</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Reflects all selected services and bundle discount tiers.
            </p>
          </div>

          {/* Itemized Services Breakdown */}
          <div className="space-y-3 text-xs">
            {calculation.itemizedServices.map((svc) => {
              const info = SERVICES.find((s) => s.id === svc.serviceId);
              return (
                <div key={svc.serviceId} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-1">
                  <div className="flex justify-between font-bold text-white">
                    <span>{info?.title}</span>
                    <span className="font-mono text-emerald-400">${svc.subtotal}.00</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {svc.breakdown.length} configured parameter{svc.breakdown.length > 1 ? 's' : ''}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Totals & Discounts */}
          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Combined Subtotal:</span>
              <span className="font-mono text-white">${calculation.combinedSubtotal}.00 USD</span>
            </div>

            {calculation.bundleDiscountAmount > 0 && (
              <div className="flex justify-between text-emerald-400 font-bold bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/30">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Bundle Savings ({(calculation.bundleDiscountPercentage * 100).toFixed(0)}% OFF):
                </span>
                <span className="font-mono">-${calculation.bundleDiscountAmount}.00 USD</span>
              </div>
            )}

            <div className="flex justify-between items-center text-lg font-black text-white pt-2 border-t border-slate-800">
              <span>Grand Total:</span>
              <span className="text-emerald-400 font-mono text-2xl">
                ${calculation.finalTotal}.00 <span className="text-xs text-slate-400 font-normal">USD</span>
              </span>
            </div>
          </div>

          {quoteSavedNotice && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 font-semibold">
              {quoteSavedNotice}
            </div>
          )}

          {/* CTAs */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={handleProceedToBooking}
              className="w-full py-3.5 rounded-xl font-black text-xs text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Book Bundle with ${calculation.finalTotal} Total</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleSaveQuote}
              className="w-full py-2.5 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Save & Download Quote Summary</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="w-full py-2 rounded-xl text-[11px] text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3 h-3" />
              <span>Print Itemized USD Quote</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 space-y-1">
            <div>✓ Prices guaranteed for 30 calendar days from calculation.</div>
            <div>✓ No credit card required to save and print quotes.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
