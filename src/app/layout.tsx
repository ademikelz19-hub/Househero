import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'NorthStar Property Care | America’s Trusted Property Maintenance',
  description: 'NorthStar Property Care provides full-scale residential and commercial maintenance across the US with upfront USD ($) pricing, background-checked technicians, and a 100% satisfaction guarantee.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-50 text-slate-900 antialiased scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950 font-sans">
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
