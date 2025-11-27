import { GoogleGenAI, Type } from "@google/genai";
import type { FormData, Recommendation } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        optimalPlantingWindow: { type: Type.STRING },
        weeklyRecommendations: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    week: { type: Type.STRING },
                    advice: { type: Type.STRING },
                },
                required: ['week', 'advice'],
            },
        },
        soilManagementTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
        },
        generalAdvice: { type: Type.STRING },
    },
    required: ['optimalPlantingWindow', 'weeklyRecommendations', 'soilManagementTips', 'generalAdvice'],
};


function buildPrompt(formData: FormData, language: 'en' | 'rw'): string {
    const langInstruction = language === 'rw' 
        ? "Respond in Kinyarwanda." 
        : "Respond in English.";

    return `
    Act as an expert agronomist for "SmartHinga Rwanda", an AI-powered smart farming platform for small-scale farmers in Rwanda. Your task is to provide precise, actionable, and encouraging farming advice based on the user's input. The advice should be tailored to Rwanda's specific climate and agricultural context. ${langInstruction}

    User's farming details:
    - Location in Rwanda: ${formData.location}
    - Crop to Plant: ${formData.cropType}
    - Soil Type: ${formData.soilType}

    Please provide the following information formatted as a JSON object, adhering to the provided schema.

    1.  **Optimal Planting Window**: Predict the best two-week window for planting. Base this on typical weather patterns for the specified location and season in Rwanda.
    2.  **Weather-Based Recommendations**: Provide a 4-week outlook starting from the optimal planting window. For each week, give advice on watering, pest control, and fertilization based on expected weather.
    3.  **Soil Management Tips**: Give two specific, easy-to-implement tips for managing the specified soil type for the chosen crop.
    4.  **General Advice**: Provide one crucial piece of advice for growing this crop successfully in the specified Rwandan region.
  `;
}

export const getFarmingRecommendation = async (formData: FormData, language: 'en' | 'rw'): Promise<Recommendation> => {
    const prompt = buildPrompt(formData, language);

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            }
        });

        const text = response.text;
        const parsedResponse: Recommendation = JSON.parse(text);
        return parsedResponse;

    } catch (error) {
        console.error("Error fetching or parsing recommendation:", error);
        throw new Error("Failed to get a valid recommendation from the AI model.");
    }
};