'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Phone,
  Shield,
  Star,
  Sparkles,
  Layers,
  Droplet,
  Snowflake,
  Wrench,
  Truck,
  Flame,
  Leaf,
  ShieldCheck,
  Gift,
  Image as ImageIcon,
  MapPin,
  Clock,
  User,
  ArrowRight,
  Menu,
  X,
  FileText,
  HelpCircle,
  Settings,
  ChevronRight
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SERVICES } from '@/data/services';

export default function Navbar() {
  const pathname = usePathname();
  const { bookings } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on page navigation
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return Sparkles;
      case 'Layers': return Layers;
      case 'Droplet': return Droplet;
      case 'Snowflake': return Snowflake;
      case 'Wrench': return Wrench;
      case 'Truck': return Truck;
      case 'Flame': return Flame;
      case 'Leaf': return Leaf;
      case 'ShieldCheck': return ShieldCheck;
      default: return Wrench;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Pre-Header Bar: Luminous Warm Gold Aura (No Dark Blue) */}
      <div className="bg-gradient-to-r from-amber-50 via-yellow-50/80 to-orange-50 text-stone-700 text-[11px] sm:text-xs py-1.5 px-4 border-b border-amber-200/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-amber-700 font-semibold">
              <Shield className="w-3.5 h-3.5 text-amber-600" /> $2M Insured & Bonded
            </span>
            <span className="text-amber-300 hidden sm:inline">•</span>
            <span className="flex items-center gap-1 text-stone-600 hidden sm:inline-flex">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 4.9★ Rated (2,400+ Homes)
            </span>
            <span className="text-amber-300 hidden md:inline">•</span>
            <span className="text-amber-800 font-medium hidden md:inline">
              100% Satisfaction Guarantee
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="hidden lg:flex items-center gap-1.5 text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full border border-amber-300/40">
              <Clock className="w-3 h-3 text-amber-600" /> Rapid Dispatch 24/7
            </span>
            <a
              href="tel:18005556787"
              className="flex items-center gap-1 text-amber-700 hover:text-orange-600 font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>(800) 555-NSTAR</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glassy Liquid Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 border-b ${
          scrolled
            ? 'bg-white/85 backdrop-blur-xl border-amber-200/60 shadow-[0_8px_30px_rgb(245,158,11,0.08)] py-2.5'
            : 'bg-white/70 backdrop-blur-lg border-amber-100/60 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo with Golden Brand Compass */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-400 to-yellow-400 p-[1.5px] shadow-md shadow-amber-500/25 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-amber-600 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-stone-900">
                  North<span className="text-amber-500">Star</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full">
                  USA
                </span>
              </div>
              <span className="text-[10px] text-stone-500 font-medium tracking-wide">
                Property Care & Maintenance
              </span>
            </div>
          </Link>

          {/* Center Smooth Anchor Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            <a
              href="#services"
              className="px-3.5 py-1.5 text-sm font-semibold text-stone-700 hover:text-amber-600 hover:bg-amber-50/80 rounded-xl transition-all"
            >
              Services
            </a>
            <a
              href="#bundles"
              className="px-3.5 py-1.5 text-sm font-semibold text-stone-700 hover:text-amber-600 hover:bg-amber-50/80 rounded-xl transition-all"
            >
              Bundles
            </a>
            <a
              href="#gallery"
              className="px-3.5 py-1.5 text-sm font-semibold text-stone-700 hover:text-amber-600 hover:bg-amber-50/80 rounded-xl transition-all"
            >
              Transformations
            </a>
            <a
              href="#reviews"
              className="px-3.5 py-1.5 text-sm font-semibold text-stone-700 hover:text-amber-600 hover:bg-amber-50/80 rounded-xl transition-all"
            >
              Reviews
            </a>
            <a
              href="#coverage"
              className="px-3.5 py-1.5 text-sm font-semibold text-stone-700 hover:text-amber-600 hover:bg-amber-50/80 rounded-xl transition-all"
            >
              Areas
            </a>
            <a
              href="#portal"
              className="px-3.5 py-1.5 text-sm font-semibold text-stone-700 hover:text-amber-600 hover:bg-amber-50/80 rounded-xl transition-all"
            >
              Track Booking
            </a>
          </nav>

          {/* Right Action Elements */}
          <div className="flex items-center gap-3">
            {/* Quick Hotline Pill */}
            <a
              href="tel:18005556787"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50/90 border border-amber-200 text-stone-700 text-xs font-semibold hover:border-amber-400 hover:bg-amber-100/60 transition-all shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>(800) 555-NSTAR</span>
            </a>

            {/* Glowing Golden Liquid CTA Button */}
            <a
              href="#book"
              className="shimmer-mask relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Instant Book</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Sleek Hamburger Toggle Button */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-amber-50/80 border border-amber-200 text-stone-700 hover:text-amber-600 hover:bg-amber-100/80 transition-all flex items-center gap-1.5 text-xs font-semibold shadow-sm"
            >
              {drawerOpen ? <X className="w-5 h-5 text-amber-700" /> : <Menu className="w-5 h-5 text-amber-700" />}
              <span className="hidden sm:inline font-medium">Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sleek Slide-Over Liquid Glass Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white/95 backdrop-blur-2xl border-l border-amber-200/80 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div>
              <div className="p-5 border-b border-amber-100 flex items-center justify-between bg-gradient-to-r from-amber-50/80 via-yellow-50/50 to-orange-50/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 p-[1px]">
                    <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center">
                      <Compass className="w-4 h-4 text-amber-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">NorthStar Menu</h3>
                    <p className="text-[11px] text-stone-500">Liquid Property Care Services</p>
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-lg bg-white/80 border border-amber-200/60 text-stone-600 hover:text-stone-900 hover:bg-amber-100/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="p-5 space-y-6">
                {/* Core Sections */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md">
                    Quick Navigation
                  </span>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <a
                      href="#services"
                      onClick={() => setDrawerOpen(false)}
                      className="p-3 rounded-xl bg-amber-50/60 hover:bg-amber-100/80 border border-amber-200/50 text-xs font-semibold text-stone-800 flex items-center gap-2 transition-all"
                    >
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>10 Services</span>
                    </a>
                    <a
                      href="#book"
                      onClick={() => setDrawerOpen(false)}
                      className="p-3 rounded-xl bg-amber-50/60 hover:bg-amber-100/80 border border-amber-200/50 text-xs font-semibold text-stone-800 flex items-center gap-2 transition-all"
                    >
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Instant Book</span>
                    </a>
                    <a
                      href="#bundles"
                      onClick={() => setDrawerOpen(false)}
                      className="p-3 rounded-xl bg-amber-50/60 hover:bg-amber-100/80 border border-amber-200/50 text-xs font-semibold text-stone-800 flex items-center gap-2 transition-all"
                    >
                      <Gift className="w-4 h-4 text-amber-600" />
                      <span>Bundles</span>
                    </a>
                    <a
                      href="#gallery"
                      onClick={() => setDrawerOpen(false)}
                      className="p-3 rounded-xl bg-amber-50/60 hover:bg-amber-100/80 border border-amber-200/50 text-xs font-semibold text-stone-800 flex items-center gap-2 transition-all"
                    >
                      <ImageIcon className="w-4 h-4 text-amber-600" />
                      <span>Transformations</span>
                    </a>
                    <a
                      href="#reviews"
                      onClick={() => setDrawerOpen(false)}
                      className="p-3 rounded-xl bg-amber-50/60 hover:bg-amber-100/80 border border-amber-200/50 text-xs font-semibold text-stone-800 flex items-center gap-2 transition-all"
                    >
                      <Star className="w-4 h-4 text-amber-600" />
                      <span>Reviews (4.9★)</span>
                    </a>
                    <a
                      href="#coverage"
                      onClick={() => setDrawerOpen(false)}
                      className="p-3 rounded-xl bg-amber-50/60 hover:bg-amber-100/80 border border-amber-200/50 text-xs font-semibold text-stone-800 flex items-center gap-2 transition-all"
                    >
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span>ZIP Coverage</span>
                    </a>
                    <a
                      href="#portal"
                      onClick={() => setDrawerOpen(false)}
                      className="p-3 rounded-xl bg-amber-50/60 hover:bg-amber-100/80 border border-amber-200/50 text-xs font-semibold text-stone-800 flex items-center gap-2 transition-all col-span-2"
                    >
                      <User className="w-4 h-4 text-amber-600" />
                      <span>Track Existing Booking (Portal)</span>
                    </a>
                  </div>
                </div>

                {/* 10 Services Quick List */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md">
                    All 10 Services (USD)
                  </span>
                  <div className="mt-2.5 divide-y divide-amber-100/60 max-h-56 overflow-y-auto pr-1">
                    {SERVICES.map((s) => {
                      const Icon = getServiceIcon(s.iconName);
                      return (
                        <a
                          key={s.id}
                          href={`#service-${s.id}`}
                          onClick={() => setDrawerOpen(false)}
                          className="py-2.5 flex items-center justify-between group hover:text-amber-600 text-stone-700 text-xs font-medium"
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
                            <span>{s.title}</span>
                          </div>
                          <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md text-[11px] border border-amber-200/40">
                            From ${s.startingPrice}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer Hotline */}
            <div className="p-5 border-t border-amber-100 bg-gradient-to-r from-amber-50/80 to-orange-50/80">
              <a
                href="tel:18005556787"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm shadow-md shadow-amber-500/25 hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                <Phone className="w-4 h-4 animate-bounce" />
                <span>Call 24/7 Dispatch (800) 555-NSTAR</span>
              </a>
              <p className="text-center text-[11px] text-stone-500 mt-2">
                Licensed, Bonded & $2M Insured Nationwide
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
