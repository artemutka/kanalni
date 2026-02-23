import http from 'node:http';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

// --- Configuration ---
const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CHECKER_SCRIPT = path.join(__dirname, 'update-ranks.js');

// Very basic CORS server
const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const urlPath = req.url.split('?')[0];

    if (urlPath === '/seo-dashboard.html' || urlPath === '/') {
        const htmlFile = path.join(__dirname, 'seo-dashboard.html');
        fs.readFile(htmlFile, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Dashboard HTML not found.');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
        return;
    }

    if (urlPath === '/data' && req.method === 'GET') {
        const rankingsFile = path.join(__dirname, 'seo-data', 'rankings.json');
        fs.readFile(rankingsFile, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Data not found yet. Click update first.' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
        return;
    }

    if (urlPath === '/update-rankings' && req.method === 'POST') {
        console.log(`[Server] Triggered DataForSEO update script...`);

        const child = spawn('node', [CHECKER_SCRIPT]);

        child.stdout.on('data', (data) => console.log(`[Child]: ${data}`));
        child.stderr.on('data', (data) => console.error(`[Child Err]: ${data}`));

        child.on('close', (code) => {
            if (code === 0) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } else {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: `Script exited with code ${code}` }));
            }
        });
        return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
    console.log(`[Server] Active! Dashboard API listening on http://localhost:${PORT}`);
    console.log(`[Server] Open 'seo-dashboard.html' in your browser to view ranks.`);
});
