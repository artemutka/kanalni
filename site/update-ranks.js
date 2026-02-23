import { Buffer } from 'node:buffer';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Opt-in to load .env variables if running Node v20.6+
try {
    process.loadEnvFile();
} catch (e) {
    // Ignore if not supported or file missing
}

// --- Configuration ---
const DATA_FOR_SEO_API_URL = 'https://api.dataforseo.com/v3/serp/google/organic/live/advanced';
// Read from environment variables securely
const API_LOGIN = process.env.DATAFORSEO_LOGIN;
const API_PASSWORD = process.env.DATAFORSEO_PASSWORD;

if (!API_LOGIN || !API_PASSWORD) {
    console.error('[SEO Tracker] Missing API credentials! Please set DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD in .env or your environment variables.');
    process.exit(1);
}

const TARGET_DOMAIN = 'kanalni.if.ua';
const LOCATION_CODE = 2804; // Ukraine
const LANGUAGE_CODE = 'uk';

// --- Paths ---
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KEYWORDS_FILE = path.join(__dirname, 'seo-data', 'target-keywords.json');
const RANKINGS_FILE = path.join(__dirname, 'seo-data', 'rankings.json');

async function fetchRankings() {
    console.log(`[SEO Tracker] Starting rank check for domain: ${TARGET_DOMAIN}`);

    // 1. Read keywords
    let keywords = [];
    try {
        const data = await fs.readFile(KEYWORDS_FILE, 'utf-8');
        keywords = JSON.parse(data);
        console.log(`[SEO Tracker] Loaded ${keywords.length} keywords from ${KEYWORDS_FILE}`);
    } catch (err) {
        console.error(`[SEO Tracker] Error loading keywords: ${err.message}`);
        process.exit(1);
    }

    // 2. Prepare DataForSEO API Post Task Array
    // DataForSEO maximum tasks per request is 100
    const postData = keywords.map(kw => ({
        keyword: kw,
        location_code: LOCATION_CODE,
        language_code: LANGUAGE_CODE,
        depth: 100 // Look up to top 100 results
    }));

    // Create Auth Header
    const authInput = `${API_LOGIN}:${API_PASSWORD}`;
    const authHeader = `Basic ${Buffer.from(authInput).toString('base64')}`;

    console.log(`[SEO Tracker] Sending request to DataForSEO API...`);

    // 3. Send Request
    let apiResponse;
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

        const response = await fetch(DATA_FOR_SEO_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData),
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`DataForSEO HTTP Error: ${response.status} - ${await response.text()}`);
        }

        apiResponse = await response.json();
    } catch (err) {
        console.error(`[SEO Tracker] API Request failed: ${err.message}`);
        process.exit(1);
    }

    console.log(`[SEO Tracker] Data received. Parsing...`);

    // 4. Parse Results
    const results = [];
    const currentDate = new Date().toISOString().split('T')[0];

    if (apiResponse.tasks && apiResponse.tasks.length > 0) {
        apiResponse.tasks.forEach((task) => {
            if (task.result && task.result.length > 0) {
                const serpData = task.result[0];
                const keyword = serpData.keyword;
                let foundRank = null;
                let foundUrl = null;

                // Search for target domain in organic results
                if (serpData.items) {
                    const organicItems = serpData.items.filter(item => item.type === 'organic');
                    for (const item of organicItems) {
                        if (item.domain === TARGET_DOMAIN || (item.url && item.url.includes(TARGET_DOMAIN))) {
                            foundRank = item.rank_group;
                            foundUrl = item.url;
                            break; // Found highest ranking url
                        }
                    }
                }

                results.push({
                    keyword: keyword,
                    rank: foundRank !== null ? foundRank : '100+', // Not in top 100
                    url: foundUrl,
                    date: currentDate,
                    vol: serpData.keyword_info?.search_volume || 0
                });
            } else {
                console.warn(`[SEO Tracker] No result data for task: ${task.id} (Keyword might be missing or no SERP returned)`);
                // Check if it has data inside data instead of result (some endpoints act funny)
                if (task.data && task.data.keyword) {
                    results.push({
                        keyword: task.data.keyword,
                        rank: '100+',
                        url: null,
                        date: currentDate,
                        vol: 0
                    });
                }
            }
        });
    }

    // 5. Load existing history and merge
    let history = {};
    try {
        const existingData = await fs.readFile(RANKINGS_FILE, 'utf-8');
        history = JSON.parse(existingData);
    } catch (err) {
        // File doesn't exist or is empty, start fresh
        console.log(`[SEO Tracker] No existing rankings found. Creating new history.`);
    }

    // Add the current date's scan to history
    history[currentDate] = results;

    // 6. Save back to file
    try {
        await fs.writeFile(RANKINGS_FILE, JSON.stringify(history, null, 2));
        console.log(`[SEO Tracker] Successfully updated rankings for ${currentDate} in ${RANKINGS_FILE}`);
    } catch (err) {
        console.error(`[SEO Tracker] Failed to save rankings: ${err.message}`);
    }
}

fetchRankings();
