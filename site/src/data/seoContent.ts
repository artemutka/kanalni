// ============================================================
// SEO Content: FAQs & Reviews
// ============================================================
// This file provides FAQ and review content used across service
// pages, area pages, and the homepage for SEO-rich structured data.
//
// The generateFaqs() function produces page-specific FAQ sets
// by combining universal FAQs with service- or area-specific ones.
// ============================================================

export interface FaqItem {
  /** The question (shown as the FAQ heading) */
  question: string;
  /** The answer (shown as the FAQ body, supports basic HTML) */
  answer: string;
}

export interface Review {
  /** Reviewer's full name */
  author: string;
  /** Star rating from 1 to 5 */
  rating: number;
  /** The review text */
  text: string;
  /** Date string, e.g. "2024-11-15" (ISO format for structured data) */
  date: string;
  /** Which service this review relates to (service slug) */
  service?: string;
  /** Which area this review relates to (area slug) */
  area?: string;
  /** Source platform, e.g. "Google", "Yelp" */
  source: string;
  /** Avatar image path representing the author's face */
  avatar?: string;
}

// ============================================================
// FAQ Generation
// ============================================================
// Returns an array of FAQs appropriate for the given context.
// Pass a service slug, area slug, or both for more specific FAQs.
// With no arguments, returns the universal/homepage FAQ set.
// ============================================================

/**
 * Generate contextual FAQs for a page.
 * @param service - Optional service slug for service-specific FAQs
 * @param area    - Optional area name (display name, not slug) for localized FAQs
 */
