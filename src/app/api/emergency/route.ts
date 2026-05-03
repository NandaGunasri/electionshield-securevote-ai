import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { boothId, type, severity, timestamp, officerId } = await req.json();

    // In a real production app, this would:
    // 1. Log the incident in Firestore.
    // 2. Trigger a Cloud Function to send SMS/Email via Pub/Sub or Twilio.
    // 3. Notify the police API.
    // 4. Update the Admin Dashboard in real-time via WebSockets/Firestore listeners.

    console.log(`[EMERGENCY ALERT] ${type} at ${boothId}. Severity: ${severity}. Officer: ${officerId}`);

    // Simulate database delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      status: "success",
      incidentId: `INC-${Math.floor(Math.random() * 10000)}`,
      message: "Emergency response teams have been notified and are en route.",
      estimatedArrival: "4-6 minutes",
    });
  } catch (error) {
    return NextResponse.json({ status: "error", message: "Failed to process emergency alert." }, { status: 500 });
  }
}
