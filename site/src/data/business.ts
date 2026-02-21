// ============================================================
// Business Configuration
// ============================================================
// This file defines all core business information used across
// the entire site: headers, footers, SEO meta tags, structured
// data (JSON-LD), contact pages, and more.
//
// Replace every __PLACEHOLDER__ with the real value for this business.
// ============================================================

export interface BusinessHours {
  /** Day(s) label, e.g. "Monday - Friday" or "Saturday" */
  days: string;
  /** Hours label, e.g. "7:00 AM - 6:00 PM" or "Closed" */
  hours: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  /** State abbreviation, e.g. "TX" */
  stateCode: string;
  zip: string;
  /** Full country name, e.g. "United States" */
  country: string;
}

export interface Coordinates {
  /** Latitude as a number, e.g. 30.2672 */
  lat: number;
  /** Longitude as a number, e.g. -97.7431 */
  lng: number;
}

export interface Business {
  // --- Identity ---
  /** Full legal/brand name shown in headers and structured data */
  name: string;
  /** Shorter trading name for tight spaces (mobile header, footer) */
  shortName: string;
  /** One-sentence tagline shown below the logo or in the hero */
  tagline: string;
  /** 1-2 sentence description for SEO meta and OG tags */
  description: string;

  // --- Contact ---
  /** Primary phone number in display format, e.g. "(512) 555-0199" */
  phone: string;
  /** Phone in tel: link format, e.g. "+15125550199" */
  phoneTel: string;
  /** Secondary/after-hours phone (optional, empty string if none) */
  phoneSecondary: string;
  /** Primary email address */
  email: string;

  // --- Location ---
  address: Address;
  coordinates: Coordinates;

  // --- Online Presence ---
  /** Production site URL with no trailing slash, e.g. "https://example.com" */
  siteUrl: string;
  /** Google Business Profile URL (full link) */
  googleBusinessUrl: string;

  // --- Social Media (empty string if the business has no account) ---
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    linkedin: string;
    nextdoor: string;
    yelp: string;
  };

  // --- Credentials ---
  /** State license number displayed in footer and about page */
  licenseNumber: string;
  /** Year the business was founded, e.g. 2005 */
  foundedYear: number;
  /** Brief list of key certifications or memberships */
  certifications: string[];

  // --- Operations ---
  hours: BusinessHours[];
  /** Does the business offer 24/7 emergency service? */
  emergencyService: boolean;
  /** Short emergency call-to-action text, e.g. "24/7 Emergency Service Available" */
  emergencyCta: string;

  // --- Branding ---
  /** Path to the primary logo file relative to /public, e.g. "/images/logo.svg" */
  logo: string;
  /** Path to a white/light version of the logo for dark backgrounds */
  logoWhite: string;
  /** Path to the Open Graph share image (1200x630), e.g. "/images/og-image.jpg" */
  ogImage: string;
}

// ============================================================
// Business Data
// ============================================================
// Replace every __PLACEHOLDER__ value below.
// Strings use __UPPER_SNAKE__ format.
// Numbers and booleans have comments showing the expected type.
// ============================================================

export const business: Business = {
  // --- Identity ---
  name: 'Канальні',
  shortName: 'Канальні',
  tagline: 'Канальне кондиціювання в Івано-Франківську',
  description: "Канальне кондиціювання в Івано-Франківську. Проектування, монтаж та обслуговування. Підберемо перевірених підрядників та надамо пропозицію чи декілька безкоштовно.",

  // --- Contact ---
  phone: '',
  phoneTel: '',
  phoneSecondary: '',
  email: 'info@kanalni.if.ua',

  // --- Location ---
  address: {
    street: '',
    city: 'Івано-Франківськ',
    state: 'Івано-Франківська область',
    stateCode: 'IF',
    zip: '76000',
    country: 'Україна',
  },
  coordinates: {
    lat: 48.9226,
    lng: 24.7111,
  },

  // --- Online Presence ---
  siteUrl: 'https://kanalni.if.ua',
  googleBusinessUrl: '',

  // --- Social Media ---
  socialMedia: {
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    linkedin: '',
    nextdoor: '',
    yelp: '',
  },

  // --- Credentials ---
  licenseNumber: '',
  foundedYear: 2025,
  certifications: [],

  // --- Operations ---
  hours: [
    { days: 'Понеділок - П\'ятниця', hours: '09:00 - 18:00' },
    { days: 'Субота', hours: '10:00 - 15:00' },
    { days: 'Неділя', hours: 'Вихідний' },
  ],
  emergencyService: false,
  emergencyCta: '',

  // --- Branding ---
  logo: '/images/logo.svg',
  logoWhite: '/images/logo-white.svg',
  ogImage: '/images/og-image.jpg',
};

// ============================================================
// Helper Functions
// ============================================================

/**
 * Calculate years in business from the founded year.
 * Useful for "Over X years of experience" copy.
 */
export function yearsInBusiness(): number {
  return new Date().getFullYear() - business.foundedYear;
}
