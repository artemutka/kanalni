import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) { console.error("No API key"); process.exit(1); }
const baseUrl = "https://generativelanguage.googleapis.com/v1beta/models?key=" + apiKey;
fetch(baseUrl)
  .then(r => r.json())
  .then(data => console.log(data.models.map(m => m.name)))
  .catch(console.error);
