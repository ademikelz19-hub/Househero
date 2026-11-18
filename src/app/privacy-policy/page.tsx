import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | NorthStar Property Care',
  description: 'NorthStar Property Care customer privacy and data security policies.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-xs leading-relaxed text-stone-700">
      <div>
        <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
          Legal Documentation
        </span>
        <h1 className="text-3xl font-black text-white mt-1">Privacy Policy</h1>
        <p className="text-slate-500 mt-1">Last Updated: November 18, 2026</p>
      </div>

      <div className="bg-white/90 backdrop-blur-xl border border-amber-200/70 rounded-3xl p-6 sm:p-8 space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Information We Collect</h2>
          <p>
            When you request a quote, book a service, or access the NorthStar Customer Portal, we collect information required to dispatch crews and provide accurate USD billing. This includes: Full Name, Service Address, 5-Digit US ZIP Code, Email Address, Mobile Phone Number, Gate/Access Codes, and payment preferences.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. How We Use Your Information</h2>
          <p>
            Your information is used strictly to dispatch mobile service crews, deliver automated 30-minute arrival alerts via SMS, issue itemized USD invoices, and coordinate our 24-Hour Satisfaction Guarantee. We never sell, rent, or trade customer contact details with third-party marketers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Security & Payment Data</h2>
          <p>
            Payment transactions and card-on-file authorizations are handled through PCI-DSS Level 1 compliant processors. NorthStar Property Care does not store unencrypted raw card numbers on local web servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Contacting Privacy Compliance</h2>
          <p>
            For questions regarding your saved quotes, portal data, or to request deletion of your service records, contact: <strong>privacy@northstarpropertycare.com</strong> or call (800) 582-CARE.
          </p>
        </section>
      </div>
    </div>
  );
}
