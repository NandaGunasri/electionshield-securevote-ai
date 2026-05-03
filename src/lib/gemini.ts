import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";
const FALLBACK_MODEL = "gemini-1.5-pro";

export const getGeminiResponse = async (prompt: string) => {
  const apiKey = process.env.GEMINI_API_KEY || "";
  
  if (!apiKey) {
    console.error("Gemini API Key is missing from environment variables");
    throw new Error("API_KEY_MISSING");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  const attemptGeneration = async (modelName: string) => {
    const model = genAI.getGenerativeModel({ 
      model: modelName,
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      ],
    });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  };

  try {
    return await attemptGeneration(MODEL_NAME);
  } catch (error: any) {
    const errorMsg = error.message?.toLowerCase() || "";
    console.error(`Gemini API Error with ${MODEL_NAME}:`, errorMsg);

    // 404 Model Not Found Fallback
    if (errorMsg.includes("404") || errorMsg.includes("not found") || errorMsg.includes("not_found")) {
      console.warn(`Model ${MODEL_NAME} not found, attempting fallback to ${FALLBACK_MODEL}`);
      try {
        return await attemptGeneration(FALLBACK_MODEL);
      } catch (fallbackError: any) {
        console.error(`Fallback model ${FALLBACK_MODEL} also failed:`, fallbackError.message);
        throw new Error("MODEL_NOT_FOUND");
      }
    }

    // 403 / Disabled API detection
    if (errorMsg.includes("403") || errorMsg.includes("permission_denied") || errorMsg.includes("service_disabled")) {
      throw new Error("SERVICE_DISABLED");
    }

    // 401 / Invalid API Key
    if (errorMsg.includes("401") || errorMsg.includes("api_key_invalid") || errorMsg.includes("invalid api key")) {
      throw new Error("AUTH_ERROR");
    }

    // 429 / Quota Exhausted
    if (errorMsg.includes("429") || errorMsg.includes("quota") || errorMsg.includes("limit_reached")) {
      throw new Error("QUOTA_EXHAUSTED");
    }

    // Generic Connection fallback
    throw new Error("CONNECTION_ERROR");
  }
};

export const getElectionAssistantPrompt = (userMessage: string) => {
  return `You are "Shieldy", the ElectionShield SecureVote AI Assistant. Your mission is to provide comprehensive, detailed, and authoritative civic intelligence to citizens.
  
  Current User Message: ${userMessage}
  
  Operational Guidelines:
  1. ELABORATE RESPONSES: For informational queries, provide detailed, structured answers (aim for 300+ words where appropriate). Use paragraphs and clear sections.
  2. TRUST & ACCURACY: Provide high-precision election information based on official democratic standards.
  3. REGISTRATION EXPERTISE: Offer step-by-step guidance for voter registration, document checklists, and eligibility criteria.
  4. SECURITY INTELLIGENCE: Explain how ElectionShield protects democracy using Vertex AI Vision and real-time surveillance.
  5. ACCESSIBILITY: Maintain a helpful, patient, and senior-friendly tone. Ensure language is clear but professional.
  6. CONTINUITY: Reference previous context if applicable and encourage further civic participation.
  
  Response Format:
  - Use detailed Markdown formatting (headers, bold text, lists).
  - Keep initial greetings concise but make the core content substantial.
  - Avoid generic one-sentence answers; strive for depth and educational value.`;
};
