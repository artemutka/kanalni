// ============================================================
// Service Areas Configuration
// ============================================================
// Each service area represents a city, neighborhood, or region
// the business serves. These generate:
//   - /areas/[area]/ pages (area landing pages)
//   - /services/[area]/[service]/ pages (area + service combos)
//   - Internal links, breadcrumbs, and structured data
//
// Populate the serviceAreas array with one entry per area.
// The slug must be URL-safe (lowercase, hyphens, no spaces).
// ============================================================

export interface ServiceArea {
  /** URL-safe identifier, e.g. "north-austin" */
  slug: string;
  /** Display name, e.g. "North Austin" */
  name: string;
  /** Locative case name (Місцевий відмінок) with preposition, e.g. "в Пасічній", "в Угорниках" */
  locativeName: string;
  /** Type of area for accurate prefixes, e.g. "мікрорайон", "село" */
  areaType: string;
  /** County or broader region name for grouping */
  county: string;
  /** State abbreviation, e.g. "TX" */
  state: string;
  /** Full ZIP codes served in this area */
  zipCodes: string[];
  /** Approximate population (used for page copy, 0 if unknown) */
  population: number;
  /** Latitude of the area center */
  lat: number;
  /** Longitude of the area center */
  lng: number;
  /** Brief 1-2 sentence description for SEO meta tags */
  description: string;
  /** Is this a primary/featured service area? (shown on homepage) */
  featured: boolean;
  /** Slugs of neighboring areas for "Nearby Areas" links */
  nearby: string[];
}

// ============================================================
// Service Areas Data
// ============================================================
// Add one object per area the business serves.
// Example entry (uncomment and duplicate as needed):
//
// {
//   slug: 'north-austin',
//   name: 'North Austin',
//   county: 'Travis County',
//   state: 'TX',
//   zipCodes: ['78758', '78759', '78727'],
//   population: 125000,
//   lat: 30.3940,
//   lng: -97.7428,
//   description: 'Professional plumbing services in North Austin, TX. Fast response times for 78758, 78759, and surrounding zip codes.',
//   featured: true,
//   nearby: ['round-rock', 'cedar-park', 'central-austin'],
// },
// ============================================================

