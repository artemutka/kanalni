// ============================================================
// Service Types Configuration
// ============================================================
// Each service type defines a core offering the business provides.
// These generate:
//   - /services/[service]/ pages (main service pages)
//   - /services/[area]/[service]/ pages (localized service pages)
//   - Navigation menus, internal links, and structured data
//
// Populate the serviceTypes array with one entry per service.
// The slug must be URL-safe (lowercase, hyphens, no spaces).
// ============================================================

export interface ProcessStep {
  /** Step title, e.g. "Inspection" */
  title: string;
  /** Brief description of what happens in this step */
  description: string;
}

export interface PriceRange {
  /** Service tier or item name, e.g. "Basic Drain Cleaning" */
  label: string;
  /** Low end of the range in dollars, e.g. 99 */
  min: number;
  /** High end of the range in dollars, e.g. 249 */
  max: number;
  /** Optional unit, e.g. "per visit", "per linear foot" */
  unit?: string;
}

export interface ServiceType {
  /** URL-safe identifier, e.g. "drain-cleaning" */
  slug: string;
  /** Display name, e.g. "Drain Cleaning" */
  name: string;
  /** Short name for navigation and breadcrumbs (if different from name) */
  shortName: string;
  /** 1-2 sentence summary for cards, meta descriptions, and previews */
  description: string;
  /**
   * Path to the hero/featured image for this service.
   * Relative to /public, e.g. "/images/services/drain-cleaning.webp".
   * The agent should generate or source an appropriate image and
   * place it in /public/images/services/.
   */
  image: string;
  /** Lucide icon name for UI cards, e.g. "droplets" */
  icon: string;
  /** Is this an emergency/urgent service? (affects display priority) */
  emergency: boolean;
  /** Is this a featured service? (shown on homepage) */
  featured: boolean;
  /** Ordered steps the customer can expect */
  process: ProcessStep[];
  /** Typical price ranges (used for transparency sections) */
  priceRanges: PriceRange[];
  /** Keywords for internal SEO (not shown to users) */
  keywords: string[];
  /** Related service slugs for cross-linking */
  relatedServices: string[];
}

// ============================================================
// Service Types Data
// ============================================================
// Add one object per service the business offers.
// Example entry (uncomment and duplicate as needed):
//
// {
//   slug: 'drain-cleaning',
//   name: 'Drain Cleaning',
//   shortName: 'Drains',
//   description: 'Professional drain cleaning services to clear clogs and restore flow. We handle kitchen sinks, showers, and main sewer lines.',
//   image: '/images/services/drain-cleaning.webp',
//   icon: 'droplets',
//   emergency: true,
//   featured: true,
//   process: [
//     { title: 'Inspection', description: 'Camera inspection to locate the blockage.' },
//     { title: 'Clearing', description: 'High-pressure hydro jetting or mechanical snaking.' },
//     { title: 'Testing', description: 'Flow test to confirm the drain is fully cleared.' },
//     { title: 'Prevention', description: 'Recommendations to prevent future clogs.' },
//   ],
//   priceRanges: [
//     { label: 'Simple Drain Clearing', min: 99, max: 199, unit: 'per drain' },
//     { label: 'Hydro Jetting', min: 350, max: 600 },
//     { label: 'Main Sewer Line', min: 200, max: 500 },
//   ],
//   keywords: ['drain cleaning', 'clogged drain', 'hydro jetting', 'sewer cleaning'],
//   relatedServices: ['sewer-repair', 'water-heater-repair'],
// },
// ============================================================

