export interface StoreProduct {
  name: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  price: number;
  rating: string;
  reviews: number;
  badge: string;
  badgeTone: 'blue' | 'neutral' | 'dark' | 'sky';
  specs: string;
}

export const products: StoreProduct[] = [
  {
    name: 'Studio One Headphone',
    category: 'Audio & Sound',
    description:
      'Adaptive hybrid noise cancellation and studio-grade, lossless wireless sound.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCK5CacQV6_ODSvb0mB42ylkn0zvGyXUMfGl73BsmcUOGE4WzUJnp_yMnXKedgISGWJot0UjLjmaetFQmnCzr66gFkyurmb91SGbmwa-d8A2jnB3NNbqQrOOtdPmN7aQ6oa_Uyh5NvNv7pCgBU_PuFbqSqNdA0tsYKlKsLYTc8Q62k8wJW1_Zgu_nK3uJiG8jOiRiPkPcVLTclnfXf7g59-a3ojthPJ658VtdWwXmJ7BA-qf-ksSKY88Q',
    imageAlt: 'Matte black and titanium NEXUS Studio One headphones',
    price: 349,
    rating: '4.9',
    reviews: 128,
    badge: 'FLAGSHIP',
    badgeTone: 'blue',
    specs: '40mm Beryllium • 55hr Battery',
  },
  {
    name: 'Mach-64 M.2 Enclosure',
    category: 'Computing',
    description:
      'Passive convective cooling and sustained 3,800 MB/s transfer speeds.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDSpZ6_9VoIDkQ5xrtY6O4vIGG2b9P9UU2VICVy44St8R2olFI9WrEgpiFjdBG33RKRvTP3yDWDpSiOC9kKUsT1uwUgOM8VRHEebmZqpdUT_vusVSFbsxLBhT9TUPDxDLo4aO_1U45oexax7KPmC9RBfQQ_VEm4mA_zjjuTV0xiAVNnPsVAFjd5yW2VizmcsYfGYAAGof0ciZTIXfKBqDJMgUP8vcww7SwnMMY7Hzk6TuPIs2T9DBxz3w',
    imageAlt: 'Machined aluminum Mach-64 NVMe external enclosure',
    price: 129,
    rating: '4.8',
    reviews: 92,
    badge: 'NEW RELEASE',
    badgeTone: 'neutral',
    specs: 'USB4 • 40Gbps Transfer',
  },
  {
    name: 'Horizon 34" Curved Monitor',
    category: 'Displays',
    description:
      '3440 × 1440 resolution with single-cable Thunderbolt 96W power delivery.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCgZPnE8PCbH8INRT6KKXgE0wjf3mvn6W_DPDDBUKdX_t3w9NIGI4X9pC9ZkGoCJ9wytlxLcQOCn7hWAchmqJSr_7aRG34xb4e16EQuP4LnHMbcVWXgD7kxgLnaGRJ3kqsud5j8M24XPAIVY7YjayX7WpS9QjDkFAGlBrQx92Mkyb7Rc3u_-F3IeVdDYDLJdgxxuB7AUvTixCAxrCCDF7aq7jpAkcjAYRO7qXcV13cfIwd9bHRBdu36XQ',
    imageAlt: 'Horizon ultrawide curved studio monitor',
    price: 899,
    rating: '5.0',
    reviews: 310,
    badge: 'BESTSELLER',
    badgeTone: 'dark',
    specs: '165Hz • 99% DCI-P3 Nano-IPS',
  },
  {
    name: 'Haptic Mechanical Keyboard',
    category: 'Accessories',
    description:
      'Silent tactile switches with a hot-swappable, gasket-mounted PCB.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA01ApL55fvdNOqpQyd9P_SGkmgSWILHUcyVQnbzajhAqoc3dGkfEcacrhl1mTvhhhyrp-yqDHkcXSSzjPQ7Rav7rkF09N2u5Xfo0NXbcstmZvC3JaxWyaxCMUrH3Wzyas0JBt-YfOIk_fOPP3UUGwZJVdP6RUiy8EF_zUg1bUfrnLMvbC9KjCiXmsW-UZrAvn5RzZD0tBirWWUE-ASsHZZ_M8AmlHQhM6rkc9wDx8YaNHgPb6LB9rfFA',
    imageAlt: 'Low-profile Haptic mechanical keyboard',
    price: 199,
    rating: '4.9',
    reviews: 245,
    badge: 'STUDIO SERIES',
    badgeTone: 'sky',
    specs: 'Hot-Swap • Gasket Mount',
  },
];

