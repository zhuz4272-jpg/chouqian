import { GoogleGenAI, Type } from '@google/genai';
import { Fortune } from '../types';
import { FALLBACK_FORTUNES } from '../constants';

export const getFortune = async (): Promise<Fortune> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("No API_KEY found, using fallback fortunes.");
    return getRandomFallback();
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // We use a lighter model for speed
    const modelId = 'gemini-3-flash-preview'; 

    const response = await ai.models.generateContent({
      model: modelId,
      contents: "Generate a playful, encouraging Chinese New Year fortune for 2026. It should be short, witty, and warm.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A single Chinese character summary (e.g. 福, 乐, 财)" },
            keyword: { type: Type.STRING, description: "A 4-character idiom or short phrase (e.g. 万事如意)" },
            description: { type: Type.STRING, description: "A warm, poetic, or witty 2-sentence fortune message in Chinese." },
            luckyColor: { type: Type.STRING, description: "A hex color code suitable for the fortune." },
            luckyNumber: { type: Type.INTEGER, description: "A lucky number between 1 and 99." }
          },
          required: ["title", "keyword", "description", "luckyColor", "luckyNumber"]
        },
        temperature: 1.2, // High creativity
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return {
        id: Date.now().toString(),
        ...data
      };
    }

    throw new Error("Empty response from Gemini");

  } catch (error) {
    console.error("Gemini API Error:", error);
    return getRandomFallback();
  }
};

const getRandomFallback = (): Fortune => {
  const index = Math.floor(Math.random() * FALLBACK_FORTUNES.length);
  return FALLBACK_FORTUNES[index];
};