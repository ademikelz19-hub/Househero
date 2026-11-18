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
  Calculator,
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
  const { bookings, basePrices } = useApp();
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
    <header className="sticky top-0 z-50 w-full">
      {/* Top Pre-Header Bar: Trust & Emergency Call */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Shield className="w-3 h-3 text-emerald-400" /> $2M Insured & Bonded
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3 h-3 fill-amber-400" /> 4.9★ Rated (2,800+ Verified)
            </span>
            <span className="text-slate-600 hidden md:inline">•</span>
            <span className="text-slate-400 hidden md:inline">100% Satisfaction Guarantee</span>
          </div>

          <div className="flex items-center gap-3 font-semibold text-slate-200">
            <a
              href="tel:18005822273"
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3 h-3 animate-pulse" />
              <span>(800) 582-CARE</span>
            </a>
            <span className="text-slate-700">|</span>
            <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-wider bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              USD ($)
            </span>
          </div>
        </div>
      </div>

      {/* Main Sleek Frosted Glass Header */}
      <nav
        className={`w-full transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200/80'
            : 'bg-white/90 backdrop-blur-sm py-3.5 border-b border-slate-100 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 text-amber-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-all border border-slate-800">
              <Compass className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                  NORTHSTAR
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-700 px-1.5 py-0.5 rounded border border-amber-500/30">
                  CARE
                </span>
              </div>
              <p className="text-[10px] tracking-wider text-slate-500 uppercase font-semibold mt-0.5">
                Property Care & Storm Dispatch
              </p>
            </div>
          </Link>

          {/* Center Navigation Shortcuts (Clean, minimal) */}
          <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
            <Link
              href="/services"
              className={`hover:text-slate-950 transition-colors ${
                pathname.startsWith('/services') ? 'text-amber-600' : ''
              }`}
            >
              Services Directory
            </Link>
            <Link
              href="/pricing"
              className={`flex items-center gap-1 hover:text-slate-950 transition-colors ${
                pathname === '/pricing' ? 'text-amber-600' : ''
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pricing Calculator</span>
            </Link>
            <Link
              href="/bundles"
              className={`flex items-center gap-1 hover:text-slate-950 transition-colors ${
                pathname === '/bundles' ? 'text-amber-600' : ''
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-amber-500" />
              <span>Seasonal Bundles</span>
            </Link>
          </div>

          {/* Right Action Cluster: Portal, Book CTA, and Sleek Hamburger Menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/portal"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200/80"
              title="Customer Self-Service Portal"
            >
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Portal</span>
              {bookings.length > 0 && (
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {bookings.length}
                </span>
              )}
            </Link>

            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Service</span>
            </Link>

            {/* Sleek Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all border border-slate-800 focus:outline-none"
              aria-label="Open full site menu"
            >
              <Menu className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* FULL-SCALE SLEEK HAMBURGER DRAWER (ALL PAGES) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-200 animate-in slide-in-from-right duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-black tracking-tight text-white">
                    NorthStar Navigation
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> All 10 Services • 100% Interactive
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center hover:bg-slate-700 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Body: Categorized Links for All Pages */}
            <div className="p-6 sm:p-8 space-y-8 flex-1">
              {/* Category 1: The 10 Core Services */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                    The 10 Core Property Care Services
                  </span>
                  <Link
                    href="/services"
                    onClick={() => setDrawerOpen(false)}
                    className="text-[11px] font-bold text-amber-600 hover:underline flex items-center gap-0.5"
                  >
                    Directory <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICES.map((s) => {
                    const Icon = getServiceIcon(s.iconName);
                    const price = basePrices[s.id] || s.startingPrice;
                    return (
                      <Link
                        key={s.id}
                        href={`/services/${s.slug}`}
                        onClick={() => setDrawerOpen(false)}
                        className="group flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-amber-300 bg-slate-50 hover:bg-amber-50/50 transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-white text-slate-700 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center shadow-xs transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-amber-800 line-clamp-1 leading-tight">
                              {s.title}
                            </div>
                            <div className="text-[10px] text-slate-500">{s.avgDuration}</div>
                          </div>
                        </div>

                        <span className="text-xs font-black text-emerald-600 font-mono">
                          ${price}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Category 2: Calculators, Bundles & Checkout */}
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 block pb-2 border-b border-slate-200 mb-3">
                  Pricing, Bundles & Booking
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <Link
                    href="/pricing"
                    onClick={() => setDrawerOpen(false)}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 transition-colors group"
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-900 group-hover:text-emerald-800">
                      <Calculator className="w-4 h-4 text-emerald-600" />
                      <span>Pricing Calculator</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Multi-service bundle estimator</p>
                  </Link>

                  <Link
                    href="/bundles"
                    onClick={() => setDrawerOpen(false)}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 transition-colors group"
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-900 group-hover:text-amber-800">
                      <Gift className="w-4 h-4 text-amber-500" />
                      <span>Seasonal Bundles</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Save up to $481 USD</p>
                  </Link>

                  <Link
                    href="/book"
                    onClick={() => setDrawerOpen(false)}
                    className="p-3 rounded-xl border border-amber-300 bg-amber-50/70 hover:bg-amber-100 transition-colors group"
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-amber-900">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Online Checkout</span>
                    </div>
                    <p className="text-[10px] text-amber-700/80 mt-1">5-Step instant booking wizard</p>
                  </Link>
                </div>
              </div>

              {/* Category 3: Customer Portal, Gallery & Service Areas */}
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 block pb-2 border-b border-slate-200 mb-3">
                  Client Hub & Portfolios
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <Link
                    href="/portal"
                    onClick={() => setDrawerOpen(false)}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-blue-600" />
                        <span>Customer Portal</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Manage bookings & invoices</div>
                    </div>
                    {bookings.length > 0 && (
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                        {bookings.length}
                      </span>
                    )}
                  </Link>

                  <Link
                    href="/gallery"
                    onClick={() => setDrawerOpen(false)}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                      <span>Before / After Gallery</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Interactive drag comparisons</div>
                  </Link>

                  <Link
                    href="/service-areas"
                    onClick={() => setDrawerOpen(false)}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-600" />
                      <span>Service Areas</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">ZIP search & response hubs</div>
                  </Link>
                </div>
              </div>

              {/* Category 4: Trust, Safety & Support */}
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 block pb-2 border-b border-slate-200 mb-3">
                  Company, Trust & Help
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-slate-700">
                  <Link
                    href="/reviews"
                    onClick={() => setDrawerOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 hover:text-slate-950 transition-colors flex items-center gap-1.5"
                  >
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    <span>Reviews (4.9★)</span>
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => setDrawerOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 hover:text-slate-950 transition-colors flex items-center gap-1.5"
                  >
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    <span>About Us</span>
                  </Link>

                  <Link
                    href="/satisfaction-guarantee"
                    onClick={() => setDrawerOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 hover:text-slate-950 transition-colors flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>24h Guarantee</span>
                  </Link>

                  <Link
                    href="/faq"
                    onClick={() => setDrawerOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 hover:text-slate-950 transition-colors flex items-center gap-1.5"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>Help & FAQs</span>
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setDrawerOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 hover:text-slate-950 transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-600" />
                    <span>Emergency Contact</span>
                  </Link>

                  <Link
                    href="/admin"
                    onClick={() => setDrawerOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 hover:text-slate-950 transition-colors flex items-center gap-1.5 text-amber-800"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Admin Console</span>
                  </Link>

                  <Link
                    href="/privacy-policy"
                    onClick={() => setDrawerOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 hover:text-slate-950 transition-colors"
                  >
                    Privacy Policy
                  </Link>

                  <Link
                    href="/terms-of-service"
                    onClick={() => setDrawerOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 hover:text-slate-950 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>

            {/* Drawer Footer CTA */}
            <div className="p-6 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div>
                <div className="text-white font-bold">Need Immediate Storm Dispatch?</div>
                <div className="text-slate-400">Call (800) 582-CARE • 24/7 Crew Standby</div>
              </div>
              <Link
                href="/book"
                onClick={() => setDrawerOpen(false)}
                className="py-2.5 px-4 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
