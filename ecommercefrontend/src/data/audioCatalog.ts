import type { StoreProduct } from './storefront';

export interface AudioProduct extends StoreProduct {
  series: string;
  subcategory: string;
  connectivities: string[];
  finishes: string[];
  inStock: boolean;
  noiseCancelling?: boolean;
  stockCount?: number;
}

export const audioProducts: AudioProduct[] = [
  {
    slug: 'studio-one-headphone',
    name: 'NEXUS Studio One',
    category: 'Audio & Acoustics',
    subcategory: 'Over-Ear Monitors',
    description:
      'Closed-back reference monitor featuring a custom acoustic chamber and zero-compression DSP bypass.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuADE_1eNZz-p4QTpEMfOpOzsof294gS7kYk_DMQ2DBA3TN3o3OJI-gyObTR_xDXxFKuyN8XQozaIOvZ4hyxHyvPsunLH55sOSOeJQiC6UvBMre3Q0zDfuFNP5tpVzckZEVRmbNL8tRe3ciX74zx066K1EIh6NajeDa5fl7WW-OyDn-bx8WD5z-7NEeMzi7loKXJkM3dITvysltsI6V96QM5vC1s6tzApQjO3DR1HNgB09gvzRK_keh9eA',
    imageAlt: 'NEXUS Studio One professional over-ear headphones in matte black',
    price: 349,
    rating: '4.9',
    reviews: 428,
    badge: 'FLAGSHIP TIER',
    badgeTone: 'blue',
    specs: '5Hz–48kHz • 32Ω • THD <0.05%',
    series: '01-FLAGSHIP',
    connectivities: ['Bluetooth 5.3 LE Audio', 'USB-C 32-bit Lossless', '3.5mm / 4.4mm Balanced'],
    finishes: ['Matte Black', 'Lunar Silver', 'Raw Aluminum', 'Deep Navy'],
    inStock: true,
    noiseCancelling: false,
  },
  {
    name: 'Aero Wireless ANC',
    category: 'Audio & Acoustics',
    subcategory: 'Over-Ear Monitors',
    description:
      'Hybrid 4-mic active noise cancellation with 48-hour playback and multipoint Bluetooth switching.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDcBqlzD_oJt4Wju_V-B7FhHy_CtxOGqAzcw-_PAtAlsJuTBvxJDM6faKhahvNbnElcYzc1dhqo2z_94_PnTwe-NCSPyB0vMsDtP9rC3nHpVf-Hjzh05akg1drPgwdLvXFAhMecewohzqfNihz2_o6GqGAeLVr1LoeRJKYQf-gpvslr0bHmTMEaOlG2gb4cLCiA4qsfKeTisnQ6f89SpF4G9S2iPcQQRlcsRU2Q7WEliUC4kNAwYMo9_w',
    imageAlt: 'Aero Wireless ANC headphones in lunar silver',
    price: 279,
    rating: '4.8',
    reviews: 186,
    badge: 'ACTIVE NOISE CANCEL',
    badgeTone: 'dark',
    specs: '42dB ANC • 48hr Battery • LDAC',
    series: 'AERO-PORTABLE',
    connectivities: ['Bluetooth 5.3 LE Audio', 'USB-C 32-bit Lossless'],
    finishes: ['Lunar Silver', 'Deep Navy'],
    inStock: true,
    noiseCancelling: true,
    stockCount: 4,
  },
  {
    name: 'Reference Pro Open-Back',
    category: 'Audio & Acoustics',
    subcategory: 'Over-Ear Monitors',
    description:
      'Acoustically transparent stainless grilles for spatial soundstaging and mastering precision.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDItv93ow8MRDT2dV_zku0vGKOYQvsxVUxcYC9mdrEFK4uuHCbHuI4bogCIe0SB93HydrNlR-OzIJOI3lEXG1JxKZW3oIrcSQt49tQUAF3Cb4bx1pw8hqclqBp21jIeocFmCNnjBMy-BgcQMG_g92BdKeKEhrCVZyMDErqgjTMlNZu0ExfX-Y1XDPcjnyNGpc87-_teUOcUOYAOy_i3AzY-dGob9vNKy_CJ_jon-XOtPjnd94yL7plhTQ',
    imageAlt: 'Reference Pro open-back headphones with raw aluminum grille',
    price: 449,
    rating: '4.9',
    reviews: 97,
    badge: 'MASTERING GRADE',
    badgeTone: 'neutral',
    specs: '53mm Planar • 80Ω • Open Acoustic',
    series: 'PRO-MONITOR',
    connectivities: ['3.5mm / 4.4mm Balanced'],
    finishes: ['Raw Aluminum', 'Matte Black'],
    inStock: true,
  },
  {
    name: 'Linear Core DAC Amp',
    category: 'Audio & Acoustics',
    subcategory: 'DAC / Headphone Amps',
    description:
      'Fully balanced dual-mono architecture with 768kHz/32-bit PCM decoding and 4.4mm Pentaconn out.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB13yF4Pf0qwF78TzQTjbJaoHsThV5FhlVDfoMzaAtYG_eIGfc_8PAh4mA4QNvyapEwrOS_BQR10EiM8X0oLxYsOZQVi-2ByTlOjMu_Gsg0k5wS-8aHk5HVc_G8m0kjgZgDrR_aXBnIneycTEpSm8lXJmInLZfDtYGuWDqFY4nmomTAoC1g1NysTZjqMhwHc0J7HN9yGYSbkXNN_buy2KCQ9jiGrfLSNW1z0RGtkYMrFPRFypBDLkkZbQ',
    imageAlt: 'Linear Core DAC amplifier with machined aluminum case and display',
    price: 189,
    rating: '4.8',
    reviews: 73,
    badge: 'LOSSLESS PROCESSING',
    badgeTone: 'blue',
    specs: '32-bit / 768kHz • 1200mW • SNR 128dB',
    series: 'DESK-CORE',
    connectivities: ['USB-C 32-bit Lossless', '3.5mm / 4.4mm Balanced'],
    finishes: ['Matte Black', 'Raw Aluminum'],
    inStock: true,
  },
  {
    name: 'Pod Studio Mic',
    category: 'Audio & Acoustics',
    subcategory: 'Studio Microphones',
    description:
      'Gold-sputtered condenser capsule with dual USB-C/XLR output and magnetic shock suspension.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAx3-UJgPGXG7PeicNJKMols1T8QGX2O_yXrwMARutu13YVkcNPPMW_SznPZqC91jqUgYtMi-LKbPGcDCMnY6NfzvfwTgGNy0tdm2v5ElMa1PCBdn06SI3K9MmhNIAmyB1Y2zNDeLD8aVZVIzlR4l6LqFcF1P3NZerQgIyOOxbZb2thMt8IGP9I8l95zzwjTq-lOkm7a6NNZByuq2Ggshw9RC_CKGO2-ewfaVEYi8hJ21n1YQdxSYvYJQ',
    imageAlt: 'Pod Studio condenser microphone on a minimalist desk stand',
    price: 159,
    rating: '4.7',
    reviews: 59,
    badge: 'BROADCASTING',
    badgeTone: 'neutral',
    specs: 'XLR + USB-C • 24-bit/192kHz',
    series: 'CAPTURE-VOX',
    connectivities: ['USB-C 32-bit Lossless', 'XLR'],
    finishes: ['Matte Black'],
    inStock: true,
  },
  {
    name: 'Spatial Audio Soundbar',
    category: 'Audio & Acoustics',
    subcategory: 'Desktop Speakers',
    description:
      'Compact spatial transducer creating a localized binaural field for non-headphone mixing sessions.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBHkSFIonhKhfhJia46Pd2-wjGWxHdBlbLW1GxoKue91NYXQF32tWuE5g-nwHVKxRn9vsSXbTIGMFEr73jeCYOYDNAWf4i-4GOXHr-e4Cpu5Hg7FkGwK3BdpLWAhUx_QCrF7q0UeLpB-yIAnj3PDE6mnKgQLbYB2_E1HAH_BUh-FEppVsE1RxODk9UGI96iY6kuU7S23Mu_lRe4uX548QWlNtwgOr-9D0s6e0cDW4Txqqw6pztI5j6Rdw',
    imageAlt: 'Spatial Audio Soundbar in a compact monolithic desk design',
    price: 529,
    rating: '4.8',
    reviews: 42,
    badge: 'DOLBY ATMOS BEAM',
    badgeTone: 'dark',
    specs: '7-driver array • 180W • HDMI eARC',
    series: 'DESK-ARRAY',
    connectivities: ['USB-C 32-bit Lossless', 'HDMI eARC'],
    finishes: ['Matte Black', 'Deep Navy'],
    inStock: true,
    stockCount: 2,
  },
  {
    name: 'Acoustic Desk Pads',
    category: 'Audio & Acoustics',
    subcategory: 'Desk & Cable Accessories',
    description:
      'High-density felt and Sorbothane pads dampen desktop reflections and chassis vibration.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBBezkXZOznAiUvQE8QysS9hFpuMZ-fAsJOTZICoVNv__RVpD6M068fscCyd7vCsstJCt_7_BcbineDAsOtxJrzKwfzaBC4wCxlEacS9lGqCTEGnBJ1AzCpchUnWOiMQJyueWjBWRb_cI3IBEme7lx8j4VuY-wJtRGz6Rs6R1I2XDAyUIVETSIlbmy8nDBU2ly5dx9sYIxbTz0hYwdgieEnMAssC_g86vgY5aoJzIkzaBz0Srti9wLU9w',
    imageAlt: 'Layered felt acoustic desk isolation pads under studio audio gear',
    price: 49,
    rating: '4.6',
    reviews: 34,
    badge: 'ISOLATION BASE',
    badgeTone: 'sky',
    specs: '900 × 400mm • 4mm • Water-repellent',
    series: 'ISO-DECK',
    connectivities: [],
    finishes: ['Matte Black', 'Lunar Silver'],
    inStock: true,
  },
  {
    name: 'Titanium Cable 2M',
    category: 'Audio & Acoustics',
    subcategory: 'Desk & Cable Accessories',
    description:
      'Monocrystalline copper braid with interchangeable balanced 4.4mm and 3.5mm gold terminations.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBR_LMWwtgLTQerxyikOIqsvxthMHg1iNL80HbfGwoxv-xsRdymZuf4SmbkqMArjkjW0GOa8SNuJlLKS9WOqVDIVCLzW39q114brHAs9XHOlm5QEIrAGB1B3RN7h3KDJD-Sx0rPa6m2qcevQmm-ntqkIyyOemfanDcCuy2Y68nRg23CZL4MEpW9EpZYJwowyaBivXCEiQlk96IqQzgjtSMFkjZ4zFht68_jZSWCy9MXO-Hbe_dZaeGfnQ',
    imageAlt: 'Two-meter titanium-braided audio cable with modular audio plugs',
    price: 39,
    rating: '4.7',
    reviews: 28,
    badge: 'MODULAR JACK',
    badgeTone: 'neutral',
    specs: '2m • 8-core braid • Swappable plugs',
    series: 'INTERCONNECT',
    connectivities: ['3.5mm / 4.4mm Balanced'],
    finishes: ['Matte Black', 'Raw Aluminum'],
    inStock: true,
  },
];

export const audioSubcategories = [
  'Over-Ear Monitors',
  'DAC / Headphone Amps',
  'Studio Microphones',
  'Desktop Speakers',
  'Desk & Cable Accessories',
];

export const audioConnectivityOptions = [
  'Bluetooth 5.3 LE Audio',
  'USB-C 32-bit Lossless',
  '3.5mm / 4.4mm Balanced',
  'XLR',
  'HDMI eARC',
];

export const audioFinishes = [
  'Matte Black',
  'Lunar Silver',
  'Raw Aluminum',
  'Deep Navy',
];
