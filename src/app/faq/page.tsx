'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  category: 'billing' | 'weather' | 'prep' | 'guarantee';
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  // Pricing & Billing
  {
    category: 'billing',
    question: 'Are your prices guaranteed in USD with no surprise fees?',
    answer: 'Yes! Every quote generated on NorthStar Property Care is 100% upfront in US Dollars ($). The price you see in your itemized breakdown includes technician labor, commercial equipment, fuel, and supplies. If on-site property conditions vary substantially, our crew verifies any change before touching a tool.'
  },
  {
    category: 'billing',
    question: 'When is payment collected?',
    answer: 'We believe in earning your trust. For standard residential jobs, you can choose "Pay Upon Completion," meaning $0 is charged today. You inspect the work first and then settle via cash, check, debit, or digital invoice. For credit card holds, funds are authorized securely and only finalized after your satisfaction sign-off.'
  },
  {
    category: 'billing',
    question: 'How do multi-service bundle discounts work?',
    answer: 'Whenever you combine 2 services in your booking or master calculator, an automatic 10% discount applies across the entire order. Combine 3 or more services for an automatic 15% discount.'
  },

  // Scheduling & Weather
  {
    category: 'weather',
    question: 'How do snow removal and de-icing weather triggers work?',
    answer: 'Our winter storm dispatch system connects directly to NOAA Doppler radar. Snow removal kicks off automatically at 2.0 inches of accumulation. For driveway de-icing with the temperature trigger enabled, crews salt surfaces before temperatures drop below 32°F.'
  },
  {
    category: 'weather',
    question: 'What happens if severe rain delays exterior pressure washing or gutter cleaning?',
    answer: 'In the event of lightning or severe wind that makes ladder work hazardous, our dispatch supervisor will text and call you at least 2 hours in advance to reschedule to the next clear day with priority morning placement.'
  },
  {
    category: 'weather',
    question: 'Can I book a specific 3-hour arrival window?',
    answer: 'Yes. You choose between Morning (8–11 AM), Midday (11 AM–2 PM), or Afternoon (2–5 PM). Our crew sends an automated GPS text alert 30 minutes before pulling into your driveway.'
  },

  // Prep Checklists
  {
    category: 'prep',
    question: 'Do I need to be home during the service?',
    answer: 'No. Over 65% of our clients are away at work or errands. For exterior services (gutters, pressure wash, snow, lawn), we require unlocked side gates and active water spigots. For interior cleaning, clients supply a garage code or digital lockbox PIN.'
  },
  {
    category: 'prep',
    question: 'What should I do with my pets during house or carpet cleaning?',
    answer: 'We love pets! To keep dogs and cats stress-free during vacuuming and open-door periods, we recommend securing them in a designated room, backyard run, or kennel.'
  },
  {
    category: 'prep',
    question: 'Do I need to move heavy furniture before carpet cleaning?',
    answer: 'Our technicians will gladly slide light furniture (chairs, coffee tables, end tables) and place protective foil pads underneath. We request that heavy electronics, beds, and china cabinets remain stationary.'
  },

  // Guarantee
  {
    category: 'guarantee',
    question: 'What is your 24-Hour Re-Service Guarantee?',
    answer: 'If any portion of your completed service fails to meet our 64-point standards, simply contact us within 24 hours. A supervisor will return to re-clean, re-flush, or re-treat the area at zero cost to you.'
  },
  {
    category: 'guarantee',
    question: 'Are your technicians insured and bonded?',
    answer: 'Every NorthStar technician is an employee (not an independent day laborer) covered by our $2,000,000 general liability policy and statutory workers’ compensation.'
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = FAQS.filter((f) => {
    const matchesCat = activeCategory === 'all' || f.category === activeCategory;
    const matchesSearch =
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Help Center & Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-300">
          Everything you need to know about our USD pricing, weather dispatch policies, technician standards, and guarantees.
        </p>

        {/* Search */}
        <div className="pt-4 max-w-lg mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs by keyword (e.g. payment, pets, snow)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 shadow-inner"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pt-2">
          {[
            { id: 'all', label: 'All FAQs' },
            { id: 'billing', label: 'Pricing & USD Billing' },
            { id: 'weather', label: 'Scheduling & Weather' },
            { id: 'prep', label: 'Prep Checklists' },
            { id: 'guarantee', label: 'Satisfaction Guarantee' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-3">
        {filtered.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-850"
              >
                <span className="font-bold text-sm text-white">{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-amber-400 transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions CTA */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Still have questions about your property?</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Our friendly American dispatch supervisors are available 7 days a week by phone or live chat.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <a
            href="tel:18005822273"
            className="py-2.5 px-5 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors inline-flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call (800) 582-CARE</span>
          </a>
          <Link
            href="/contact"
            className="py-2.5 px-5 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 inline-flex items-center justify-center gap-2"
          >
            <span>Contact Dispatch Office</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