export function generateFaqs(service?: string, area?: string): FaqItem[] {
  // --- Universal FAQs (appear on every page) ---
  const universal: FaqItem[] = [
    {
      question: 'Чи працює Канальні з ліцензованими підрядниками?',
      answer:
        'Так. Ми співпрацюємо виключно з перевіреними монтажними бригадами Івано-Франківська, які мають досвід роботи з канальними системами кондиціювання та відповідні ліцензії.',
    },
    {
      question: 'Які райони Івано-Франківська ви обслуговуєте?',
      answer:
        'Ми підбираємо підрядників у всіх районах Івано-Франківська: Центр, Пасічна, Каскад, Угорники, Крихівці та інші. Перегляньте <a href="/areas/">повний список районів</a>.',
    },
    {
      question: 'Консультація дійсно безкоштовна?',
      answer: "Ні, наші послуги абсолютно безкоштовні для клієнтів. Ви заповнюєте заявку, іноді ми задаємо кілька уточнюючих питань телефоном, після чого ви отримуєте пропозицію чи декілька від перевірених підрядників.",
    },
    {
      question: 'Чим канальний кондиціонер кращий за звичайний спліт?',
      answer:
        'Канальна система повністю прихована в стелі: жодних блоків на стінах, рівномірний розподіл повітря по всіх кімнатах, тихіша робота. Одна зовнішня установка замість декількох, що зберігає фасад будівлі.',
    },
    {
      question: 'Коли найкраще встановлювати канальний кондиціонер?',
      answer:
        'Оптимальний час: на етапі чорнового ремонту або будівництва, до оздоблення стель. Це дозволяє прокласти повітроводи та комунікації без пошкодження чистового ремонту.',
    },
  ];

  // --- Service-Specific FAQs ---
  // Keyed by service slug. These appear on /services/[service]/ pages.
  const serviceFaqs: Record<string, FaqItem[]> = {
    'montazh-kanalnoho-kondycionera': [
      {
        question: 'Скільки коштує монтаж канального кондиціонера в Івано-Франківську?',
        answer:
          'Вартість монтажу залежить від потужності та складності: від 15 000 грн для невеликих систем до 65 000 грн для потужних. Отримайте точний кошторис, заповнивши форму на сайті.',
      },
      {
        question: 'Скільки часу займає монтаж канального кондиціонера?',
        answer:
          'Монтаж канальної системи для квартири займає 2-4 дні, для будинку 4-7 днів. Термін залежить від складності розведення повітроводів та готовності приміщення.',
      },
    ],
    'proektuvannya-kondyciyuvannya': [
      {
        question: 'Навіщо потрібен проект кондиціювання?',
        answer:
          'Проект забезпечує правильний підбір обладнання за потужністю, оптимальне розведення повітроводів та рівномірне охолодження всіх зон. Без проекту є ризик переплати за зайву потужність або недостатнього охолодження.',
      },
      {
        question: 'Що входить в проект кондиціювання?',
        answer:
          'Розрахунок теплових навантажень, підбір обладнання, схема розведення повітроводів, розташування решіток та дифузорів, специфікація матеріалів та кошторис.',
      },
    ],
    'kanalne-kondyciyuvannya-kvartyr': [
      {
        question: 'Чи можна встановити канальний кондиціонер у квартирі з низькими стелями?',
        answer:
          'Так, сучасні канальні блоки мають висоту від 200 мм. При стелях 2.7 м і вище канальна система встановлюється без проблем. Для стель 2.5-2.6 м використовуються компактні моделі.',
      },
      {
        question: 'Скільки коштує канальне кондиціювання квартири під ключ?',
        answer:
          'Вартість для квартири 50-80 м\u00B2 складає 80 000-130 000 грн, для 80-120 м\u00B2 від 120 000 до 180 000 грн. Ціна включає обладнання, матеріали та монтажні роботи.',
      },
    ],
    'kanalne-kondyciyuvannya-budynkiv': [
      {
        question: 'Скільки зон можна зробити в приватному будинку?',
        answer:
          'Канальна система дозволяє створити окремі зони для кожної кімнати або групи кімнат. Для будинку 150-200 м\u00B2 зазвичай проектують 4-6 зон з індивідуальним регулюванням.',
      },
      {
        question: 'Чи можна поєднати кондиціювання з вентиляцією?',
        answer:
          'Так, це одна з головних переваг канальних систем. Повітроводи використовуються як для охолодження/обігріву, так і для подачі свіжого повітря з вулиці через рекуператор.',
      },
    ],
    'montazh-ventylyaciyi': [
      {
        question: 'Чи потрібна вентиляція якщо вже є кондиціонер?',
        answer:
          'Так. Кондиціонер охолоджує повітря, але не подає свіже з вулиці. Для здорового мікроклімату потрібна припливно-витяжна вентиляція, яка забезпечує повітрообмін.',
      },
      {
        question: 'Що таке рекуператор і навіщо він?',
        answer:
          'Рекуператор — це пристрій, що подає свіже повітря з вулиці, одночасно зберігаючи тепло (або прохолоду) приміщення. Економія на опаленні/кондиціюванні до 70%.',
      },
    ],
    'obsluhovuvannya': [
      {
        question: 'Як часто потрібно обслуговувати канальний кондиціонер?',
        answer:
          'Рекомендується проводити ТО двічі на рік: перед літнім та зимовим сезоном. Чистка фільтрів потрібна кожні 1-3 місяці залежно від інтенсивності використання.',
      },
      {
        question: 'Що включає сервісне обслуговування?',
        answer:
          'Чистка фільтрів та теплообмінників, перевірка тиску фреону, діагностика електроніки, дезінфекція повітроводів, перевірка дренажної системи.',
      },
    ],
  };

  // --- Area-Specific FAQs ---
  // These appear on /areas/[area]/ pages and localized service pages.
  // Uses the area display name (not slug) so it reads naturally.
  const areaFaqs: FaqItem[] = area
    ? [
      {
        question: `Скільки часу займає виїзд спеціаліста в ${area}?`,
        answer: `Наші партнери-підрядники працюють по всьому Івано-Франківську. Виїзд на об\u2019єкт в район ${area} зазвичай відбувається протягом 1-2 робочих днів після заявки.`,
      },
      {
        question: `Чи є додаткова плата за виїзд в ${area}?`,
        answer: `Ні. ${area} входить в зону обслуговування наших підрядників, додаткових виїзних платежів немає. Ціна, що вказана в кошторисі, є фінальною.`,
      },
    ]
    : [];

  // --- Combine and return ---
  const specific = service && serviceFaqs[service] ? serviceFaqs[service] : [];
  return [...universal, ...specific, ...areaFaqs];
}

// ============================================================
// Reviews
// ============================================================
// Customer reviews that power:
//   - Star rating aggregates in structured data (JSON-LD)
//   - Testimonial sections on service and area pages
//   - Social proof components on the homepage
// ============================================================

