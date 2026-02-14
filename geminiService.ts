import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';
import { ContentRequest } from '../types';

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY environment variable is missing.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const generateContent = async (request: ContentRequest): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;

    // Check if we should use mock data
    if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
      console.log("Using Mock Service (No valid API key found)");
      return getMockResponse(request);
    }

    const ai = getClient();

    // Using gemini-3-flash-preview as recommended for text tasks
    const modelId = 'gemini-3-flash-preview';

    const prompt = `
      Topic: ${request.topic}
      Platform: ${request.platform}
      Target Audience: ${request.audience}
      Tone: ${request.tone}
      
      Create optimized content based on these parameters.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No content generated from the model.");
    }

    return text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);

    // Fallback to mock if API key error occurs during request
    if (error.message?.includes("API key not valid") || error.message?.includes("INVALID_ARGUMENT")) {
      console.warn("API Key Invalid. Falling back to Mock data for demonstration.");
      return getMockResponse(request);
    }

    throw new Error(error.message || "Failed to generate content. Please check your API key and try again.");
  }
};

const getMockResponse = async (request: ContentRequest): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const sampleContent = `
# Content Strategy: ${request.topic}
**Platform:** ${request.platform} | **Tone:** ${request.tone} | **Audience:** ${request.audience}

## Post Draft
"🚀 Exciting insights on **${request.topic}**! 

Whether you're looking to scale or just starting out, understanding the nuances of ${request.topic} is key for ${request.audience}. 

1️⃣ Tip One: Focus on value.
2️⃣ Tip Two: Be consistent.
3️⃣ Tip Three: Engage with your community.

What are your thoughts on this? Let's discuss below! 👇"

## Engagement Strategy
- **Keywords:** #${request.topic.replace(/\s+/g, '')} #Growth #Innovation
- **Best Time to Post:** 9:00 AM EST
- **Call to Action:** Ask a specific question about the ${request.topic} to spark conversation.

---
*Note: This is a generated sample for demonstration purposes because no valid Gemini API key was found.*
  `;
  return sampleContent.trim();
};