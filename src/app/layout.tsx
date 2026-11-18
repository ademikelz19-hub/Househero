import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'NorthStar Property Care | Trusted Property Maintenance',
  description: 'NorthStar Property Care provides professional residential and commercial property maintenance across the US with upfront USD pricing, background-checked technicians, and a 100% satisfaction guarantee.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#FFFDF9] text-stone-900 antialiased scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#FFFDF9] text-stone-900 selection:bg-amber-400 selection:text-stone-950 font-sans relative overflow-x-hidden">
        {/* Warm amber floating orbs — no blue */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-amber-300/25 via-orange-300/15 to-yellow-200/30 blur-3xl animate-liquid-float" />
          <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-gradient-to-bl from-yellow-300/20 via-amber-300/15 to-orange-200/15 blur-3xl animate-liquid-float-slow" />
          <div className="absolute -bottom-40 left-1/4 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-orange-200/20 via-amber-200/20 to-yellow-100/30 blur-3xl animate-liquid-float" />
        </div>

        <AppProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
