'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Check,
  Sparkles,
  Info,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Plus,
  Minus
} from 'lucide-react';
import { calculateServicePrice } from '@/data/pricingEngine';
import { useApp } from '@/context/AppContext';

interface ServiceCalculatorProps {
  serviceId: string;
  initialConfig?: any;
  onConfigChange?: (config: any, calculation: any) => void;
  showBookButton?: boolean;
}

export default function ServiceCalculator({
  serviceId,
  initialConfig,
  onConfigChange,
  showBookButton = true
}: ServiceCalculatorProps) {
  const { basePrices, addServiceToActiveQuote } = useApp();

  // House Cleaning State
  const [houseConfig, setHouseConfig] = useState(
    initialConfig || {
      homeSize: '3br',
      tier: 'standard',
      oven: false,
      fridge: false,
      windows: false,
      frequency: 'once'
    }
  );

  // Carpet Cleaning State
  const [carpetConfig, setCarpetConfig] = useState(
    initialConfig || {
      rooms: 3,
      hallways: 1,
      rugs: 0,
      petTreatment: false,
      scotchgard: false
    }
  );

  // Gutter Cleaning State
  const [gutterConfig, setGutterConfig] = useState(
    initialConfig || {
      stories: '2story',
      downspoutFlush: true,
      minorSealing: false,
      gutterGuards: false
    }
  );

  // Snow Removal State
  const [snowConfig, setSnowConfig] = useState(
    initialConfig || {
      drivewaySize: 'standard',
      snowDepth: '1-6',
      planType: 'per-push'
    }
  );

  // Pressure Washing State
  const [pressureConfig, setPressureConfig] = useState(
    initialConfig || {
      surfaceType: 'driveway',
      squareFeet: 650
    }
  );

  // Junk Removal State
  const [junkConfig, setJunkConfig] = useState(
    initialConfig || {
      volumeTier: '1-4',
      mattressesAppliances: 0,
      eWasteItems: 0
    }
  );

  // Dryer Vent State
  const [dryerConfig, setDryerConfig] = useState(
    initialConfig || {
      exitLocation: 'ground',
      birdGuard: false,
      transitionHose: false
    }
  );

  // Lawn Cleanup State
  const [lawnConfig, setLawnConfig] = useState(
    initialConfig || {
      lotSize: 'medium',
      leafRemoval: true,
      shrubTrimming: false,
      mulchRefresh: false
    }
  );

  // HVAC State
  const [hvacConfig, setHvacConfig] = useState(
    initialConfig || {
      systemType: 'single',
      planType: 'tune-up'
    }
  );

  // De-Icing State
  const [deicingConfig, setDeicingConfig] = useState(
    initialConfig || {
      coverageTier: 'standard',
      material: 'magnesium-chloride',
      autoDispatch: false
    }
  );

  const getCurrentConfig = () => {
    switch (serviceId) {
      case 'house-deep-cleaning': return houseConfig;
      case 'carpet-cleaning': return carpetConfig;
      case 'gutter-cleaning': return gutterConfig;
      case 'snow-removal': return snowConfig;
      case 'pressure-washing': return pressureConfig;
      case 'junk-removal': return junkConfig;
      case 'dryer-vent-cleaning': return dryerConfig;
      case 'lawn-garden-cleanup': return lawnConfig;
      case 'hvac-maintenance': return hvacConfig;
      case 'driveway-walkway-de-icing': return deicingConfig;
      default: return {};
    }
  };

  const currentConfig = getCurrentConfig();
  const calculation = calculateServicePrice(serviceId, currentConfig, basePrices);

  useEffect(() => {
    if (onConfigChange) {
      onConfigChange(currentConfig, calculation);
    }
  }, [currentConfig, serviceId, basePrices]);

  const handleAddToQuoteAndBook = () => {
    addServiceToActiveQuote(serviceId, currentConfig);
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-amber-200/70 rounded-3xl p-6 sm:p-8 shadow-2xl text-stone-900">
      <div className="flex items-center justify-between pb-4 border-b border-amber-200/70 mb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
            Live Interactive USD Pricing Engine
          </span>
          <h3 className="text-xl font-extrabold text-white mt-1">Configure Service Specs</h3>
        </div>
        <div className="text-right">
          <div className="text-xs text-stone-500">Guaranteed Upfront Total:</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            ${calculation.total} <span className="text-xs text-stone-500 font-normal">USD</span>
          </div>
        </div>
      </div>

      {/* SERVICE SPECIFIC CONTROLS */}

      {/* 1. HOUSE & DEEP CLEANING */}
      {serviceId === 'house-deep-cleaning' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              1. Home Size & Layout
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: '1br', label: 'Studio / 1BR', price: basePrices['house-deep-cleaning'] || 120 },
                { id: '2br', label: '2 Bedroom', price: 155 },
                { id: '3br', label: '3 Bedroom', price: 195 },
                { id: '4br', label: '4 Bedroom', price: 240 },
                { id: '5br', label: '5+ Bedroom', price: 295 }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setHouseConfig({ ...houseConfig, homeSize: opt.id })}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    houseConfig.homeSize === opt.id
                      ? 'bg-amber-400/10 border-amber-400 text-white shadow-md'
                      : 'bg-amber-50/70/60 border-amber-200/60 text-stone-500 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                    Base ${opt.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              2. Cleaning Tier
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'standard', label: 'Standard Maintenance', mult: '1.0x', desc: 'Routine sanitizing, vacuum, mop & dusting' },
                { id: 'deep', label: 'Deep Touchpoint Scrub', mult: '1.45x', desc: 'Hand-scrub baseboards, vents, doorframes & grout' },
                { id: 'move', label: 'Move-In / Move-Out', mult: '1.6x', desc: 'Inside empty cabinets, drawers, trim & deposit guarantee' }
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setHouseConfig({ ...houseConfig, tier: tier.id })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    houseConfig.tier === tier.id
                      ? 'bg-amber-400/15 border-amber-400 text-white shadow-md'
                      : 'bg-amber-50/70/60 border-amber-200/60 text-stone-500 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{tier.label}</span>
                    <span className="text-[10px] bg-amber-50/70 text-amber-400 px-1.5 py-0.5 rounded font-mono">
                      {tier.mult}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">{tier.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              3. Specialized Add-Ons
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/70/60 border border-amber-200/60 cursor-pointer hover:border-slate-600">
                <input
                  type="checkbox"
                  checked={houseConfig.oven}
                  onChange={(e) => setHouseConfig({ ...houseConfig, oven: e.target.checked })}
                  className="rounded text-amber-400 focus:ring-0 w-4 h-4 bg-white/90 backdrop-blur-xl border-amber-200/60"
                />
                <div>
                  <div className="text-xs font-bold text-white">Inside Oven Clean</div>
                  <div className="text-[11px] text-emerald-400">+$35 USD</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/70/60 border border-amber-200/60 cursor-pointer hover:border-slate-600">
                <input
                  type="checkbox"
                  checked={houseConfig.fridge}
                  onChange={(e) => setHouseConfig({ ...houseConfig, fridge: e.target.checked })}
                  className="rounded text-amber-400 focus:ring-0 w-4 h-4 bg-white/90 backdrop-blur-xl border-amber-200/60"
                />
                <div>
                  <div className="text-xs font-bold text-white">Inside Fridge Clean</div>
                  <div className="text-[11px] text-emerald-400">+$35 USD</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/70/60 border border-amber-200/60 cursor-pointer hover:border-slate-600">
                <input
                  type="checkbox"
                  checked={houseConfig.windows}
                  onChange={(e) => setHouseConfig({ ...houseConfig, windows: e.target.checked })}
                  className="rounded text-amber-400 focus:ring-0 w-4 h-4 bg-white/90 backdrop-blur-xl border-amber-200/60"
                />
                <div>
                  <div className="text-xs font-bold text-white">Interior Windows (All)</div>
                  <div className="text-[11px] text-emerald-400">+$50 USD</div>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              4. Recurring Frequency Discount
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'once', label: 'One-Time Clean', disc: 'Standard Rate' },
                { id: 'monthly', label: 'Monthly Clean', disc: '10% OFF' },
                { id: 'biweekly', label: 'Bi-Weekly Clean', disc: '15% OFF' },
                { id: 'weekly', label: 'Weekly Clean', disc: '20% OFF' }
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setHouseConfig({ ...houseConfig, frequency: f.id })}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    houseConfig.frequency === f.id
                      ? 'bg-emerald-500/15 border-emerald-500 text-white'
                      : 'bg-amber-50/70/60 border-amber-200/60 text-stone-500 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold">{f.label}</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">{f.disc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. CARPET CLEANING */}
      {serviceId === 'carpet-cleaning' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-amber-50/70/60 border border-amber-200/60 p-4 rounded-2xl">
              <label className="block text-xs font-bold text-stone-700 mb-1">Rooms to Clean ($45/ea)</label>
              <div className="text-[11px] text-slate-500 mb-2">3-room minimum base: ${basePrices['carpet-cleaning'] || 129}</div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCarpetConfig({ ...carpetConfig, rooms: Math.max(1, carpetConfig.rooms - 1) })}
                  className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white hover:bg-slate-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-black text-amber-400 w-8 text-center">{carpetConfig.rooms}</span>
                <button
                  type="button"
                  onClick={() => setCarpetConfig({ ...carpetConfig, rooms: carpetConfig.rooms + 1 })}
                  className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white hover:bg-slate-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-amber-50/70/60 border border-amber-200/60 p-4 rounded-2xl">
              <label className="block text-xs font-bold text-stone-700 mb-1">Hallways / Stairs ($35/ea)</label>
              <div className="text-[11px] text-slate-500 mb-2">Flight of stairs or hallway</div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCarpetConfig({ ...carpetConfig, hallways: Math.max(0, carpetConfig.hallways - 1) })}
                  className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white hover:bg-slate-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-black text-amber-400 w-8 text-center">{carpetConfig.hallways}</span>
                <button
                  type="button"
                  onClick={() => setCarpetConfig({ ...carpetConfig, hallways: carpetConfig.hallways + 1 })}
                  className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white hover:bg-slate-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-amber-50/70/60 border border-amber-200/60 p-4 rounded-2xl">
              <label className="block text-xs font-bold text-stone-700 mb-1">Area Rugs ($25/ea)</label>
              <div className="text-[11px] text-slate-500 mb-2">Delicate wool/synthetic rugs</div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCarpetConfig({ ...carpetConfig, rugs: Math.max(0, carpetConfig.rugs - 1) })}
                  className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white hover:bg-slate-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-black text-amber-400 w-8 text-center">{carpetConfig.rugs}</span>
                <button
                  type="button"
                  onClick={() => setCarpetConfig({ ...carpetConfig, rugs: carpetConfig.rugs + 1 })}
                  className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white hover:bg-slate-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Advanced Treatment Add-Ons
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-50/70/60 border border-amber-200/60 cursor-pointer hover:border-slate-600">
                <input
                  type="checkbox"
                  checked={carpetConfig.petTreatment}
                  onChange={(e) => setCarpetConfig({ ...carpetConfig, petTreatment: e.target.checked })}
                  className="rounded text-amber-400 focus:ring-0 w-4 h-4 bg-white/90 backdrop-blur-xl border-amber-200/60"
                />
                <div>
                  <div className="text-xs font-bold text-white">Pet Odor & Sub-Surface Enzyme Treatment</div>
                  <div className="text-[11px] text-emerald-400">+$30 / room (${carpetConfig.rooms * 30} USD)</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-50/70/60 border border-amber-200/60 cursor-pointer hover:border-slate-600">
                <input
                  type="checkbox"
                  checked={carpetConfig.scotchgard}
                  onChange={(e) => setCarpetConfig({ ...carpetConfig, scotchgard: e.target.checked })}
                  className="rounded text-amber-400 focus:ring-0 w-4 h-4 bg-white/90 backdrop-blur-xl border-amber-200/60"
                />
                <div>
                  <div className="text-xs font-bold text-white">Scotchgard™ Stain & Spill Fiber Protector</div>
                  <div className="text-[11px] text-emerald-400">+$25 / room (${carpetConfig.rooms * 25} USD)</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* 3. GUTTER CLEANING */}
      {serviceId === 'gutter-cleaning' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Building Height & Footprint
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: '1story', label: '1-Story Home', footage: 'Up to 150 linear ft', price: basePrices['gutter-cleaning'] || 135 },
                { id: '2story', label: '2-Story Home', footage: 'Up to 200 linear ft', price: 185 },
                { id: '3story', label: '3-Story / Steep Roof', footage: 'Complex rooflines', price: 250 }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setGutterConfig({ ...gutterConfig, stories: opt.id })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    gutterConfig.stories === opt.id
                      ? 'bg-amber-400/15 border-amber-400 text-white'
                      : 'bg-amber-50/70/60 border-amber-200/60 text-stone-500 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{opt.label}</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">{opt.footage}</div>
                  <div className="text-xs font-bold text-emerald-400 mt-2">${opt.price} USD</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Additional Gutter Maintenance
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/70/60 border border-amber-200/60 cursor-pointer hover:border-slate-600">
                <input
                  type="checkbox"
                  checked={gutterConfig.downspoutFlush}
                  onChange={(e) => setGutterConfig({ ...gutterConfig, downspoutFlush: e.target.checked })}
                  className="rounded text-amber-400 focus:ring-0 w-4 h-4 bg-white/90 backdrop-blur-xl border-amber-200/60"
                />
                <div>
                  <div className="text-xs font-bold text-white">Downspout Flush & Jet</div>
                  <div className="text-[11px] text-emerald-400">+$35 USD</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/70/60 border border-amber-200/60 cursor-pointer hover:border-slate-600">
                <input
                  type="checkbox"
                  checked={gutterConfig.minorSealing}
                  onChange={(e) => setGutterConfig({ ...gutterConfig, minorSealing: e.target.checked })}
                  className="rounded text-amber-400 focus:ring-0 w-4 h-4 bg-white/90 backdrop-blur-xl border-amber-200/60"
                />
                <div>
                  <div className="text-xs font-bold text-white">Minor Sealing & Re-Hanging</div>
                  <div className="text-[11px] text-emerald-400">+$45 USD</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/70/60 border border-amber-200/60 cursor-pointer hover:border-slate-600">
                <input
                  type="checkbox"
                  checked={gutterConfig.gutterGuards}
                  onChange={(e) => setGutterConfig({ ...gutterConfig, gutterGuards: e.target.checked })}
                  className="rounded text-amber-400 focus:ring-0 w-4 h-4 bg-white/90 backdrop-blur-xl border-amber-200/60"
                />
                <div>
                  <div className="text-xs font-bold text-white">Gutter Guard Quote Option</div>
                  <div className="text-[11px] text-emerald-400">+$120 USD</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* 4. SNOW REMOVAL */}
      {serviceId === 'snow-removal' && (
        <div className="space-y-6">
          <div className="flex bg-amber-50/70 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setSnowConfig({ ...snowConfig, planType: 'per-push' })}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                snowConfig.planType === 'per-push' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-stone-500 hover:text-white'
              }`}
            >
              On-Demand (Per Push)
            </button>
            <button
              type="button"
              onClick={() => setSnowConfig({ ...snowConfig, planType: 'seasonal-pass' })}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                snowConfig.planType === 'seasonal-pass' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-stone-500 hover:text-white'
              }`}
            >
              Unlimited Seasonal Pass ($499/season)
            </button>
          </div>

          {snowConfig.planType === 'seasonal-pass' ? (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300">
              ✓ <strong>Priority Unlimited Pass Active:</strong> Covers automatic 2-inch plow dispatch for every snowfall from November 15 through April 15, zero surge fees, guaranteed 7:00 AM commute clearance.
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Driveway Size
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'standard', label: 'Standard 2-Car Driveway', price: basePrices['snow-removal'] || 65 },
                    { id: 'large', label: 'Large 4-Car Driveway', price: 95 },
                    { id: 'commercial', label: 'Long / Commercial Driveway', price: 140 }
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSnowConfig({ ...snowConfig, drivewaySize: d.id })}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        snowConfig.drivewaySize === d.id
                          ? 'bg-amber-400/15 border-amber-400 text-white'
                          : 'bg-amber-50/70/60 border-amber-200/60 text-stone-500 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{d.label}</div>
                      <div className="text-xs font-bold text-emerald-400 mt-2">${d.price} USD / push</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Snowfall Depth Surcharge
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '1-6', label: '1 – 6" Snow', fee: 'Included ($0)' },
                    { id: '6-12', label: '6 – 12" Heavy', fee: '+$25 USD' },
                    { id: '12plus', label: '12"+ Blizzard', fee: '+$55 USD' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSnowConfig({ ...snowConfig, snowDepth: s.id })}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        snowConfig.snowDepth === s.id
                          ? 'bg-amber-400/15 border-amber-400 text-white'
                          : 'bg-amber-50/70/60 border-amber-200/60 text-stone-500 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{s.label}</div>
                      <div className="text-[10px] text-emerald-400 font-semibold">{s.fee}</div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* 5. PRESSURE WASHING */}
      {serviceId === 'pressure-washing' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Select Surface to Wash
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'driveway', label: 'Concrete Driveway', rate: '$0.25/sq ft', min: 140 },
                { id: 'siding', label: 'House Siding Soft-Wash', rate: '$0.30/sq ft', min: 195 },
                { id: 'deck', label: 'Wood/Composite Deck', rate: '$0.45/sq ft', min: 160 },
                { id: 'patio', label: 'Patio & Walkways', rate: '$0.28/sq ft', min: 120 }
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setPressureConfig({ ...pressureConfig, surfaceType: s.id })}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    pressureConfig.surfaceType === s.id
                      ? 'bg-amber-400/15 border-amber-400 text-white'
                      : 'bg-amber-50/70/60 border-amber-200/60 text-stone-500 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold">{s.label}</div>
                  <div className="text-[10px] text-emerald-400 mt-1">{s.rate} (min ${s.min})</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Estimated Square Footage:
              </label>
              <span className="text-sm font-black text-amber-400">
                {pressureConfig.squareFeet} sq ft
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="3500"
              step="50"
              value={pressureConfig.squareFeet}
              onChange={(e) => setPressureConfig({ ...pressureConfig, squareFeet: parseInt(e.target.value) })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>200 sq ft (Walkway)</span>
              <span>800 sq ft (2-Car Driveway)</span>
              <span>2,000 sq ft (Full House Wash)</span>
              <span>3,500+ sq ft</span>
            </div>
          </div>
        </div>
      )}

      {/* 6. JUNK REMOVAL */}
      {serviceId === 'junk-removal' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Truck Load Volume Tier (16-Yard Bed)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'single', label: 'Single Curbside Item', price: basePrices['junk-removal'] || 89 },
                { id: '1-8', label: '1/8 Truck Bed', price: 149 },
                { id: '1-4', label: '1/4 Truck Bed', price: 239 },
                { id: '1-2', label: '1/2 Truck Bed (Popular)', price: 379 },
                { id: '3-4', label: '3/4 Truck Bed', price: 499 },
                { id: 'full', label: 'Full 16-Yard Truck', price: 629 }
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setJunkConfig({ ...junkConfig, volumeTier: tier.id })}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    junkConfig.volumeTier === tier.id
                      ? 'bg-amber-400/15 border-amber-400 text-white'
                      : 'bg-amber-50/70/60 border-amber-200/60 text-stone-500 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold">{tier.label}</div>
                  <div className="text-xs font-bold text-emerald-400 mt-1">${tier.price} USD</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-amber-50/70/60 border border-amber-200/60 p-4 rounded-2xl">
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Appliances / Mattresses (+$35/ea)
              </label>
              <div className="text-[11px] text-slate-500 mb-2">Requires certified eco-recycling fee</div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setJunkConfig({ ...junkConfig, mattressesAppliances: Math.max(0, junkConfig.mattressesAppliances - 1) })}
                  className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white hover:bg-slate-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-black text-amber-400 w-8 text-center">{junkConfig.mattressesAppliances}</span>
                <button
                  type="button"
                  onClick={() => setJunkConfig({ ...junkConfig, mattressesAppliances: junkConfig.mattressesAppliances + 1 })}
                  className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white hover:bg-slate-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-amber-50/70/60 border border-amber-200/60 p-4 rounded-2xl">
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Specialty E-Waste Items (+$25/ea)
              </label>
              <div className="text-[11px] text-slate-500 mb-2">Monitors, old TVs, batteries</div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setJunkConfig({ ...junkConfig, eWasteItems: Math.max(0, junkConfig.eWasteItems - 1) })}
                  className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white hover:bg-slate-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-black text-amber-400 w-8 text-center">{junkConfig.eWasteItems}</span>
                <button
                  type="button"
                  onClick={() => setJunkConfig({ ...junkConfig, eWasteItems: junkConfig.eWasteItems + 1 })}
                  className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white hover:bg-slate-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. DRYER VENT CLEANING */}
      {serviceId === 'dryer-vent-cleaning' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Exterior Vent Exhaust Location
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'ground', label: 'Ground-Level Exterior Wall', desc: 'Standard ground exhaust', price: basePrices['dryer-vent-cleaning'] || 119 },
                { id: 'second-story', label: 'Second-Story Exterior Wall', desc: 'Ladder extension access', price: 149 },
                { id: 'rooftop', label: 'Rooftop Flue Exhaust', desc: 'Roofline crawl & harness', price: 179 }
              ].map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setDryerConfig({ ...dryerConfig, exitLocation: loc.id })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    dryerConfig.exitLocation === loc.id
                      ? 'bg-amber-400/15 border-amber-400 text-white'
                      : 'bg-amber-50/70/60 border-amber-200/60 text-stone-500 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{loc.label}</div>
                  <div className="text-[11px] text-stone-500 mt-1">{loc.desc}</div>
                  <div className="text-xs font-bold text-emerald-400 mt-2">${loc.price} USD</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Safety Hardware Replacements
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-50/70/60 border border-amber-200/60 cursor-pointer hover:border-slate-600">
                <input
                  type="checkbox"
                  checked={dryerConfig.birdGuard}
                  onChange={(e) => setDryerConfig({ ...dryerConfig, birdGuard: e.target.checked })}
                  className="rounded text-amber-400 focus:ring-0 w-4 h-4 bg-white/90 backdrop-blur-xl border-amber-200/60"
                />
                <div>
                  <div className="text-xs font-bold text-white">Heavy-Duty Steel Bird Guard Cage</div>
                  <div className="text-[11px] text-emerald-400">+$40 USD (Prevents animal nests)</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-50/70/60 border border-amber-200/60 cursor-pointer hover:border-slate-600">
                <input
                  type="checkbox"
                  checked={dryerConfig.transitionHose}
                  onChange={(e) => setDryerConfig({ ...dryerConfig, transitionHose: e.target.checked })}
                  className="rounded text-amber-400 focus:ring-0 w-4 h-4 bg-white/90 backdrop-blur-xl border-amber-200/60"
                />
                <div>
                  <div className="text-xs font-bold text-white">Semi-Rigid Metal Transition Hose Replace</div>
                  <div className="text-[11px] text-emerald-400">+$35 USD (Fire-safe upgrade)</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* 8. LAWN & GARDEN CLEANUP */}
      {serviceId === 'lawn-garden-cleanup' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Property Lot Size Tier
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'small', label: 'Small Lot', size: '<5,000 sq ft', price: basePrices['lawn-garden-cleanup'] || 130 },
                { id: 'medium', label: 'Medium Lot', size: '5k – 10k sq ft', price: 195 },
                { id: 'large', label: 'Large Lot', size: '10k – 20k sq ft', price: 285 },
                { id: 'acreage', label: 'Estate / Acreage', size: '20,000+ sq ft', price: 395 }
              ].map((lot) => (
                <button
                  key={lot.id}
                  type="button"
                  onClick={() => setLawnConfig({ ...lawnConfig, lotSize: lot.id })}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    lawnConfig.lotSize === lot.id
                      ? 'bg-amber-400/15 border-amber-400 text-white'
                      : 'bg-amber-50/70/60 border-amber-200/60 text-stone-500 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold">{lot.label}</div>
                  <div className="text-[10px] text-stone-500">{lot.size}</div>
                  <div className="text-xs font-bold text-emerald-400 mt-1">${lot.price} USD</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Grounds Maintenance Add-Ons
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/70/60 border border-amber-200/60 cursor-pointer hover:border-slate-600">
                <input
                  type="checkbox"
                  checked={lawnConfig.leafRemoval}
                  onChange={(e) => setLawnConfig({ ...lawnConfig, leafRemoval: e.target.checked })}
                  className="rounded text-amber-400 focus:ring-0 w-4 h-4 bg-white/90 backdrop-blur-xl border-amber-200/60"
                />
                <div>
                  <div className="text-xs font-bold text-white">Leaf Bagging & Rake</div>
                  <div className="text-[11px] text-emerald-400">+$55 USD</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/70/60 border border-amber-200/60 cursor-pointer hover:border-slate-600">
                <input
                  type="checkbox"
                  checked={lawnConfig.shrubTrimming}
                  onChange={(e) => setLawnConfig({ ...lawnConfig, shrubTrimming: e.target.checked })}
                  className="rounded text-amber-400 focus:ring-0 w-4 h-4 bg-white/90 backdrop-blur-xl border-amber-200/60"
                />
                <div>
                  <div className="text-xs font-bold text-white">Hedge & Shrub Shaping</div>
                  <div className="text-[11px] text-emerald-400">+$65 USD</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/70/60 border border-amber-200/60 cursor-pointer hover:border-slate-600">
                <input
                  type="checkbox"
                  checked={lawnConfig.mulchRefresh}
                  onChange={(e) => setLawnConfig({ ...lawnConfig, mulchRefresh: e.target.checked })}
                  className="rounded text-amber-400 focus:ring-0 w-4 h-4 bg-white/90 backdrop-blur-xl border-amber-200/60"
                />
                <div>
                  <div className="text-xs font-bold text-white">Mulch Bed Spade Edging</div>
                  <div className="text-[11px] text-emerald-400">+$85 USD</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* 9. HVAC MAINTENANCE */}
      {serviceId === 'hvac-maintenance' && (
        <div className="space-y-6">
          <div className="flex bg-amber-50/70 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setHvacConfig({ ...hvacConfig, planType: 'tune-up' })}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                hvacConfig.planType === 'tune-up' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-stone-500 hover:text-white'
              }`}
            >
              One-Time 21-Point Tune-Up
            </button>
            <button
              type="button"
              onClick={() => setHvacConfig({ ...hvacConfig, planType: 'comfort-shield' })}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                hvacConfig.planType === 'comfort-shield' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-stone-500 hover:text-white'
              }`}
            >
              Annual Comfort Shield Plan ($229/yr)
            </button>
          </div>

          {hvacConfig.planType === 'comfort-shield' ? (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300">
              ✓ <strong>Comfort Shield Plan Enrolled:</strong> Includes 2 full seasonal tune-ups (Spring AC and Fall Furnace), 15% discount on all replacement parts and repairs, zero overtime emergency fees during cold snaps and heatwaves.
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                HVAC Equipment Configuration
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'single', label: 'Single Zone AC or Furnace', desc: '1 Condenser or 1 Heating Unit', price: basePrices['hvac-maintenance'] || 115 },
                  { id: 'dual', label: 'Full Dual Heating & AC System', desc: 'Both Heating & Cooling Units', price: 169 },
                  { id: 'additional', label: 'Dual System + Extra Zone / Split', desc: 'Multi-zone damper or mini-split', price: 244 }
                ].map((sys) => (
                  <button
                    key={sys.id}
                    type="button"
                    onClick={() => setHvacConfig({ ...hvacConfig, systemType: sys.id })}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      hvacConfig.systemType === sys.id
                        ? 'bg-amber-400/15 border-amber-400 text-white'
                        : 'bg-amber-50/70/60 border-amber-200/60 text-stone-500 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{sys.label}</div>
                    <div className="text-[11px] text-stone-500 mt-1">{sys.desc}</div>
                    <div className="text-xs font-bold text-emerald-400 mt-2">${sys.price} USD</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 10. DRIVEWAY & WALKWAY DE-ICING */}
      {serviceId === 'driveway-walkway-de-icing' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Surface Area Coverage
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'standard', label: 'Standard Driveway + Walkway', desc: 'Front door to garage', price: basePrices['driveway-walkway-de-icing'] || 55 },
                { id: 'large', label: 'Large Driveway + City Sidewalks', desc: 'Sidewalk corridor & porch', price: 85 },
                { id: 'commercial', label: 'Commercial / Corner Lot Corridor', desc: 'Full wraparound sidewalks', price: 130 }
              ].map((cov) => (
                <button
                  key={cov.id}
                  type="button"
                  onClick={() => setDeicingConfig({ ...deicingConfig, coverageTier: cov.id })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    deicingConfig.coverageTier === cov.id
                      ? 'bg-amber-400/15 border-amber-400 text-white'
                      : 'bg-amber-50/70/60 border-amber-200/60 text-stone-500 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{cov.label}</div>
                  <div className="text-[11px] text-stone-500 mt-1">{cov.desc}</div>
                  <div className="text-xs font-bold text-emerald-400 mt-2">${cov.price} USD / visit</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Melting Agent Selection
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setDeicingConfig({ ...deicingConfig, material: 'rock-salt' })}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all ${
                    deicingConfig.material === 'rock-salt'
                      ? 'bg-amber-400/15 border-amber-400 text-white'
                      : 'bg-amber-50/70/60 border-amber-200/60 text-stone-500 hover:text-white'
                  }`}
                >
                  <span className="font-bold text-white">Standard Sodium Rock Salt</span>
                  <span className="block text-[10px] text-stone-500">Included ($0) • Active to 15°F</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeicingConfig({ ...deicingConfig, material: 'magnesium-chloride' })}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all ${
                    deicingConfig.material === 'magnesium-chloride'
                      ? 'bg-amber-400/15 border-amber-400 text-white'
                      : 'bg-amber-50/70/60 border-amber-200/60 text-stone-500 hover:text-white'
                  }`}
                >
                  <span className="font-bold text-emerald-400">Pet-Safe & Concrete-Safe Magnesium (+ $20)</span>
                  <span className="block text-[10px] text-stone-700">Melt active to -15°F • Non-pitting on concrete</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Automated Freeze Dispatch
              </label>
              <label className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/70/60 border border-amber-200/60 cursor-pointer hover:border-slate-600 h-[calc(100%-24px)]">
                <input
                  type="checkbox"
                  checked={deicingConfig.autoDispatch}
                  onChange={(e) => setDeicingConfig({ ...deicingConfig, autoDispatch: e.target.checked })}
                  className="rounded text-amber-400 focus:ring-0 w-4 h-4 bg-white/90 backdrop-blur-xl border-amber-200/60 mt-0.5"
                />
                <div>
                  <div className="text-xs font-bold text-white">Sub-32°F Automatic Doppler Dispatch</div>
                  <div className="text-[11px] text-emerald-400 font-semibold">+$15 USD reserve monitoring</div>
                  <p className="text-[10px] text-stone-500 mt-1">
                    Crews automatically salt your driveway before morning freeze events.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* ITEMIZED USD SUMMARY & CTA */}
      <div className="mt-8 pt-6 border-t border-amber-200/70 space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
          Itemized Price Breakdown (USD):
        </div>
        <div className="space-y-1.5 bg-amber-50/70/60 p-4 rounded-2xl border border-amber-200/70 text-xs">
          {calculation.breakdown.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-stone-700">
              <span>{item.item}</span>
              <span className="font-mono font-semibold text-white">${item.price}</span>
            </div>
          ))}

          {calculation.discount > 0 && (
            <div className="flex justify-between items-center text-emerald-400 font-semibold pt-1 border-t border-amber-200/70/60">
              <span>Frequency Discount Applied</span>
              <span className="font-mono">-${calculation.discount}</span>
            </div>
          )}

          <div className="flex justify-between items-center text-sm font-extrabold text-white pt-2 border-t border-amber-200/70">
            <span>Guaranteed Total (USD)</span>
            <span className="text-emerald-400 font-mono text-base sm:text-lg">
              ${calculation.total}.00
            </span>
          </div>
        </div>

        {showBookButton && (
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href={`/book?service=${serviceId}`}
              onClick={handleAddToQuoteAndBook}
              className="flex-1 py-3.5 px-6 rounded-2xl font-black text-xs text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-center shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book This Service (${calculation.total} USD)</span>
            </Link>

            <Link
              href="/pricing"
              onClick={handleAddToQuoteAndBook}
              className="py-3.5 px-6 rounded-2xl font-bold text-xs text-white bg-amber-50/70 hover:bg-slate-700 border border-amber-200/60 text-center transition-colors flex items-center justify-center gap-2"
            >
              <span>Add to Multi-Bundle & Save 10-15%</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
