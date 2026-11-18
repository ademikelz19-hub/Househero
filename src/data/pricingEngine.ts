export interface HouseCleaningConfig {
  homeSize: '1br' | '2br' | '3br' | '4br' | '5br';
  tier: 'standard' | 'deep' | 'move';
  oven: boolean;
  fridge: boolean;
  windows: boolean;
  frequency: 'once' | 'monthly' | 'biweekly' | 'weekly';
}

export interface CarpetCleaningConfig {
  rooms: number;
  hallways: number;
  rugs: number;
  petTreatment: boolean;
  scotchgard: boolean;
}

export interface GutterCleaningConfig {
  stories: '1story' | '2story' | '3story';
  downspoutFlush: boolean;
  minorSealing: boolean;
  gutterGuards: boolean;
}

export interface SnowRemovalConfig {
  drivewaySize: 'standard' | 'large' | 'commercial';
  snowDepth: '1-6' | '6-12' | '12plus';
  planType: 'per-push' | 'seasonal-pass';
}

export interface PressureWashingConfig {
  surfaceType: 'driveway' | 'siding' | 'deck' | 'patio';
  squareFeet: number;
}

export interface JunkRemovalConfig {
  volumeTier: 'single' | '1-8' | '1-4' | '1-2' | '3-4' | 'full';
  mattressesAppliances: number;
  eWasteItems: number;
}

export interface DryerVentConfig {
  exitLocation: 'ground' | 'second-story' | 'rooftop';
  birdGuard: boolean;
  transitionHose: boolean;
}

export interface LawnCleanupConfig {
  lotSize: 'small' | 'medium' | 'large' | 'acreage';
  leafRemoval: boolean;
  shrubTrimming: boolean;
  mulchRefresh: boolean;
}

export interface HVACMaintenanceConfig {
  systemType: 'single' | 'dual' | 'additional';
  planType: 'tune-up' | 'comfort-shield';
}

export interface DeIcingConfig {
  coverageTier: 'standard' | 'large' | 'commercial';
  material: 'rock-salt' | 'magnesium-chloride';
  autoDispatch: boolean;
}