export const categories = [
  {
    name: 'Premium Audio',
    eyebrow: 'Tier 01 • Acoustics',
    description: 'Monitors, open-back studio planars, and discrete DAC modules.',
    units: '14 HARDWARE UNITS',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBRH51k-UFfJWXJCHNPhirypmPoXDHbdNsU3hieOSNHjwu_7Q49CKK3IV7SYwGJHu3gXo3Id_RKcIPPnI98DxCVURUUsN2VeIm7a65nmO3GDKomnEWtQWRbEIbmS0tQSRcpP0qN82sZjRXEKGkZlCPF3Jc8Cpmn99T6ViYXK2ZrQxxnPAhSUjGjDg2tdtEqJ6p0VpW1CUNCkUfS2rOhKLvutx6vQI8zzzfOuBiUABz2UzU37nwewNimqg',
  },
  {
    name: 'Studio Computing',
    eyebrow: 'Tier 02 • Compute',
    description: 'High-bandwidth workstations, NVMe hubs, and thermal chassis.',
    units: '08 HARDWARE UNITS',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA1ddJBHuaPRnRdh-Yh29k1Z3GEaX9XqiQA0U2DM7gaQx8bPoY3nDytIZByU3ASTBWTJlSj4U4aoI2XqP9iUl3gMaJtS2mhD-uXCbSOrBu911BthIXef2pG4WQihwBG_L6RfygyCrrPopBZ9VASjxIyMQNvh3b13K2mJ4H2vluFCoFwPsEHATISVsFHoXSJQ1J9dbMcLkBFmbRX6ylb74XwUA21Y_QIXtxPR_HsLEZ1jjwXRkEGY4LQww',
  },
  {
    name: '4K Ultrawide Displays',
    eyebrow: 'Tier 03 • Visual',
    description: 'Calibrated DCI-P3 panels with an integrated 96W Thunderbolt hub.',
    units: '05 HARDWARE UNITS',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCetNKnND_bbZI-we0o5YU_u5e5X4tCDPCX-4YDS4JF74LsxnjDGvcO0HTl2LVQ2rA_s7T7KS9Tw4OhucqcLq4dYLpmgqB1fCbpeXnj6rqjTslgMxF4ho60ehFkG3SYzVd1QohoZ7vHmSNwBmD8j2fSMYNn9wOBTQ6k96RUT61MfuStKgNt9CpUb-O2mb8PsX-xKtDiFcgPA8pQsmtpoomY7Pmw2ZpIU1tU4lo_pBKvscwH9QnG21xu0A',
  },
  {
    name: 'Desk Setup Accessories',
    eyebrow: 'Tier 04 • Modular',
    description: 'Magnetic routing links, mechanical keys, and solid brass rests.',
    units: '22 HARDWARE UNITS',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDSensA5pUcq3smRpD-mEWwBWapwusr2lUH3sZ6PrbdH1SK3GyzW1ACdKscYFm35yX2oynP85MXh69hBJR6IrfBtPfAz_ZyQObtSyWZF9f0aP0Onxoi6HoaT_CG8nxtlUQTSC2kChxkVp3F3-R9sPWirKcmrGGAE1PuIe4dcI8OnV6Oa773m6fj2hfLeBFZPyzYvXW_xIpaGwvsoTFGJuA-r20XWlXfR-ARvEYd39MAGj1-Bwzgn7ZWkA',
  },
];