export const serviceAreas: ServiceArea[] = [
  {
    slug: 'centr',
    name: 'Центр',
    locativeName: 'в Центрі',
    areaType: 'мікрорайон',
    county: 'Івано-Франківська область',
    state: 'IF',
    zipCodes: ['76000', '76002', '76003'],
    population: 45000,
    lat: 48.9226,
    lng: 24.7111,
    description:
      'Центральна частина Івано-Франківська з новобудовами та історичною забудовою. Канальне кондиціювання ідеально підходить для сучасних квартир преміум-класу в центрі міста.',
    featured: true,
    nearby: ['pasichna', 'kaskad', 'uhornyky'],
  },
  {
    slug: 'pasichna',
    name: 'Пасічна',
    locativeName: 'в Пасічній',
    areaType: 'мікрорайон',
    county: 'Івано-Франківська область',
    state: 'IF',
    zipCodes: ['76006', '76014'],
    population: 50000,
    lat: 48.905,
    lng: 24.735,
    description:
      'Найбільший житловий масив Івано-Франківська з численними новобудовами. Ідеальний район для встановлення канальних систем кондиціювання на етапі ремонту.',
    featured: true,
    nearby: ['centr', 'kaskad', 'krykhivci'],
  },
  {
    slug: 'kaskad',
    name: 'Каскад',
    locativeName: 'на Каскаді',
    areaType: 'мікрорайон',
    county: 'Івано-Франківська область',
    state: 'IF',
    zipCodes: ['76007'],
    population: 25000,
    lat: 48.91,
    lng: 24.69,
    description:
      'Мікрорайон Каскад з переважно багатоповерховою забудовою. Канальні кондиціонери дозволяють зберегти естетику фасадів та інтер\u2019єрів.',
    featured: true,
    nearby: ['centr', 'pasichna', 'vovchynec'],
  },
  {
    slug: 'uhornyky',
    name: 'Угорники',
    locativeName: 'в Угорниках',
    areaType: 'село',
    county: 'Івано-Франківська область',
    state: 'IF',
    zipCodes: ['76008'],
    population: 15000,
    lat: 48.94,
    lng: 24.72,
    description:
      'Район з активною забудовою приватного сектору та таунхаусів. Канальне кондиціювання для приватних будинків в Угорниках.',
    featured: false,
    nearby: ['centr', 'krykhivci', 'opryshivci'],
  },
  {
    slug: 'krykhivci',
    name: 'Крихівці',
    locativeName: 'в Крихівцях',
    areaType: 'село',
    county: 'Івано-Франківська область',
    state: 'IF',
    zipCodes: ['76009'],
    population: 12000,
    lat: 48.895,
    lng: 24.75,
    description:
      'Передмістя з новою котеджною забудовою. Приватні будинки в Крихівцях ідеально підходять для проектування канальних систем з нуля.',
    featured: false,
    nearby: ['pasichna', 'uhornyky', 'khryplyn'],
  },
  {
    slug: 'opryshivci',
    name: 'Опришівці',
    locativeName: 'в Опришівцях',
    areaType: 'мікрорайон',
    county: 'Івано-Франківська область',
    state: 'IF',
    zipCodes: ['76010'],
    population: 8000,
    lat: 48.95,
    lng: 24.68,
    description:
      'Село-супутник з активним будівництвом приватних будинків. Канальне кондиціювання для новобудов в Опришівцях.',
    featured: false,
    nearby: ['uhornyky', 'vovchynec', 'mykytynici'],
  },
  {
    slug: 'vovchynec',
    name: 'Вовчинець',
    locativeName: 'у Вовчинці',
    areaType: 'село',
    county: 'Івано-Франківська область',
    state: 'IF',
    zipCodes: ['76011'],
    population: 10000,
    lat: 48.915,
    lng: 24.66,
    description:
      'Район на заході Івано-Франківська. Канальне кондиціювання для квартир та будинків у Вовчинці.',
    featured: false,
    nearby: ['kaskad', 'opryshivci', 'drahomyrchany'],
  },
  {
    slug: 'khryplyn',
    name: 'Хриплин',
    locativeName: 'в Хриплині',
    areaType: 'село',
    county: 'Івано-Франківська область',
    state: 'IF',
    zipCodes: ['76012'],
    population: 6000,
    lat: 48.88,
    lng: 24.76,
    description:
      'Передмістя з переважно приватною забудовою. Проектування канального кондиціювання на етапі будівництва будинку.',
    featured: false,
    nearby: ['krykhivci', 'pasichna', 'mykytynici'],
  },
  {
    slug: 'mykytynici',
    name: 'Микитинці',
    locativeName: 'в Микитинцях',
    areaType: 'село',
    county: 'Івано-Франківська область',
    state: 'IF',
    zipCodes: ['76013'],
    population: 5000,
    lat: 48.87,
    lng: 24.69,
    description:
      'Село на півдні Івано-Франківська з новою приватною забудовою та котеджними містечками.',
    featured: false,
    nearby: ['khryplyn', 'opryshivci', 'drahomyrchany'],
  },
  {
    slug: 'drahomyrchany',
    name: 'Драгомирчани',
    locativeName: 'в Драгомирчанах',
    areaType: 'село',
    county: 'Івано-Франківська область',
    state: 'IF',
    zipCodes: ['76015'],
    population: 4000,
    lat: 48.89,
    lng: 24.65,
    description:
      'Село-супутник з активним котеджним будівництвом. Канальне кондиціювання під ключ для приватних будинків.',
    featured: false,
    nearby: ['vovchynec', 'mykytynici', 'kaskad'],
  },
];

// ============================================================
// Helper Functions
// ============================================================

/**
 * Find a service area by its URL slug.
 * Returns undefined if the slug does not match any area.
 */
export function getAreaBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}

/**
 * Get nearby service areas for a given area slug.
 * Returns the full ServiceArea objects, not just slugs.
 * Useful for "We also serve" sections on area pages.
 */
export function getNearbyAreas(slug: string): ServiceArea[] {
  const area = getAreaBySlug(slug);
  if (!area) return [];
  return area.nearby
    .map((nearbySlug) => getAreaBySlug(nearbySlug))
    .filter((a): a is ServiceArea => a !== undefined);
}

/**
 * Get the display name for an area slug.
 * Returns the slug (title-cased) as a fallback if the area is not found.
 */
export function getAreaName(slug: string): string {
  const area = getAreaBySlug(slug);
  if (area) return area.name;
  // Fallback: convert slug to title case
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get only featured areas (for homepage or nav highlights).
 */
export function getFeaturedAreas(): ServiceArea[] {
  return serviceAreas.filter((area) => area.featured);
}

/**
 * Get all unique counties across service areas.
 * Useful for grouping areas by county in navigation.
 */
export function getCounties(): string[] {
  return [...new Set(serviceAreas.map((area) => area.county))];
}