export const reviews: Review[] = [
  {
    author: 'Олексій К.',
    rating: 5,
    text: 'Замовив проект та монтаж канальної системи в новобудові на Пасічній. Працює тихо, в кімнатах комфортна температура. Рекомендую сервіс Канальні для підбору підрядника.',
    date: '2025-09-15',
    service: 'montazh-kanalnoho-kondycionera',
    area: 'pasichna',
    source: 'Google',
    avatar: '/images/reviews/avatar-1.webp',
  },
  {
    author: 'Марія Д.',
    rating: 5,
    text: 'Дуже задоволена канальним кондиціонером у квартирі. Ніяких блоків на стінах, повітря розподіляється рівномірно. Дякую за допомогу з вибором підрядника!',
    date: '2025-08-20',
    service: 'kanalne-kondyciyuvannya-kvartyr',
    area: 'centr',
    source: 'Google',
    avatar: '/images/reviews/avatar-2.webp',
  },
  {
    author: 'Андрій П.',
    rating: 5,
    text: 'Встановили канальну систему в будинку 180 м\u00B2. Одна зовнішка замість 6 спліт-систем. Фасад чистий, все працює ідеально.',
    date: '2025-07-10',
    service: 'kanalne-kondyciyuvannya-budynkiv',
    area: 'uhornyky',
    source: 'Google',
    avatar: '/images/reviews/avatar-3.webp',
  },
  {
    author: 'Наталія В.',
    rating: 4.5,
    text: 'Консультація допомогла зорієнтуватися в цінах та вибрати оптимальний варіант. Підрядник виконав роботу якісно та в строк.',
    date: '2025-10-05',
    service: 'konsultaciya',
    area: 'kaskad',
    source: 'Google',
    avatar: '/images/reviews/avatar-4.webp',
  },
  {
    author: 'Ігор Т.',
    rating: 5,
    text: 'Проект кондиціювання для квартири 95 м\u00B2 був готовий за 3 дні. Все враховано: і розташування меблів, і висоту стель. Монтаж пройшов без проблем.',
    date: '2025-06-18',
    service: 'proektuvannya-kondyciyuvannya',
    area: 'pasichna',
    source: 'Google',
    avatar: '/images/reviews/avatar-5.webp',
  },
  {
    author: 'Юлія С.',
    rating: 5,
    text: 'Обрали канальну систему замість 4 спліт-систем для квартири в центрі. Результат перевершив очікування: тихо, естетично, ефективно.',
    date: '2025-11-22',
    service: 'kanalne-kondyciyuvannya-kvartyr',
    area: 'centr',
    source: 'Google',
    avatar: '/images/reviews/avatar-6.webp',
  },
  {
    author: 'Василь М.',
    rating: 4.5,
    text: 'Сервісне обслуговування канальника пройшло швидко та професійно. Почистили повітроводи, замінили фільтри, перевірили фреон.',
    date: '2025-12-01',
    service: 'obsluhovuvannya',
    area: 'krykhivci',
    source: 'Google',
    avatar: '/images/reviews/avatar-7.webp',
  },
  {
    author: 'Оксана Л.',
    rating: 5,
    text: 'Монтаж вентиляції з рекуператором для будинку в Крихівцях. Повітря завжди свіже, взимку не втрачаємо тепло. Чудове рішення!',
    date: '2025-08-30',
    service: 'montazh-ventylyaciyi',
    area: 'krykhivci',
    source: 'Google',
    avatar: '/images/reviews/avatar-8.webp',
  },
  {
    author: 'Дмитро Б.',
    rating: 5,
    text: 'Канальне кондиціювання офісу 120 м\u00B2 на Каскаді. Співробітники задоволені: немає протягів, температура рівномірна в усіх кабінетах.',
    date: '2025-09-25',
    service: 'kanalne-kondyciyuvannya-ofisiv',
    area: 'kaskad',
    source: 'Google',
    avatar: '/images/reviews/avatar-9.webp',
  },
  {
    author: 'Тетяна Г.',
    rating: 5,
    text: 'Довго шукала надійного підрядника для канального кондиціювання. Канальні допомогли знайти спеціаліста з досвідом. Все зроблено на совість!',
    date: '2025-10-15',
    service: 'montazh-kanalnoho-kondycionera',
    area: 'vovchynec',
    source: 'Google',
    avatar: '/images/reviews/avatar-10.webp',
  },
];

// ============================================================
// Review Helper Functions
// ============================================================

/**
 * Get reviews relevant to a specific page context.
 * Filters by service slug, area slug, or both.
 * Falls back to all reviews if no matches are found.
 *
 * @param service - Optional service slug to filter by
 * @param area    - Optional area slug to filter by
 * @param limit   - Maximum number of reviews to return (default: 6)
 */
export function getReviewsForPage(
  service?: string,
  area?: string,
  limit: number = 6
): Review[] {
  let filtered = [...reviews];

  // Try most specific filter first (both service and area)
  if (service && area) {
    const both = filtered.filter((r) => r.service === service && r.area === area);
    if (both.length >= 2) return both.slice(0, limit);
  }

  // Try service-only filter
  if (service) {
    const byService = filtered.filter((r) => r.service === service);
    if (byService.length >= 2) return byService.slice(0, limit);
  }

  // Try area-only filter
  if (area) {
    const byArea = filtered.filter((r) => r.area === area);
    if (byArea.length >= 2) return byArea.slice(0, limit);
  }

  // Fallback: return highest-rated reviews
  return filtered
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

/**
 * Calculate the aggregate rating from all reviews.
 * Returns an object suitable for JSON-LD AggregateRating.
 */
export function getAggregateRating(): {
  ratingValue: string;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
} {
  if (reviews.length === 0) {
    return { ratingValue: '0', reviewCount: 0, bestRating: 5, worstRating: 1 };
  }

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const avg = sum / reviews.length;

  return {
    ratingValue: avg.toFixed(1),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
  };
}
