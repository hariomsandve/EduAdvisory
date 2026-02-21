import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface AdvisoryResponse {
  advice: string;
  recommendedPaths: {
    title: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  }[];
  resources: {
    name: string;
    url: string;
  }[];
}

export async function getEducationalAdvice(prompt: string): Promise<AdvisoryResponse> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "You are an expert educational advisor. Provide structured advice for students. Return the response in JSON format.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          advice: { type: Type.STRING, description: "General advisory text" },
          recommendedPaths: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                difficulty: { type: Type.STRING, enum: ["Beginner", "Intermediate", "Advanced"] }
              },
              required: ["title", "description", "difficulty"]
            }
          },
          resources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                url: { type: Type.STRING }
              },
              required: ["name", "url"]
            }
          }
        },
        required: ["advice", "recommendedPaths", "resources"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Invalid response from advisor");
  }
}
