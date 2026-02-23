import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generate() {
    const allKeywords = new Set();

    // User's exact requested keywords
    const coreTerms = [
        'канальний кондиціонер',
        'канальний кондиціонер купити',
        'канальний кондиціонер івано-франківськ',
        'кондиціонер івано-франківськ',
        'вентиляція івано-франківськ',
        'проектування вентиляції івано-франківськ',
        'монтаж вентиляції івано-франківськ',
        'канальне кондиціювання івано-франківськ',
        'вартість канального кондиціювання'
    ];

    // Add base terms to set
    coreTerms.forEach(term => allKeywords.add(term));

    // Terms that make sense to combine with specific city districts
    const regionalBaseTerms = [
        'канальний кондиціонер',
        'монтаж вентиляції',
        'проектування вентиляції'
    ];

    // Extracted from serviceAreas.ts (without Ivano-Frankivsk itself, as we already have those manually)
    const areas = [
        'Центр', 'Пасічна', 'Каскад', 'Угорники',
        'Крихівці', 'Опришівці', 'Вовчинець',
        'Хриплин', 'Микитинці', 'Драгомирчани'
    ];

    regionalBaseTerms.forEach(term => {
        areas.forEach(area => {
            const areaNameLower = area.toLowerCase();
            allKeywords.add(`${term} ${areaNameLower}`);
        });
    });

    const finalSet = Array.from(allKeywords).slice(0, 95); // Ensure < 100 API limit per batch

    const TARGET_FILE = path.join(__dirname, 'seo-data', 'target-keywords.json');
    await fs.writeFile(TARGET_FILE, JSON.stringify(finalSet, null, 2));

    console.log(`Generated ${finalSet.length} focused keywords and saved to ${TARGET_FILE}!`);
}

generate();
