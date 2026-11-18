import React, { Suspense } from 'react';
import BookingWizard from '@/components/BookingWizard';

export const metadata = {
  title: 'Book Property Care | NorthStar Upfront USD Checkout',
  description: 'Book residential and commercial maintenance services with instant USD pricing, scheduled arrival window, and 100% satisfaction guarantee.',
};

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-slate-400 text-xs">
          Loading interactive booking wizard...
        </div>
      }
    >
      <BookingWizard />
    </Suspense>
  );
}