export const serviceTypes: ServiceType[] = [
  {
    slug: 'montazh-kanalnoho-kondycionera',
    name: 'Монтаж канального кондиціонера',
    shortName: 'Монтаж',
    description:
      'Професійний монтаж канальних кондиціонерів під ключ. Від розведення повітроводів до підключення внутрішнього блоку та пусконалагоджувальних робіт.',
    image: '/images/services/montazh-kanalnoho-kondycionera.png',
    icon: 'lucide:wrench',
    emergency: false,
    featured: true,
    process: [
      {
        title: 'Виїзд та замір',
        description:
          'Спеціаліст оцінює приміщення, розташування комунікацій та визначає оптимальне місце для блоків.',
      },
      {
        title: 'Монтаж повітроводів',
        description:
          'Прокладка гнучких або жорстких повітроводів по стелі до чистового оздоблення.',
      },
      {
        title: 'Встановлення блоків',
        description:
          'Монтаж внутрішнього канального блоку та зовнішнього конденсатора. Підключення фреонової траси та дренажу.',
      },
      {
        title: 'Пусконалагодження',
        description:
          'Вакуумування системи, заправка фреоном, тестування всіх режимів роботи та балансування повітряних потоків.',
      },
    ],
    priceRanges: [
      { label: 'Монтаж канальника 3.5-5 кВт', min: 15000, max: 25000, unit: 'грн' },
      { label: 'Монтаж канальника 7-10 кВт', min: 25000, max: 40000, unit: 'грн' },
      { label: 'Монтаж канальника 12+ кВт', min: 40000, max: 65000, unit: 'грн' },
    ],
    keywords: [
      'монтаж канального кондиціонера',
      'встановлення канального кондиціонера',
      'монтаж канальника',
      'установка канального кондиціонера',
    ],
    relatedServices: [
      'proektuvannya-kondyciyuvannya',
      'montazh-ventylyaciyi',
      'kanalne-kondyciyuvannya-kvartyr',
    ],
  },
  {
    slug: 'proektuvannya-kondyciyuvannya',
    name: 'Проектування систем кондиціювання',
    shortName: 'Проектування',
    description:
      "Професійне проектування систем канального кондиціювання з урахуванням планування, теплових навантажень та естетичних вимог до інтер'єру.",
    image: '/images/services/proektuvannya-kondyciyuvannya.png',
    icon: 'lucide:drafting-compass',
    emergency: false,
    featured: true,
    process: [
      {
        title: 'Аналіз об\'єкта',
        description:
          'Вивчення планування приміщень, теплових навантажень, розташування вікон та орієнтації будівлі.',
      },
      {
        title: 'Розрахунок потужності',
        description:
          'Підбір обладнання за холодо/теплопродуктивністю з урахуванням кліматичних умов Прикарпаття.',
      },
      {
        title: 'Схема розведення',
        description:
          'Проектування траси повітроводів, розташування решіток та дифузорів для рівномірного розподілу повітря.',
      },
      {
        title: 'Кошторис та специфікація',
        description:
          'Детальний кошторис з переліком обладнання, матеріалів та робіт. Підбір оптимального бренду під бюджет.',
      },
    ],
    priceRanges: [
      { label: 'Проект для квартири', min: 3000, max: 8000, unit: 'грн' },
      { label: 'Проект для будинку', min: 8000, max: 15000, unit: 'грн' },
      { label: 'Проект для комерційного об\'єкта', min: 15000, max: 30000, unit: 'грн' },
    ],
    keywords: [
      'проектування кондиціювання',
      'проект вентиляції',
      'проектування канального кондиціювання',
      'розрахунок кондиціонера',
    ],
    relatedServices: [
      'montazh-kanalnoho-kondycionera',
      'montazh-ventylyaciyi',
      'konsultaciya',
    ],
  },
  {
    slug: 'montazh-ventylyaciyi',
    name: 'Монтаж вентиляції',
    shortName: 'Вентиляція',
    description:
      'Монтаж припливно-витяжної вентиляції для забезпечення свіжого повітря у приміщенні. Канальні системи дозволяють інтегрувати вентиляцію з кондиціюванням.',
    image: '/images/services/montazh-ventylyaciyi.png',
    icon: 'lucide:wind',
    emergency: false,
    featured: true,
    process: [
      {
        title: 'Обстеження',
        description:
          'Оцінка існуючої вентиляції, визначення потреби у свіжому повітрі та точок припливу/витяжки.',
      },
      {
        title: 'Проектування',
        description:
          'Розробка схеми вентиляційних каналів з урахуванням норм повітрообміну та шумових характеристик.',
      },
      {
        title: 'Монтаж каналів',
        description:
          'Прокладка повітроводів, встановлення вентиляційного обладнання, клапанів та фільтрів.',
      },
      {
        title: 'Балансування',
        description:
          'Налаштування повітряних потоків для рівномірного розподілу повітря по всіх приміщеннях.',
      },
    ],
    priceRanges: [
      { label: 'Вентиляція квартири', min: 20000, max: 45000, unit: 'грн' },
      { label: 'Вентиляція будинку', min: 40000, max: 80000, unit: 'грн' },
      { label: 'Рекуператор + монтаж', min: 25000, max: 55000, unit: 'грн' },
    ],
    keywords: [
      'монтаж вентиляції',
      'припливна вентиляція',
      'вентиляція квартири',
      'припливно-витяжна вентиляція',
    ],
    relatedServices: [
      'proektuvannya-kondyciyuvannya',
      'montazh-kanalnoho-kondycionera',
      'kanalne-kondyciyuvannya-budynkiv',
    ],
  },
  {
    slug: 'obsluhovuvannya',
    name: 'Обслуговування та сервіс',
    shortName: 'Сервіс',
    description:
      'Регулярне обслуговування канальних систем кондиціювання: чистка фільтрів, перевірка фреону, дезінфекція повітроводів та діагностика обладнання.',
    image: '/images/services/obsluhovuvannya.png',
    icon: 'lucide:settings',
    emergency: false,
    featured: false,
    process: [
      {
        title: 'Діагностика',
        description:
          "Перевірка тиску фреону, електричних з'єднань, стану компресора та температурних показників.",
      },
      {
        title: 'Чистка',
        description:
          'Промивка фільтрів, чистка теплообмінників внутрішнього та зовнішнього блоків.',
      },
      {
        title: 'Дезінфекція',
        description:
          'Антибактеріальна обробка повітроводів та внутрішнього блоку для чистого повітря в приміщенні.',
      },
      {
        title: 'Звіт',
        description:
          'Надання звіту про стан системи та рекомендацій щодо подальшого обслуговування.',
      },
    ],
    priceRanges: [
      { label: 'Разове ТО', min: 1500, max: 3000, unit: 'грн' },
      { label: 'Річний контракт', min: 5000, max: 10000, unit: 'грн/рік' },
      { label: 'Чистка повітроводів', min: 3000, max: 8000, unit: 'грн' },
    ],
    keywords: [
      'обслуговування кондиціонера',
      'чистка кондиціонера',
      'сервіс кондиціонера',
      'ТО кондиціонера',
    ],
    relatedServices: ['montazh-kanalnoho-kondycionera', 'konsultaciya'],
  },
  {
    slug: 'kanalne-kondyciyuvannya-kvartyr',
    name: 'Канальне кондиціювання квартир',
    shortName: 'Для квартир',
    description:
      'Приховане канальне кондиціювання для квартир в Івано-Франківську. Жодних блоків на стінах, рівномірне охолодження всіх кімнат через систему повітроводів у стелі.',
    image: '/images/services/kanalne-kondyciyuvannya-kvartyr.png',
    icon: 'lucide:building',
    emergency: false,
    featured: true,
    process: [
      {
        title: 'Консультація',
        description:
          'Аналіз планування квартири, визначення кількості зон кондиціювання та місця для внутрішнього блоку.',
      },
      {
        title: 'Проектування',
        description:
          'Створення проекту з урахуванням висоти стель, розташування меблів та дизайну інтер\'єру.',
      },
      {
        title: 'Монтаж',
        description:
          'Встановлення системи до чистового ремонту: повітроводи, блок, дренаж, електрика.',
      },
      {
        title: 'Здача',
        description:
          'Пусконалагодження, інструктаж з користування та гарантійні документи.',
      },
    ],
    priceRanges: [
      { label: 'Квартира 50-80 м\u00B2', min: 80000, max: 130000, unit: 'грн під ключ' },
      { label: 'Квартира 80-120 м\u00B2', min: 120000, max: 180000, unit: 'грн під ключ' },
      { label: 'Квартира 120+ м\u00B2', min: 170000, max: 250000, unit: 'грн під ключ' },
    ],
    keywords: [
      'канальний кондиціонер для квартири',
      'кондиціювання квартири',
      'приховане кондиціювання квартири',
      'канальне кондиціювання квартири',
    ],
    relatedServices: [
      'proektuvannya-kondyciyuvannya',
      'montazh-kanalnoho-kondycionera',
      'kanalne-kondyciyuvannya-budynkiv',
    ],
  },
  {
    slug: 'kanalne-kondyciyuvannya-budynkiv',
    name: 'Канальне кондиціювання будинків',
    shortName: 'Для будинків',
    description:
      'Комплексне канальне кондиціювання приватних будинків. Одна зовнішня установка замість 5-7 спліт-систем. Інтеграція з вентиляцією та опаленням.',
    image: '/images/services/kanalne-kondyciyuvannya-budynkiv.png',
    icon: 'lucide:house',
    emergency: false,
    featured: true,
    process: [
      {
        title: 'Виїзд на об\'єкт',
        description:
          'Огляд будинку, аналіз проекту, визначення оптимального обладнання та схеми розведення.',
      },
      {
        title: 'Комплексний проект',
        description:
          'Проектування кондиціювання разом з вентиляцією. Підбір мультизональної або канальної системи.',
      },
      {
        title: 'Поетапний монтаж',
        description:
          'Чорновий монтаж на етапі будівництва, чистовий після оздоблення. Мінімум впливу на ремонт.',
      },
      {
        title: 'Інтеграція та здача',
        description:
          'Налаштування автоматики, підключення до системи розумного дому, тестування всіх зон.',
      },
    ],
    priceRanges: [
      { label: 'Будинок 100-150 м\u00B2', min: 150000, max: 250000, unit: 'грн під ключ' },
      { label: 'Будинок 150-250 м\u00B2', min: 250000, max: 400000, unit: 'грн під ключ' },
      { label: 'Будинок 250+ м\u00B2', min: 350000, max: 600000, unit: 'грн під ключ' },
    ],
    keywords: [
      'кондиціювання будинку',
      'кондиціювання приватного будинку',
      'канальне кондиціювання будинку',
      'система кондиціювання для будинку',
    ],
    relatedServices: [
      'proektuvannya-kondyciyuvannya',
      'montazh-ventylyaciyi',
      'kanalne-kondyciyuvannya-kvartyr',
    ],
  },
  {
    slug: 'kanalne-kondyciyuvannya-ofisiv',
    name: 'Канальне кондиціювання офісів',
    shortName: 'Для офісів',
    description:
      'Канальне кондиціювання комерційних приміщень та офісів в Івано-Франківську. Тихе, ефективне охолодження без видимих блоків на стінах.',
    image: '/images/services/kanalne-kondyciyuvannya-ofisiv.png',
    icon: 'lucide:briefcase',
    emergency: false,
    featured: false,
    process: [
      {
        title: 'Аудит приміщення',
        description:
          'Оцінка площі, кількості робочих місць, тепловиділення обладнання та вимог до мікроклімату.',
      },
      {
        title: 'Проектування',
        description:
          'Розробка системи з урахуванням зонування, графіку роботи та енергоефективності.',
      },
      {
        title: 'Монтаж',
        description:
          'Встановлення в неробочий час або поетапно для мінімізації впливу на роботу офісу.',
      },
      {
        title: 'Автоматизація',
        description:
          'Налаштування автоматичного управління зонами, таймерів та інтеграції з BMS.',
      },
    ],
    priceRanges: [
      { label: 'Офіс 50-100 м\u00B2', min: 80000, max: 150000, unit: 'грн' },
      { label: 'Офіс 100-300 м\u00B2', min: 150000, max: 350000, unit: 'грн' },
      { label: 'Комерційне приміщення 300+ м\u00B2', min: 300000, max: 700000, unit: 'грн' },
    ],
    keywords: [
      'кондиціювання офісу',
      'кондиціонер для офісу',
      'канальне кондиціювання офісу',
      'промислове кондиціювання',
    ],
    relatedServices: [
      'proektuvannya-kondyciyuvannya',
      'montazh-kanalnoho-kondycionera',
      'obsluhovuvannya',
    ],
  },
  {
    slug: 'konsultaciya',
    name: 'Безкоштовна консультація',
    shortName: 'Консультація',
    description:
      'Безкоштовна консультація з підбору канальної системи кондиціювання. Допоможемо визначити оптимальне рішення та орієнтовний бюджет для вашого об\'єкта.',
    image: '/images/services/konsultaciya.png',
    icon: 'lucide:message-circle',
    emergency: false,
    featured: false,
    process: [
      {
        title: 'Заявка',
        description:
          'Заповніть форму на сайті або зателефонуйте. Опишіть ваш об\'єкт та побажання.',
      },
      {
        title: 'Попередній аналіз',
        description:
          'Спеціаліст проаналізує інформацію та підготує попередні варіанти рішень.',
      },
      {
        title: 'Консультація',
        description:
          'Детальне обговорення варіантів, відповіді на питання, орієнтовний кошторис.',
      },
      {
        title: 'Підбір підрядника',
        description:
          'Підберемо перевіреного підрядника з досвідом канального кондиціювання у вашому районі.',
      },
    ],
    priceRanges: [
      { label: 'Консультація', min: 0, max: 0, unit: 'безкоштовно' },
    ],
    keywords: [
      'консультація кондиціювання',
      'підбір кондиціонера',
      'розрахунок кондиціонера',
    ],
    relatedServices: [
      'proektuvannya-kondyciyuvannya',
      'kanalne-kondyciyuvannya-kvartyr',
      'kanalne-kondyciyuvannya-budynkiv',
    ],
  },
];

