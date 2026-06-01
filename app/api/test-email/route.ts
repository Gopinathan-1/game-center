import { NextResponse } from "next/server";
import { sendBookingConfirmationEmail } from "@/utils/email/resend";

export async function GET() {
  console.log("Testing email service...");
  console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
  console.log("CUSTOMER_EMAIL_FROM:", process.env.CUSTOMER_EMAIL_FROM);
  console.log("CUSTOMER_EMAIL_TO:", process.env.CUSTOMER_EMAIL_TO);

  const result = await sendBookingConfirmationEmail({
    customerName: "Test User",
    customerEmail: process.env.CUSTOMER_EMAIL_TO || "test@example.com",
    bookingDate: "2026-06-01",
    slotLabels: ["09:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"],
    mobileNumber: "9876543210",
  });

  return NextResponse.json({
    status: "test",
    result,
    environment: {
      apiKeyExists: !!process.env.RESEND_API_KEY,
      apiKeyLength: process.env.RESEND_API_KEY?.length,
      from: process.env.CUSTOMER_EMAIL_FROM,
      to: process.env.CUSTOMER_EMAIL_TO,
    },
  });
}
