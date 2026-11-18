'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SERVICES } from '@/data/services';

export interface BookingServiceItem {
  serviceId: string;
  serviceTitle: string;
  subtotal: number;
  config: any;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  gateCode?: string;
  notes?: string;
}

export interface Booking {
  id: string; // e.g. "NSPC-9842"
  services: BookingServiceItem[];
  customer: CustomerDetails;
  scheduledDate: string;
  timeWindow: string;
  paymentMethod: 'pay-upon-completion' | 'card-hold';
  subtotalUSD: number;
  discountUSD: number;
  totalUSD: number;
  status: 'Confirmed' | 'Crew Dispatched' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface SavedQuote {
  id: string;
  services: BookingServiceItem[];
  subtotalUSD: number;
  discountUSD: number;
  totalUSD: number;
  zipCode: string;
  createdAt: string;
}

interface AppContextType {
  bookings: Booking[];
  quotes: SavedQuote[];
  basePrices: Record<string, number>;
  activeQuoteServices: { serviceId: string; config: any }[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Booking;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  rescheduleBooking: (id: string, newDate: string, newWindow?: string) => void;
  cancelBooking: (id: string) => void;
  saveQuote: (quote: Omit<SavedQuote, 'id' | 'createdAt'>) => SavedQuote;
  updateBasePrice: (serviceId: string, newPrice: number) => void;
  resetBasePrices: () => void;
  setActiveQuoteServices: React.Dispatch<React.SetStateAction<{ serviceId: string; config: any }[]>>;
  addServiceToActiveQuote: (serviceId: string, config?: any) => void;
  removeServiceFromActiveQuote: (serviceId: string) => void;
}

const DEFAULT_BASE_PRICES: Record<string, number> = {
  'house-deep-cleaning': 120,
  'carpet-cleaning': 129,
  'gutter-cleaning': 135,
  'snow-removal': 65,
  'pressure-washing': 140,
  'junk-removal': 89,
  'dryer-vent-cleaning': 119,
  'lawn-garden-cleanup': 130,
  'hvac-maintenance': 115,
  'driveway-walkway-de-icing': 55,
};

const SEED_BOOKINGS: Booking[] = [
  {
    id: 'NSPC-8491',
    services: [
      {
        serviceId: 'house-deep-cleaning',
        serviceTitle: 'House & Deep Cleaning',
        subtotal: 282,
        config: { homeSize: '3br', tier: 'deep', oven: true, fridge: true, windows: false, frequency: 'once' }
      },
      {
        serviceId: 'carpet-cleaning',
        serviceTitle: 'Carpet Cleaning',
        subtotal: 165,
        config: { rooms: 3, hallways: 1, rugs: 0, petTreatment: true, scotchgard: false }
      }
    ],
    customer: {
      fullName: 'Eleanor Vance',
      email: 'eleanor.vance@gmail.com',
      phone: '(303) 555-0194',
      address: '1482 Willow Creek Drive',
      city: 'Denver',
      state: 'CO',
      zipCode: '80206',
      gateCode: '#4910',
      notes: 'Two friendly golden retrievers will be in backyard kennel during cleaning.'
    },
    scheduledDate: '2026-11-20',
    timeWindow: 'Morning 8:00 AM – 11:00 AM',
    paymentMethod: 'card-hold',
    subtotalUSD: 447,
    discountUSD: 45,
    totalUSD: 402,
    status: 'Confirmed',
    createdAt: '2026-11-17T14:32:00Z'
  },
  {
    id: 'NSPC-7215',
    services: [
      {
        serviceId: 'snow-removal',
        serviceTitle: 'Snow Removal',
        subtotal: 95,
        config: { drivewaySize: 'large', snowDepth: '1-6', planType: 'per-push' }
      },
      {
        serviceId: 'driveway-walkway-de-icing',
        serviceTitle: 'Driveway & Walkway De-Icing',
        subtotal: 105,
        config: { coverageTier: 'large', material: 'magnesium-chloride', autoDispatch: true }
      }
    ],
    customer: {
      fullName: 'Marcus Sterling',
      email: 'm.sterling@outlook.com',
      phone: '(612) 555-8821',
      address: '4922 Minnehaha Parkway',
      city: 'Minneapolis',
      state: 'MN',
      zipCode: '55417',
      notes: 'Steep hill driveway — please salt thoroughly near the sidewalk intersection.'
    },
    scheduledDate: '2026-11-19',
    timeWindow: 'Priority Weather Dispatch (Sub-Zero)',
    paymentMethod: 'pay-upon-completion',
    subtotalUSD: 200,
    discountUSD: 20,
    totalUSD: 180,
    status: 'Crew Dispatched',
    createdAt: '2026-11-18T04:15:00Z'
  },
  {
    id: 'NSPC-6034',
    services: [
      {
        serviceId: 'gutter-cleaning',
        serviceTitle: 'Gutter Cleaning',
        subtotal: 220,
        config: { stories: '2story', downspoutFlush: true, minorSealing: false, gutterGuards: false }
      },
      {
        serviceId: 'dryer-vent-cleaning',
        serviceTitle: 'Dryer Vent Cleaning',
        subtotal: 149,
        config: { exitLocation: 'second-story', birdGuard: false, transitionHose: false }
      }
    ],
    customer: {
      fullName: 'Rachel Kowalski',
      email: 'rkowalski88@gmail.com',
      phone: '(312) 555-4309',
      address: '815 N Hermitage Ave',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60622',
      notes: 'Second-story roof ladder access via south side walkway.'
    },
    scheduledDate: '2026-11-16',
    timeWindow: 'Midday 11:00 AM – 2:00 PM',
    paymentMethod: 'card-hold',
    subtotalUSD: 369,
    discountUSD: 37,
    totalUSD: 332,
    status: 'Completed',
    createdAt: '2026-11-14T11:20:00Z'
  },
  {
    id: 'NSPC-5912',
    services: [
      {
        serviceId: 'hvac-maintenance',
        serviceTitle: 'HVAC Maintenance',
        subtotal: 229,
        config: { systemType: 'dual', planType: 'comfort-shield' }
      }
    ],
    customer: {
      fullName: 'David & Karen Chen',
      email: 'chen.family.res@gmail.com',
      phone: '(414) 555-7634',
      address: '2240 N Terrace Ave',
      city: 'Milwaukee',
      state: 'WI',
      zipCode: '53202',
      notes: 'Furnace unit in basement utility room. Side door is unlocked.'
    },
    scheduledDate: '2026-11-15',
    timeWindow: 'Afternoon 2:00 PM – 5:00 PM',
    paymentMethod: 'card-hold',
    subtotalUSD: 229,
    discountUSD: 0,
    totalUSD: 229,
    status: 'Completed',
    createdAt: '2026-11-12T09:45:00Z'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(SEED_BOOKINGS);
  const [quotes, setQuotes] = useState<SavedQuote[]>([]);
  const [basePrices, setBasePrices] = useState<Record<string, number>>(DEFAULT_BASE_PRICES);
  const [activeQuoteServices, setActiveQuoteServices] = useState<{ serviceId: string; config: any }[]>([
    { serviceId: 'house-deep-cleaning', config: { homeSize: '3br', tier: 'standard', oven: false, fridge: false, windows: false, frequency: 'once' } }
  ]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedBookings = localStorage.getItem('nspc_bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      } else {
        localStorage.setItem('nspc_bookings', JSON.stringify(SEED_BOOKINGS));
      }

      const storedQuotes = localStorage.getItem('nspc_quotes');
      if (storedQuotes) {
        setQuotes(JSON.parse(storedQuotes));
      }

      const storedPrices = localStorage.getItem('nspc_base_prices');
      if (storedPrices) {
        setBasePrices(JSON.parse(storedPrices));
      }
    } catch (e) {
      console.error('Failed to parse localStorage data:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever states change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('nspc_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error('Error saving bookings to localStorage', e);
    }
  }, [bookings, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('nspc_quotes', JSON.stringify(quotes));
    } catch (e) {
      console.error('Error saving quotes to localStorage', e);
    }
  }, [quotes, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('nspc_base_prices', JSON.stringify(basePrices));
    } catch (e) {
      console.error('Error saving base prices to localStorage', e);
    }
  }, [basePrices, isLoaded]);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...bookingData,
      id: `NSPC-${randomSuffix}`,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Also persist via Next.js API in background
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBooking)
    }).catch((err) => console.log('API sync background notice:', err));

    return newBooking;
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    fetch('/api/bookings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    }).catch(() => {});
  };

  const rescheduleBooking = (id: string, newDate: string, newWindow?: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, scheduledDate: newDate, timeWindow: newWindow || b.timeWindow } : b))
    );
    fetch('/api/bookings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, scheduledDate: newDate, timeWindow: newWindow })
    }).catch(() => {});
  };

  const cancelBooking = (id: string) => {
    updateBookingStatus(id, 'Cancelled');
  };

  const saveQuote = (quoteData: Omit<SavedQuote, 'id' | 'createdAt'>): SavedQuote => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newQuote: SavedQuote = {
      ...quoteData,
      id: `QUOTE-${randomSuffix}`,
      createdAt: new Date().toISOString()
    };
    setQuotes((prev) => [newQuote, ...prev]);
    fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuote)
    }).catch(() => {});
    return newQuote;
  };

  const updateBasePrice = (serviceId: string, newPrice: number) => {
    setBasePrices((prev) => ({
      ...prev,
      [serviceId]: newPrice
    }));
    fetch('/api/services', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceId, basePrice: newPrice })
    }).catch(() => {});
  };

  const resetBasePrices = () => {
    setBasePrices(DEFAULT_BASE_PRICES);
  };

  const addServiceToActiveQuote = (serviceId: string, config?: any) => {
    setActiveQuoteServices((prev) => {
      if (prev.some((item) => item.serviceId === serviceId)) return prev;
      return [...prev, { serviceId, config: config || {} }];
    });
  };

  const removeServiceFromActiveQuote = (serviceId: string) => {
    setActiveQuoteServices((prev) => prev.filter((item) => item.serviceId !== serviceId));
  };

  return (
    <AppContext.Provider
      value={{
        bookings,
        quotes,
        basePrices,
        activeQuoteServices,
        addBooking,
        updateBookingStatus,
        rescheduleBooking,
        cancelBooking,
        saveQuote,
        updateBasePrice,
        resetBasePrices,
        setActiveQuoteServices,
        addServiceToActiveQuote,
        removeServiceFromActiveQuote
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