// ============================================================
// Helper Functions
// ============================================================

/**
 * Find a service type by its URL slug.
 * Returns undefined if the slug does not match any service.
 */
export function getServiceBySlug(slug: string): ServiceType | undefined {
  return serviceTypes.find((service) => service.slug === slug);
}

/**
 * Get the display name for a service slug.
 * Returns the slug (title-cased) as a fallback if the service is not found.
 */
export function getServiceName(slug: string): string {
  const service = getServiceBySlug(slug);
  if (service) return service.name;
  // Fallback: convert slug to title case
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get all services marked as emergency.
 * Useful for emergency banners and priority display.
 */
export function getEmergencyServices(): ServiceType[] {
  return serviceTypes.filter((service) => service.emergency);
}

/**
 * Get only featured services (for homepage or nav highlights).
 */
export function getFeaturedServices(): ServiceType[] {
  return serviceTypes.filter((service) => service.featured);
}

/**
 * Get related services for a given service slug.
 * Returns the full ServiceType objects, not just slugs.
 */
export function getRelatedServices(slug: string): ServiceType[] {
  const service = getServiceBySlug(slug);
  if (!service) return [];
  return service.relatedServices
    .map((relatedSlug) => getServiceBySlug(relatedSlug))
    .filter((s): s is ServiceType => s !== undefined);
}
