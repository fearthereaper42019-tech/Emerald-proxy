
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartSuggestions = async (query: string) => {
  if (!query || query.length < 2) return [];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest 3 real, popular websites that match this search query or partial URL: "${query}". Return as a JSON array of objects with 'title', 'url', and 'category'.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              url: { type: Type.STRING },
              category: { type: Type.STRING }
            },
            required: ["title", "url", "category"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Suggestion Error:", error);
    return [];
  }
};

export const getAIChatResponse = async (history: { role: 'user' | 'model', text: string }[]) => {
  try {
    const contents = history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents as any,
      config: {
        systemInstruction: "You are Emerald Assistant. You are professional, helpful, and concise. Your purpose is to assist users within the Emerald Proxy Portal."
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again.";
  }
};

export const sanitizeUrl = (input: string): string => {
  let url = input.trim();
  if (!url.includes('.') && !url.includes('://')) {
    return `https://www.google.com/search?q=${encodeURIComponent(url)}`;
  }
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  return url;
};