export const calculateServicePrice = (
  serviceId: string,
  config: any,
  basePriceOverrides?: Record<string, number>
): { subtotal: number; discount: number; total: number; breakdown: { item: string; price: number }[] } => {
  const breakdown: { item: string; price: number }[] = [];
  let subtotal = 0;
  let discount = 0;

  switch (serviceId) {
    case 'house-deep-cleaning': {
      const cfg: HouseCleaningConfig = config || {
        homeSize: '3br',
        tier: 'standard',
        oven: false,
        fridge: false,
        windows: false,
        frequency: 'once'
      };

      const baseRates: Record<string, number> = {
        '1br': basePriceOverrides?.['house-deep-cleaning'] || 120,
        '2br': 155,
        '3br': 195,
        '4br': 240,
        '5br': 295
      };

      const base = baseRates[cfg.homeSize] || 195;
      const tierMultipliers = { standard: 1.0, deep: 1.45, move: 1.6 };
      const multiplier = tierMultipliers[cfg.tier] || 1.0;
      const tierLabel = cfg.tier === 'standard' ? 'Standard Clean' : cfg.tier === 'deep' ? 'Deep Scrub' : 'Move-In/Move-Out';

      const homeSizeLabel = cfg.homeSize.toUpperCase() + ' Home Base';
      const cleanCost = Math.round(base * multiplier);
      breakdown.push({ item: `${homeSizeLabel} (${tierLabel})`, price: cleanCost });
      subtotal += cleanCost;

      if (cfg.oven) {
        breakdown.push({ item: 'Inside Oven Detailing', price: 35 });
        subtotal += 35;
      }
      if (cfg.fridge) {
        breakdown.push({ item: 'Inside Refrigerator Sanitization', price: 35 });
        subtotal += 35;
      }
      if (cfg.windows) {
        breakdown.push({ item: 'Interior Windows Package', price: 50 });
        subtotal += 50;
      }

      const freqDiscounts = { once: 0, monthly: 0.1, biweekly: 0.15, weekly: 0.2 };
      const discRate = freqDiscounts[cfg.frequency] || 0;
      if (discRate > 0) {
        discount = Math.round(subtotal * discRate);
      }
      break;
    }

    case 'carpet-cleaning': {
      const cfg: CarpetCleaningConfig = config || { rooms: 3, hallways: 0, rugs: 0, petTreatment: false, scotchgard: false };
      const roomBase = basePriceOverrides?.['carpet-cleaning'] ? Math.round(basePriceOverrides['carpet-cleaning'] / 3) : 45;
      const roomCount = Math.max(1, cfg.rooms || 1);
      const roomsCost = roomCount * roomBase;
      const hallwayCost = (cfg.hallways || 0) * 35;
      const rugCost = (cfg.rugs || 0) * 25;

      let baseSum = roomsCost + hallwayCost + rugCost;
      const minBase = basePriceOverrides?.['carpet-cleaning'] || 129;
      if (baseSum < minBase) {
        baseSum = minBase;
        breakdown.push({ item: `Carpet Extraction (Base Minimum ${roomCount} Rooms)`, price: baseSum });
      } else {
        breakdown.push({ item: `${roomCount} Rooms Steamed ($${roomBase}/ea)`, price: roomsCost });
        if (hallwayCost > 0) breakdown.push({ item: `${cfg.hallways} Hallways/Staircases`, price: hallwayCost });
        if (rugCost > 0) breakdown.push({ item: `${cfg.rugs} Area Rugs`, price: rugCost });
      }
      subtotal += baseSum;

      if (cfg.petTreatment) {
        const petCost = roomCount * 30;
        breakdown.push({ item: `Pet Odor & Enzyme Treatment (${roomCount} rooms)`, price: petCost });
        subtotal += petCost;
      }
      if (cfg.scotchgard) {
        const sgCost = roomCount * 25;
        breakdown.push({ item: `Scotchgard Fiber Protector (${roomCount} rooms)`, price: sgCost });
        subtotal += sgCost;
      }
      break;
    }

    case 'gutter-cleaning': {
      const cfg: GutterCleaningConfig = config || { stories: '2story', downspoutFlush: true, minorSealing: false, gutterGuards: false };
      const storyRates: Record<string, number> = {
        '1story': basePriceOverrides?.['gutter-cleaning'] || 135,
        '2story': 185,
        '3story': 250
      };
      const gutterBase = storyRates[cfg.stories] || 185;
      const storyLabel = cfg.stories === '1story' ? '1-Story (up to 150 ft)' : cfg.stories === '2story' ? '2-Story (up to 200 ft)' : '3-Story / Complex Roof';
      breakdown.push({ item: `Gutter Clearing: ${storyLabel}`, price: gutterBase });
      subtotal += gutterBase;

      if (cfg.downspoutFlush) {
        breakdown.push({ item: 'Pressurized Downspout Flush & Clog Removal', price: 35 });
        subtotal += 35;
      }
      if (cfg.minorSealing) {
        breakdown.push({ item: 'Minor Gutter Joint & Corner Sealing', price: 45 });
        subtotal += 45;
      }
      if (cfg.gutterGuards) {
        breakdown.push({ item: 'Gutter Guard Micro-Mesh Quote Assessment', price: 120 });
        subtotal += 120;
      }
      break;
    }

    case 'snow-removal': {
      const cfg: SnowRemovalConfig = config || { drivewaySize: 'standard', snowDepth: '1-6', planType: 'per-push' };
      if (cfg.planType === 'seasonal-pass') {
        const passPrice = 499;
        breakdown.push({ item: 'Priority Seasonal Unlimited Snow Pass (Nov 15 – Apr 15)', price: passPrice });
        subtotal += passPrice;
      } else {
        const driveRates: Record<string, number> = {
          standard: basePriceOverrides?.['snow-removal'] || 65,
          large: 95,
          commercial: 140
        };
        const driveBase = driveRates[cfg.drivewaySize] || 65;
        const driveLabel = cfg.drivewaySize === 'standard' ? 'Standard 2-Car Driveway' : cfg.drivewaySize === 'large' ? 'Large 4-Car Driveway' : 'Long / Commercial Driveway';
        breakdown.push({ item: `Snow Plowing: ${driveLabel}`, price: driveBase });
        subtotal += driveBase;

        const depthSurcharges: Record<string, number> = { '1-6': 0, '6-12': 25, '12plus': 55 };
        const depthFee = depthSurcharges[cfg.snowDepth] || 0;
        if (depthFee > 0) {
          const depthLabel = cfg.snowDepth === '6-12' ? '6–12" Heavy Snow Surcharge' : '12"+ Severe Blizzard Surcharge';
          breakdown.push({ item: depthLabel, price: depthFee });
          subtotal += depthFee;
        }
      }
      break;
    }

    case 'pressure-washing': {
      const cfg: PressureWashingConfig = config || { surfaceType: 'driveway', squareFeet: 600 };
      const rates = {
        driveway: { perSqFt: 0.25, min: basePriceOverrides?.['pressure-washing'] || 140, label: 'Concrete Driveway Surface Blast' },
        siding: { perSqFt: 0.30, min: 195, label: 'House Siding Low-Pressure Soft-Wash' },
        deck: { perSqFt: 0.45, min: 160, label: 'Wood/Composite Deck Restoration' },
        patio: { perSqFt: 0.28, min: 120, label: 'Patio & Walkway Rotary Wash' }
      };
      const rateInfo = rates[cfg.surfaceType] || rates.driveway;
      const rawCost = Math.round((cfg.squareFeet || 500) * rateInfo.perSqFt);
      const finalCost = Math.max(rateInfo.min, rawCost);
      breakdown.push({ item: `${rateInfo.label} (${cfg.squareFeet || 500} sq ft)`, price: finalCost });
      subtotal += finalCost;
      break;
    }

    case 'junk-removal': {
      const cfg: JunkRemovalConfig = config || { volumeTier: '1-4', mattressesAppliances: 0, eWasteItems: 0 };
      const volumeTiers: Record<string, { label: string; price: number }> = {
        single: { label: 'Single Curbside Bulky Item', price: basePriceOverrides?.['junk-removal'] || 89 },
        '1-8': { label: '1/8 Truck Bed Load', price: 149 },
        '1-4': { label: '1/4 Truck Bed Load', price: 239 },
        '1-2': { label: '1/2 Truck Bed Load (Popular)', price: 379 },
        '3-4': { label: '3/4 Truck Bed Load', price: 499 },
        full: { label: 'Full 16-Yard Truck Load', price: 629 }
      };
      const tierInfo = volumeTiers[cfg.volumeTier] || volumeTiers['1-4'];
      breakdown.push({ item: tierInfo.label, price: tierInfo.price });
      subtotal += tierInfo.price;

      if (cfg.mattressesAppliances > 0) {
        const matCost = cfg.mattressesAppliances * 35;
        breakdown.push({ item: `${cfg.mattressesAppliances}x Heavy Appliance/Mattress Eco-Recycle`, price: matCost });
        subtotal += matCost;
      }
      if (cfg.eWasteItems > 0) {
        const ewCost = cfg.eWasteItems * 25;
        breakdown.push({ item: `${cfg.eWasteItems}x Certified E-Waste Disposal`, price: ewCost });
        subtotal += ewCost;
      }
      break;
    }

    case 'dryer-vent-cleaning': {
      const cfg: DryerVentConfig = config || { exitLocation: 'ground', birdGuard: false, transitionHose: false };
      const exitRates: Record<string, { label: string; price: number }> = {
        ground: { label: 'Ground-Level Exterior Wall Vent', price: basePriceOverrides?.['dryer-vent-cleaning'] || 119 },
        'second-story': { label: 'Second-Story Exterior Wall Vent', price: 149 },
        rooftop: { label: 'Rooftop Flue Exhaust Exit', price: 179 }
      };
      const exitInfo = exitRates[cfg.exitLocation] || exitRates.ground;
      breakdown.push({ item: `Rotary Scour: ${exitInfo.label}`, price: exitInfo.price });
      subtotal += exitInfo.price;

      if (cfg.birdGuard) {
        breakdown.push({ item: 'Exterior Heavy-Duty Steel Bird Guard Install', price: 40 });
        subtotal += 40;
      }
      if (cfg.transitionHose) {
        breakdown.push({ item: 'UL-Listed Fire-Resistant Transition Hose Replace', price: 35 });
        subtotal += 35;
      }
      break;
    }

    case 'lawn-garden-cleanup': {
      const cfg: LawnCleanupConfig = config || { lotSize: 'medium', leafRemoval: true, shrubTrimming: false, mulchRefresh: false };
      const lotRates: Record<string, { label: string; price: number }> = {
        small: { label: 'Small Lot (<5,000 sq ft)', price: basePriceOverrides?.['lawn-garden-cleanup'] || 130 },
        medium: { label: 'Medium Lot (5,000 – 10,000 sq ft)', price: 195 },
        large: { label: 'Large Lot (10,000 – 20,000 sq ft)', price: 285 },
        acreage: { label: 'Estate / Acreage (20,000+ sq ft)', price: 395 }
      };
      const lotInfo = lotRates[cfg.lotSize] || lotRates.medium;
      breakdown.push({ item: `Property Cleanup: ${lotInfo.label}`, price: lotInfo.price });
      subtotal += lotInfo.price;

      if (cfg.leafRemoval) {
        breakdown.push({ item: 'Leaf Raking, Blowing & Vacuum Bagging', price: 55 });
        subtotal += 55;
      }
      if (cfg.shrubTrimming) {
        breakdown.push({ item: 'Hedge, Bush & Ornamental Shrub Pruning', price: 65 });
        subtotal += 65;
      }
      if (cfg.mulchRefresh) {
        breakdown.push({ item: 'Perennial Bed Edging & Hardwood Mulch Refresh', price: 85 });
        subtotal += 85;
      }
      break;
    }

    case 'hvac-maintenance': {
      const cfg: HVACMaintenanceConfig = config || { systemType: 'single', planType: 'tune-up' };
      if (cfg.planType === 'comfort-shield') {
        const planCost = 229;
        breakdown.push({ item: 'Annual Comfort Shield Plan (2 Seasonal Visits + 15% Off Repairs)', price: planCost });
        subtotal += planCost;
      } else {
        const systemRates: Record<string, { label: string; price: number }> = {
          single: { label: 'Single Zone Furnace or AC Tune-Up', price: basePriceOverrides?.['hvac-maintenance'] || 115 },
          dual: { label: 'Dual Heating & AC Complete 21-Point System Check', price: 169 },
          additional: { label: 'Dual System Check + Additional Zone/Split', price: 244 }
        };
        const sysInfo = systemRates[cfg.systemType] || systemRates.single;
        breakdown.push({ item: sysInfo.label, price: sysInfo.price });
        subtotal += sysInfo.price;
      }
      break;
    }

    case 'driveway-walkway-de-icing': {
      const cfg: DeIcingConfig = config || { coverageTier: 'standard', material: 'magnesium-chloride', autoDispatch: false };
      const coverageRates: Record<string, { label: string; price: number }> = {
        standard: { label: 'Standard Driveway + Front Entry Walkway', price: basePriceOverrides?.['driveway-walkway-de-icing'] || 55 },
        large: { label: 'Large Driveway + City Sidewalks & Patio', price: 85 },
        commercial: { label: 'Commercial / Large Corner Lot Corridor', price: 130 }
      };
      const covInfo = coverageRates[cfg.coverageTier] || coverageRates.standard;
      breakdown.push({ item: `De-Icing Application: ${covInfo.label}`, price: covInfo.price });
      subtotal += covInfo.price;

      if (cfg.material === 'magnesium-chloride') {
        breakdown.push({ item: 'Pet-Safe & Concrete-Safe Magnesium Chloride Treatment', price: 20 });
        subtotal += 20;
      }
      if (cfg.autoDispatch) {
        breakdown.push({ item: 'Sub-32°F Automatic Temperature Freeze Radar Trigger', price: 15 });
        subtotal += 15;
      }
      break;
    }

    default:
      subtotal = 100;
      breakdown.push({ item: 'Standard Service Base', price: 100 });
  }

  const total = Math.max(0, subtotal - discount);
  return { subtotal, discount, total, breakdown };
};

export const calculateMultiServiceBundle = (
  items: { serviceId: string; config: any }[],
  basePriceOverrides?: Record<string, number>
) => {
  let combinedSubtotal = 0;
  const itemizedServices: { serviceId: string; subtotal: number; breakdown: { item: string; price: number }[] }[] = [];

  for (const item of items) {
    const calc = calculateServicePrice(item.serviceId, item.config, basePriceOverrides);
    combinedSubtotal += calc.subtotal;
    itemizedServices.push({
      serviceId: item.serviceId,
      subtotal: calc.subtotal,
      breakdown: calc.breakdown
    });
  }

  // Multi-service bundle discounts:
  // 10% off 2 services, 15% off 3+ services
  let bundleDiscountPercentage = 0;
  if (items.length >= 3) {
    bundleDiscountPercentage = 0.15;
  } else if (items.length === 2) {
    bundleDiscountPercentage = 0.10;
  }

  const bundleDiscountAmount = Math.round(combinedSubtotal * bundleDiscountPercentage);
  const finalTotal = combinedSubtotal - bundleDiscountAmount;

  return {
    combinedSubtotal,
    bundleDiscountPercentage,
    bundleDiscountAmount,
    finalTotal,
    itemizedServices
  };
};
