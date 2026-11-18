import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'NorthStar Property Care | Licensed Residential & Commercial Maintenance',
  description: 'NorthStar Property Care provides professional residential & commercial maintenance across the US with upfront USD pricing: deep cleaning, carpet extraction, gutter cleaning, snow removal, pressure washing, junk hauling, HVAC, dryer vent, de-icing & grounds care.',
  keywords: 'property care, house cleaning, carpet cleaning, gutter cleaning, snow removal, pressure washing, junk removal, HVAC tune up, dryer vent cleaning, lawn care, de-icing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-slate-950 text-slate-100 antialiased">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950">
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
