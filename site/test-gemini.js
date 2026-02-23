import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) { console.error("No API key"); process.exit(1); }
const genAI = new GoogleGenerativeAI(apiKey);
async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent("Hello");
    console.log(result.response.text());
  } catch(e) { console.error(e); }
}
run();
