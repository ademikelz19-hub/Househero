'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Phone,
  Shield,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Layers,
  Droplet,
  Snowflake,
  Wrench,
  Truck,
  Flame,
  Leaf,
  ShieldCheck,
  User,
  CalendarCheck,
  Calculator,
  Gift,
  Image as ImageIcon,
  MapPin,
  Star,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const pathname = usePathname();
  const { bookings, basePrices } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  const serviceCategories = [
    {
      name: 'Interior Care',
      services: [
        {
          name: 'House & Deep Cleaning',
          slug: 'house-deep-cleaning',
          price: basePrices['house-deep-cleaning'] || 120,
          unit: 'base',
          desc: '64-point touchpoint sanitization & deep scrub',
          icon: Sparkles
        },
        {
          name: 'Carpet Cleaning',
          slug: 'carpet-cleaning',
          price: basePrices['carpet-cleaning'] || 129,
          unit: '3 rooms',
          desc: '220°F thermal extraction & pet enzyme wash',
          icon: Layers
        },
        {
          name: 'Junk Removal',
          slug: 'junk-removal',
          price: basePrices['junk-removal'] || 89,
          unit: 'curbside',
          desc: 'Appliance recycling & full-service truck haul',
          icon: Truck
        }
      ]
    },
    {
      name: 'Exterior & Yard',
      services: [
        {
          name: 'Pressure Washing',
          slug: 'pressure-washing',
          price: basePrices['pressure-washing'] || 140,
          unit: 'min',
          desc: 'Concrete blast & low-PSI siding soft-wash',
          icon: Wrench
        },
        {
          name: 'Gutter Cleaning',
          slug: 'gutter-cleaning',
          price: basePrices['gutter-cleaning'] || 135,
          unit: '150 ft',
          desc: 'Hand cleanout & pressurized downspout jetting',
          icon: Droplet
        },
        {
          name: 'Lawn & Garden Cleanup',
          slug: 'lawn-garden-cleanup',
          price: basePrices['lawn-garden-cleanup'] || 130,
          unit: 'base',
          desc: 'Seasonal leaf removal, trimming & mulch bed prep',
          icon: Leaf
        }
      ]
    },
    {
      name: 'Winter & Storm',
      services: [
        {
          name: 'Snow Removal',
          slug: 'snow-removal',
          price: basePrices['snow-removal'] || 65,
          unit: 'per push',
          desc: 'Automated 2" trigger plow & walkway clearing',
          icon: Snowflake
        },
        {
          name: 'Driveway De-Icing',
          slug: 'driveway-walkway-de-icing',
          price: basePrices['driveway-walkway-de-icing'] || 55,
          unit: 'visit',
          desc: 'Pet-safe magnesium chloride ice melting',
          icon: ShieldCheck
        }
      ]
    },
    {
      name: 'Systems & Safety',
      services: [
        {
          name: 'HVAC Maintenance',
          slug: 'hvac-maintenance',
          price: basePrices['hvac-maintenance'] || 115,
          unit: 'tune-up',
          desc: '21-point furnace, heat pump & AC safety check',
          icon: Wrench
        },
        {
          name: 'Dryer Vent Cleaning',
          slug: 'dryer-vent-cleaning',
          price: basePrices['dryer-vent-cleaning'] || 119,
          unit: 'flat exit',
          desc: 'Rotary lint purge & airflow CFM velocity test',
          icon: Flame
        }
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-200">
      {/* Top Authority & Emergency Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <Shield className="w-3.5 h-3.5" /> Licensed, Bonded & Insured ($2M Liability)
            </span>
            <span className="hidden md:inline-block text-slate-600">•</span>
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.9★ Rated (2,800+ Verified US Reviews)
            </span>
            <span className="hidden lg:inline-block text-slate-600">•</span>
            <span className="hidden lg:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-blue-400" /> Same-Day & 24/7 Storm Dispatch Available
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <a
              href="tel:18005822273"
              className="flex items-center gap-1.5 text-amber-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>24/7 Hotline: (800) 582-CARE</span>
            </a>
            <span className="text-slate-700">|</span>
            <Link
              href="/portal"
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>Customer Portal</span>
              {bookings.length > 0 && (
                <span className="bg-emerald-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {bookings.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all ${
          scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-xl py-3 border-b border-slate-800' : 'bg-slate-900 py-4 border-b border-slate-800/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white">NORTHSTAR</span>
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  Care
                </span>
              </div>
              <p className="text-[10px] tracking-wider text-slate-400 uppercase font-medium">
                Property Care & Storm Services
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300">
            {/* Services Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 py-2 px-3 rounded-lg transition-colors ${
                  pathname.startsWith('/services') || servicesDropdownOpen
                    ? 'text-white bg-slate-800/80'
                    : 'hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-amber-400' : ''
                  }`}
                />
              </button>

              {/* Mega-Menu Dropdown Panel */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[920px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 z-50 grid grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2 duration-150">
                  {serviceCategories.map((cat) => (
                    <div key={cat.name} className="space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
                        {cat.name}
                      </div>
                      <div className="space-y-2">
                        {cat.services.map((svc) => {
                          const IconComp = svc.icon;
                          return (
                            <Link
                              key={svc.slug}
                              href={`/services/${svc.slug}`}
                              className="group block p-2 rounded-xl hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700/60"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <div className="p-1 rounded-md bg-slate-800 text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                                  <IconComp className="w-3.5 h-3.5" />
                                </div>
                                <span className="font-semibold text-xs text-white group-hover:text-amber-300 transition-colors leading-tight">
                                  {svc.name}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 line-clamp-1 pl-6">
                                {svc.desc}
                              </p>
                              <div className="pl-6 mt-1 flex items-center justify-between text-[11px]">
                                <span className="text-emerald-400 font-bold">
                                  From ${svc.price}
                                </span>
                                <span className="text-slate-500 text-[10px]">
                                  {svc.unit}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <div className="col-span-4 bg-slate-950/70 rounded-xl p-3 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>
                        Bundle 2 services for <strong>10% off</strong>, or 3+ services for <strong>15% off</strong>!
                      </span>
                    </div>
                    <Link
                      href="/pricing"
                      className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 group"
                    >
                      Master Pricing Calculator
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg transition-colors ${
                pathname === '/pricing' ? 'text-white bg-slate-800' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Pricing Calculator</span>
            </Link>

            <Link
              href="/bundles"
              className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg transition-colors ${
                pathname === '/bundles' ? 'text-white bg-slate-800' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Gift className="w-4 h-4 text-amber-400" />
              <span>Seasonal Bundles</span>
            </Link>

            <Link
              href="/gallery"
              className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg transition-colors ${
                pathname === '/gallery' ? 'text-white bg-slate-800' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-blue-400" />
              <span>Gallery</span>
            </Link>

            <Link
              href="/service-areas"
              className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg transition-colors ${
                pathname === '/service-areas' ? 'text-white bg-slate-800' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <MapPin className="w-4 h-4 text-red-400" />
              <span>Service Areas</span>
            </Link>

            <Link
              href="/reviews"
              className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg transition-colors ${
                pathname === '/reviews' ? 'text-white bg-slate-800' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Star className="w-4 h-4 text-yellow-400" />
              <span>Reviews</span>
            </Link>

            <Link
              href="/about"
              className={`py-1.5 px-2.5 rounded-lg transition-colors ${
                pathname === '/about' ? 'text-white bg-slate-800' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`py-1.5 px-2.5 rounded-lg transition-colors ${
                pathname === '/contact' ? 'text-white bg-slate-800' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Quick CTA Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/portal"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 transition-all hover:text-white"
            >
              <CalendarCheck className="w-4 h-4 text-emerald-400" />
              <span>Portal</span>
              {bookings.length > 0 && (
                <span className="bg-emerald-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {bookings.length}
                </span>
              )}
            </Link>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Service Now</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300"
            >
              <span>Book</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-slate-900 border-b border-slate-800 px-4 pt-4 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
              <Link
                href="/book"
                className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400"
              >
                Book Service Now
              </Link>
              <Link
                href="/portal"
                className="w-full text-center py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-800 border border-slate-700"
              >
                Customer Portal ({bookings.length})
              </Link>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 px-2 py-1">
                All 10 Services
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
                {serviceCategories.flatMap((c) => c.services).map((svc) => (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    className="flex items-center justify-between p-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    <span>{svc.name}</span>
                    <span className="text-emerald-400 font-bold">${svc.price}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-1 text-sm font-medium">
              <Link
                href="/pricing"
                className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Master Pricing Calculator</span>
              </Link>
              <Link
                href="/bundles"
                className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <Gift className="w-4 h-4 text-amber-400" />
                <span>Seasonal Bundles</span>
              </Link>
              <Link
                href="/gallery"
                className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <ImageIcon className="w-4 h-4 text-blue-400" />
                <span>Before & After Gallery</span>
              </Link>
              <Link
                href="/service-areas"
                className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <MapPin className="w-4 h-4 text-red-400" />
                <span>Service Areas & Coverage</span>
              </Link>
              <Link
                href="/reviews"
                className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Customer Reviews</span>
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>About & Safety Standards</span>
              </Link>
              <Link
                href="/faq"
                className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <Compass className="w-4 h-4 text-indigo-400" />
                <span>Help Center & FAQ</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Emergency Contact & Dispatch</span>
              </Link>
              <Link
                href="/admin"
                className="flex items-center gap-2 p-2 rounded-lg text-amber-300/80 hover:text-amber-300 hover:bg-slate-800 text-xs"
              >
                <span>⚙ Operations & Price Manager (Admin)</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
