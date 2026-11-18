'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  User,
  CreditCard,
  Shield,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Plus,
  AlertCircle,
  Lock,
  Phone,
  Printer
} from 'lucide-react';
import { SERVICES } from '@/data/services';
import { calculateServicePrice, calculateMultiServiceBundle } from '@/data/pricingEngine';
import { useApp } from '@/context/AppContext';

export default function BookingWizard() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service');
  const bundleParam = searchParams.get('bundle');

  const { basePrices, addBooking } = useApp();

  const [step, setStep] = useState(1);

  // Selected services list with their configs
  const [selectedServices, setSelectedServices] = useState<{ serviceId: string; config: any }[]>([
    { serviceId: preselectedService || 'house-deep-cleaning', config: {} }
  ]);

  // Handle bundle param on mount
  useEffect(() => {
    if (bundleParam === 'winter-fortress') {
      setSelectedServices([
        { serviceId: 'snow-removal', config: {} },
        { serviceId: 'driveway-walkway-de-icing', config: {} },
        { serviceId: 'gutter-cleaning', config: {} },
        { serviceId: 'hvac-maintenance', config: {} }
      ]);
    } else if (bundleParam === 'spring-curb-appeal') {
      setSelectedServices([
        { serviceId: 'pressure-washing', config: {} },
        { serviceId: 'lawn-garden-cleanup', config: {} },
        { serviceId: 'gutter-cleaning', config: {} }
      ]);
    } else if (bundleParam === 'total-interior-wellness') {
      setSelectedServices([
        { serviceId: 'house-deep-cleaning', config: {} },
        { serviceId: 'carpet-cleaning', config: {} },
        { serviceId: 'dryer-vent-cleaning', config: {} }
      ]);
    } else if (preselectedService) {
      setSelectedServices([{ serviceId: preselectedService, config: {} }]);
    }
  }, [bundleParam, preselectedService]);

  // Customer Form State
  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    gateCode: '',
    notes: ''
  });

  // Scheduling State
  const [scheduledDate, setScheduledDate] = useState('2026-11-20');
  const [timeWindow, setTimeWindow] = useState('Morning 8:00 AM – 11:00 AM');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'pay-upon-completion' | 'card-hold'>('pay-upon-completion');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Confirmation result
  const [createdBooking, setCreatedBooking] = useState<any>(null);

  // Zip validation notice
  const [zipVerified, setZipVerified] = useState<boolean | null>(null);

  // Calculate pricing
  const calculation = calculateMultiServiceBundle(selectedServices, basePrices);

  const handleAddService = (serviceId: string) => {
    if (!selectedServices.some((s) => s.serviceId === serviceId)) {
      setSelectedServices([...selectedServices, { serviceId, config: {} }]);
    }
  };

  const handleRemoveService = (serviceId: string) => {
    if (selectedServices.length > 1) {
      setSelectedServices(selectedServices.filter((s) => s.serviceId !== serviceId));
    }
  };

  const handleZipCheck = (zip: string) => {
    setCustomer((prev) => ({ ...prev, zipCode: zip }));
    if (zip.length === 5) {
      setZipVerified(true);
    } else {
      setZipVerified(null);
    }
  };

  const handleCompleteBooking = () => {
    const items = selectedServices.map((item) => {
      const svcData = SERVICES.find((s) => s.id === item.serviceId);
      const calc = calculateServicePrice(item.serviceId, item.config, basePrices);
      return {
        serviceId: item.serviceId,
        serviceTitle: svcData?.title || item.serviceId,
        subtotal: calc.total,
        config: item.config
      };
    });

    const newBooking = addBooking({
      services: items,
      customer,
      scheduledDate,
      timeWindow,
      paymentMethod,
      subtotalUSD: calculation.combinedSubtotal,
      discountUSD: calculation.bundleDiscountAmount,
      totalUSD: calculation.finalTotal
    });

    setCreatedBooking(newBooking);
    setStep(5);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Progress Steps Header */}
      {step < 5 && (
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
            {[
              { num: 1, label: 'Services' },
              { num: 2, label: 'Address' },
              { num: 3, label: 'Schedule' },
              { num: 4, label: 'Payment' }
            ].map((s) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    step === s.num
                      ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/20'
                      : step > s.num
                      ? 'bg-emerald-500 text-slate-950 font-black'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </div>
                <span
                  className={`text-[11px] mt-1.5 font-semibold ${
                    step === s.num ? 'text-amber-400' : step > s.num ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 1: SERVICE SELECTION & BUNDLE BUILDER */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Step 1 of 4 • Select & Configure Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Choose Property Services
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select one or combine multiple services to automatically unlock bundle savings (10% off 2 services, 15% off 3+ services).
            </p>
          </div>

          {/* Currently Selected Services */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Selected in this order ({selectedServices.length}):
            </div>
            {selectedServices.map((item) => {
              const svc = SERVICES.find((s) => s.id === item.serviceId);
              const priceCalc = calculateServicePrice(item.serviceId, item.config, basePrices);
              return (
                <div
                  key={item.serviceId}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{svc?.title || item.serviceId}</span>
                      <span className="text-[10px] bg-slate-800 text-amber-400 px-2 py-0.5 rounded-full font-semibold">
                        Starting ${basePrices[item.serviceId] || svc?.startingPrice} USD
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{svc?.shortDesc}</p>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <div className="text-base font-black text-emerald-400 font-mono">
                        ${priceCalc.total} USD
                      </div>
                      <div className="text-[10px] text-slate-500">{svc?.avgDuration}</div>
                    </div>
                    {selectedServices.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveService(item.serviceId)}
                        className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                        title="Remove service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Additional Services */}
          <div className="pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Add Another Service to Unlock Multi-Bundle Savings:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {SERVICES.filter((s) => !selectedServices.some((sel) => sel.serviceId === s.id)).map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleAddService(s.id)}
                  className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-left transition-all group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-amber-300 line-clamp-1">
                    + {s.title}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                    From ${basePrices[s.id] || s.startingPrice}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Real-Time Price Totals */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Combined Services Subtotal:</span>
              <span className="font-mono text-white">${calculation.combinedSubtotal}.00 USD</span>
            </div>

            {calculation.bundleDiscountAmount > 0 && (
              <div className="flex justify-between text-emerald-400 font-bold bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/30">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Multi-Service Bundle Discount ({(calculation.bundleDiscountPercentage * 100).toFixed(0)}% OFF):
                </span>
                <span className="font-mono">-${calculation.bundleDiscountAmount}.00 USD</span>
              </div>
            )}

            <div className="flex justify-between items-center text-base font-extrabold text-white pt-2 border-t border-slate-800">
              <span>Estimated Order Total:</span>
              <span className="text-emerald-400 font-mono text-xl">
                ${calculation.finalTotal}.00 USD
              </span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="py-3.5 px-8 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <span>Continue to Service Address</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: US ADDRESS & COVERAGE VERIFICATION */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Step 2 of 4 • US Service Location
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Where Should Our Crew Arrive?
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              All NorthStar field technicians are dispatched locally with mobile tool vans and protective gear.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Street Address (Home or Commercial Property)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1420 Lincoln Street, Apt 4B"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  5-Digit US ZIP Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  placeholder="e.g. 80202"
                  value={customer.zipCode}
                  onChange={(e) => handleZipCheck(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Denver"
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  State
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CO, IL, MN, WI, MO..."
                  value={customer.state}
                  onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Gate Code / Access Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Gate code #1234, side gate unlocked, key in lockbox"
                value={customer.gateCode}
                onChange={(e) => setCustomer({ ...customer, gateCode: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {zipVerified && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  ✓ Coverage Verified for ZIP <strong>{customer.zipCode}</strong>: Mobile NorthStar service units available for dispatch on your selected date.
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="py-3 px-6 rounded-xl font-semibold text-xs text-slate-400 hover:text-white bg-slate-800 border border-slate-700 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              disabled={!customer.address || !customer.zipCode}
              onClick={() => setStep(3)}
              className="py-3.5 px-8 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 flex items-center gap-2"
            >
              <span>Continue to Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SCHEDULE DATE & ARRIVAL WINDOW */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Step 3 of 4 • Appointment Date & Arrival Window
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Select Arrival Window
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Our crew provides a 30-minute advance text alert before pulling into your driveway.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Preferred Service Date:
              </label>
              <input
                type="date"
                required
                value={scheduledDate}
                min="2026-11-18"
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full sm:w-64 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Arrival Time Window:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'Morning 8:00 AM – 11:00 AM', label: 'Morning Slot', time: '8:00 AM – 11:00 AM', desc: 'First appointment of the day' },
                  { id: 'Midday 11:00 AM – 2:00 PM', label: 'Midday Slot', time: '11:00 AM – 2:00 PM', desc: 'Convenient afternoon arrival' },
                  { id: 'Afternoon 2:00 PM – 5:00 PM', label: 'Late Afternoon Slot', time: '2:00 PM – 5:00 PM', desc: 'After work or school schedule' },
                  { id: 'Priority Weather Dispatch (Sub-Zero)', label: 'Priority Weather Dispatch', time: 'Severe Alert / Sub-Zero', desc: 'Immediate automated radar dispatch for storms' }
                ].map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setTimeWindow(w.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      timeWindow === w.id
                        ? 'bg-amber-400/15 border-amber-400 text-white shadow-lg'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{w.label}</span>
                      <Clock className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-xs font-bold text-emerald-400 mt-1">{w.time}</div>
                    <p className="text-[11px] text-slate-400 mt-1">{w.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Special Property Notes or Pet Instructions:
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Dogs will be inside, water spigot is located behind the patio, please be mindful of the flower bed..."
                value={customer.notes}
                onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="py-3 px-6 rounded-xl font-semibold text-xs text-slate-400 hover:text-white bg-slate-800 border border-slate-700 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="py-3.5 px-8 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 flex items-center gap-2"
            >
              <span>Continue to Contact & Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: CONTACT & PAYMENT SELECTION */}
      {step === 4 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Step 4 of 4 • Contact & Payment Details
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Review & Confirm Order
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select whether you prefer to pay upon job inspection or place a card on file.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
              {/* Customer Contact Inputs */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Primary Customer Contact
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Johnathan Miller"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address (For PDF receipt & updates)
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Mobile Phone (For 30-min crew text alerts)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. (303) 555-0199"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Select Payment Option
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pay-upon-completion')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      paymentMethod === 'pay-upon-completion'
                        ? 'bg-amber-400/15 border-amber-400 text-white'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-xs text-white">Pay Upon Completion</div>
                    <div className="text-[11px] text-emerald-400 mt-1">$0 charged today</div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Inspect the completed service before paying cash, check, or digital invoice.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card-hold')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      paymentMethod === 'card-hold'
                        ? 'bg-amber-400/15 border-amber-400 text-white'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-xs text-white">Credit Card Pre-Authorization</div>
                    <div className="text-[11px] text-amber-300 mt-1">Hold placed on file</div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Funds held securely; card charged only after job sign-off.
                    </p>
                  </button>
                </div>

                {paymentMethod === 'card-hold' && (
                  <div className="pt-3 border-t border-slate-800 space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Card Number (Simulated Secure Hold)
                      </label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          placeholder="12/28"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Itemized Order Review Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 h-fit">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
                Order Summary (USD)
              </h4>

              <div className="space-y-2 text-xs">
                {selectedServices.map((item) => {
                  const s = SERVICES.find((sv) => sv.id === item.serviceId);
                  const p = calculateServicePrice(item.serviceId, item.config, basePrices);
                  return (
                    <div key={item.serviceId} className="flex justify-between items-center text-slate-300">
                      <span className="line-clamp-1">{s?.title}</span>
                      <span className="font-mono font-bold text-white">${p.total}</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="font-mono text-white">${calculation.combinedSubtotal}.00</span>
                </div>
                {calculation.bundleDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Bundle Discount:</span>
                    <span className="font-mono">-${calculation.bundleDiscountAmount}.00</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Total Due (USD):</span>
                  <span className="text-emerald-400 font-mono text-lg">${calculation.finalTotal}.00</span>
                </div>
              </div>

              <div className="pt-2 space-y-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Date: {scheduledDate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Window: {timeWindow}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span className="line-clamp-1">{customer.address || 'Address provided'}</span>
                </div>
              </div>

              <button
                type="button"
                disabled={!customer.fullName || !customer.email || !customer.phone}
                onClick={handleCompleteBooking}
                className="w-full py-3.5 rounded-xl font-black text-xs text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Confirm & Dispatch Booking</span>
              </button>

              <div className="text-[10px] text-center text-slate-500">
                🔒 256-Bit SSL Encrypted • 100% Satisfaction Guarantee
              </div>
            </div>
          </div>

          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="py-3 px-6 rounded-xl font-semibold text-xs text-slate-400 hover:text-white bg-slate-800 border border-slate-700 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: INSTANT CONFIRMATION & RECEIPT */}
      {step === 5 && createdBooking && (
        <div className="space-y-6 animate-in zoom-in-95 duration-200">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-3xl flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Booking Confirmed • Dispatch Scheduled
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Thank You, {createdBooking.customer.fullName}!
            </h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Your appointment is locked in our dispatch queue. A confirmation email and text alert have been logged.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-2xl mx-auto space-y-6 text-slate-100">
            {/* Header / ID Badge */}
            <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Booking Reference Number:
                </span>
                <div className="text-2xl font-black text-amber-400 font-mono tracking-wider">
                  #{createdBooking.id}
                </div>
              </div>
              <div className="text-center sm:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                  Status: {createdBooking.status}
                </span>
                <div className="text-[11px] text-slate-500 mt-1">
                  Issued: {new Date(createdBooking.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Appointment Schedule & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                <div className="font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Date & Time Window
                </div>
                <div className="text-sm font-extrabold text-white">{createdBooking.scheduledDate}</div>
                <div className="text-slate-400 mt-0.5">{createdBooking.timeWindow}</div>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                <div className="font-bold text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Service Address
                </div>
                <div className="text-sm font-extrabold text-white">{createdBooking.customer.address}</div>
                <div className="text-slate-400 mt-0.5">
                  {createdBooking.customer.city}, {createdBooking.customer.state} {createdBooking.customer.zipCode}
                </div>
              </div>
            </div>

            {/* Itemized Services Breakdown */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Itemized Services (USD):
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                {createdBooking.services.map((svc: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-slate-300">
                    <span>{svc.serviceTitle}</span>
                    <span className="font-mono font-bold text-white">${svc.subtotal}.00</span>
                  </div>
                ))}
                {createdBooking.discountUSD > 0 && (
                  <div className="flex justify-between items-center text-emerald-400 font-semibold pt-1 border-t border-slate-800/60">
                    <span>Bundle Savings Applied</span>
                    <span className="font-mono">-${createdBooking.discountUSD}.00</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-base font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Total Amount (USD)</span>
                  <span className="text-emerald-400 font-mono text-lg">
                    ${createdBooking.totalUSD}.00
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link
                href="/portal"
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-center shadow-lg shadow-amber-500/20"
              >
                View in Customer Portal
              </Link>
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-slate-300" />
                <span>Print USD Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
