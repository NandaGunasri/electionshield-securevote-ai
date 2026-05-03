import { NextRequest, NextResponse } from "next/server";
import { getGeminiResponse } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ 
        response: "I didn't receive a message. How can I help you with the election today?",
        status: "empty_prompt" 
      }, { status: 200 }); // Return 200 with fallback text to prevent frontend crash
    }

    try {
      const response = await getGeminiResponse(prompt);
      return NextResponse.json({ response, status: "success" });
    } catch (error: any) {
      console.error("Gemini Execution Error:", error.message);
      
      let clientMessage = "I'm having trouble connecting to my civic intelligence database. Please try again soon.";
      let statusCode = "error";

      switch (error.message) {
        case "API_KEY_MISSING":
          clientMessage = "The AI Assistant is currently offline (Missing Credentials). Please contact the system administrator.";
          statusCode = "missing_api_key";
          break;
        case "AUTH_ERROR":
          clientMessage = "Secure AI connection could not be established. Please verify system credentials.";
          statusCode = "auth_error";
          break;
        case "SERVICE_DISABLED":
          clientMessage = "The ElectionShield AI service is temporarily disabled for maintenance in your region.";
          statusCode = "service_disabled";
          break;
        case "QUOTA_EXHAUSTED":
          clientMessage = "System Congestion: Too many citizens are requesting information. Please try again in a few minutes.";
          statusCode = "quota_exhausted";
          break;
        case "MODEL_NOT_FOUND":
          clientMessage = "System Update: I'm currently migrating to a newer intelligence model. Please try again in a moment.";
          statusCode = "model_not_found";
          break;
      }

      // We return 200 even on AI errors but with a status code and fallback message
      // This ensures the frontend Chatbot component doesn't hit the catch block and stays interactive
      return NextResponse.json({ 
        response: clientMessage, 
        status: statusCode,
        isFallback: true 
      }, { status: 200 });
    }
  } catch (globalError: any) {
    console.error("Critical API Route Failure:", globalError);
    return NextResponse.json({ 
      response: "The secure communication channel is experiencing high latency. Please refresh the page.",
      status: "critical_failure" 
    }, { status: 200 });
  }
}
