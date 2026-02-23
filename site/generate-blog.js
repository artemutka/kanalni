import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Завантаження змінних середовища (.env)
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error('❌ Помилка: GEMINI_API_KEY не знайдений у файлі .env');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
// Використовуємо про-модель для якісного тексту з 1500+ слів
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KEYWORDS_FILE = path.join(__dirname, 'seo-data', 'raw-keyword-ideas.json');
const BLOG_DIR = path.join(__dirname, 'src', 'content', 'blog');

// Допоміжна функція для створення slug з назви (транслітерація)
function createSlug(text) {
    const ukrMap = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g', 'д': 'd', 'е': 'e',
        'є': 'ye', 'ж': 'zh', 'з': 'z', 'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'y',
        'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
        'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch',
        'ш': 'sh', 'щ': 'shch', 'ь': '', 'ю': 'yu', 'я': 'ya', "'": ''
    };

    return text.toLowerCase()
        .split('')
        .map(char => ukrMap[char] || char)
        .join('')
        .replace(/[^a-z0-9]+/g, '-') // замінюємо не-буквено-цифрові символи на дефіс
        .replace(/^-+|-+$/g, ''); // видаляємо дефіси на початку та в кінці
}

// Завантаження промпту
const PROMPT_TEMPLATE = `Ти — SEO-експерт та досвідчений копірайтер у сфері систем кондиціювання та вентиляції.
Напиши блогову статтю українською мовою на тему: "{{keyword}}".

Вимоги до статті (E-E-A-T Framework & SEO):
1. **Обсяг**: мінімум 1200-1500 слів.
2. **Структура**:
   - Вступ (захоплюючий хук, основна проблематика, мета статті).
   - Основне тіло розбите на логічні розділи за допомогою заголовків Markdown (##, ###).
   - Використовуй марковані та нумеровані списки для покращення читабельності.
   - Висновок та заклик до дії (CTA: звернутися до компанії за консультацією чи монтажем).
3. **E-E-A-T (Досвід, Експертиза, Авторитетність, Довіра)**:
   - Додай практичні поради.
   - Уникай "води" (generics). Пиши професійно, але зрозуміло для звичайного клієнта.
   - Зроби акцент на тому, що правильний вибір та монтаж вимагають залучення фахівців.
4. **Специфіка**:
   - Аудиторія: власники будинків або квартир, які планують встановлення кліматичних систем або вентиляції.
   - Локація компанії (якщо доречно згадати): Івано-Франківськ та область.
5. **Внутрішня перелінковка**: 
   - Залиш 2-3 органічних лінки в тексті. Використовуй формат Markdown: [назва сервісу](/services/slug-послуги/) або [в Івано-Франківську](/areas/ivano-frankivsk/). (Просто використовуй загальні логічні slug-и типу /services/montazh-kondytsioneriv/ чи /services/proektuvannya-ventylyatsiyi/).

Твоя відповідь має складатися ЛИШЕ з готового Markdown-файлу. Вона повинна починатися з Frontmatter блоку. Категорію обери з: emergency, tips, maintenance, news.

Приклад Frontmatter:
---
title: "Якийсь клікбейтний, але релевантний заголовок про {{keyword}}"
description: "SEO-оптимізований опис статті на 140-155 символів."
publishDate: "{{date}}"
author: "kanalni.if.ua"
category: "tips"
tags: ["вентиляція", "кондиціонування", "поради"]
readingTime: "5 хв читання"
featured: false
---

Текст статті тут...`;

async function generateBlogPosts() {
    console.log(`[Blog Generator] Скрипт запущено... Трансляція запиту до Gemini.`);

    try {
        // 1. Отримуємо ключові слова з raw-keyword-ideas.json
        const fileData = await fs.readFile(KEYWORDS_FILE, 'utf-8');
        const rawArray = JSON.parse(fileData);
        let items = [];

        // DataForSEO має специфічну структуру JSON, де результати у масиві items
        if (Array.isArray(rawArray) && rawArray.length > 0) {
            const parsedText = JSON.parse(rawArray[0].text);
            items = parsedText.items || [];
        }

        // Відфільтровуємо лише long-tail запити (від 4 слів і більше, або інфо-запити)
        // Також беремо запити з помірним або низьким search_volume (< 1000) для торгетінгу
        const infoKeywords = items.map(item => item.keyword).filter(kw => {
            if (!kw) return false;
            const wordCount = kw.split(' ').length;
            const isInfo = kw.includes('як ') || kw.includes('що ') || kw.includes('чи ') || kw.includes('поради') || kw.includes('вартість');
            return (wordCount >= 4 || isInfo) && !kw.includes('б/у') && !kw.includes('олх');
        });

        if (infoKeywords.length === 0) {
            console.log(`[Blog Generator] Не знайдено підходящих long-tail ключових слів.`);
            return;
        }

        // 2. Перевіряємо вже існуючі статті, щоб уникнути дублів
        const existingFiles = await fs.readdir(BLOG_DIR);
        const existingSlugs = existingFiles.map(f => f.replace(/\.md$/, ''));

        let keywordToUse = null;
        for (const kw of infoKeywords) {
            const potentialSlug = createSlug(kw);
            if (!existingSlugs.includes(potentialSlug)) {
                keywordToUse = kw;
                break; // Знайшли ключове слово, для якого ще нема статті
            }
        }

        if (!keywordToUse) {
            console.log(`[Blog Generator] Усі ключові слова з цільового пулу вже мають статті! Перевірте семантику.`);
            return;
        }

        console.log(`[Blog Generator] Вибрано тему: "${keywordToUse}"`);

        // 3. Формуємо промпт
        const today = new Date().toISOString().split('T')[0];
        const prompt = PROMPT_TEMPLATE
            .replace(/{{keyword}}/g, keywordToUse)
            .replace('{{date}}', today);

        console.log(`[Blog Generator] Відправка запиту до Gemini API... Це може зайняти до хвилини.`);

        // 4. Запит до Gemini
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Перевіряємо, чи повернувся маркдаун і форматуємо (інколи AI додає ```markdown на початку)
        let markdownContent = responseText.trim();
        if (markdownContent.startsWith('```markdown')) {
            markdownContent = markdownContent.substring('```markdown'.length);
        }
        if (markdownContent.startsWith('```md')) {
            markdownContent = markdownContent.substring('```md'.length);
        }
        if (markdownContent.endsWith('```')) {
            markdownContent = markdownContent.substring(0, markdownContent.length - 3);
        }
        markdownContent = markdownContent.trim();

        // Перевірка на Frontmatter (повинен починатися з ---)
        if (!markdownContent.startsWith('---')) {
            console.warn(`[Blog Generator] УВАГА: Згенерований текст не починається з Frontmatter!`);
        }

        // 5. Зберігаємо статтю
        // Намагаємось витягти title з frontmatter (на випадок, якщо AI згенерував кращий заголовок і ми хочемо slug з нього)
        let titleMatch = markdownContent.match(/title:\s*["']([^"']+)["']/);
        let slug = createSlug(keywordToUse); // Дефолтний slug

        // Але залишимо slug на основі ключа для простоти трекінгу
        const slugFileName = `${slug}.md`;
        const filePath = path.join(BLOG_DIR, slugFileName);

        await fs.writeFile(filePath, markdownContent, 'utf-8');

        console.log(`[Blog Generator] ✅ Статтю успішно створено та збережено: ${filePath}`);

    } catch (error) {
        console.error(`[Blog Generator] ❌ Помилка під час генерації:`, error);
    }
}

generateBlogPosts();
