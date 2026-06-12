import { Resend } from "resend";

interface BookingConfirmationData {
  customerName: string;
  customerEmail: string;
  bookingDate: string;
  slotLabels: string[];
  mobileNumber: string;
}

export const sendBookingConfirmationEmail = async (data: BookingConfirmationData) => {
  try {
    // Validate API key
    if (!process.env.RESEND_API_KEY) {
      const errorMsg = "RESEND_API_KEY environment variable is not set";
      console.error("❌", errorMsg);
      return {
        success: false,
        messageId: null,
        error: errorMsg,
      };
    }

    // Validate email address
    if (!data.customerEmail || !data.customerEmail.includes("@")) {
      const errorMsg = `Invalid email address: ${data.customerEmail}`;
      console.error("❌", errorMsg);
      return {
        success: false,
        messageId: null,
        error: errorMsg,
      };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { customerName, customerEmail, bookingDate, slotLabels, mobileNumber } = data;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4B69F0; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .booking-details { background-color: white; padding: 15px; border-left: 4px solid #4B69F0; margin: 15px 0; }
            .label { font-weight: bold; color: #4B69F0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">Booking Confirmed ✓</h1>
            </div>
            
            <div class="content">
              <div class="booking-details">
                <p><span class="label">Name:</span> ${customerName}</p>
                <p><span class="label">Time Slot:</span> ${slotLabels.join(", ")}</p>
                <p><span class="label">Contact:</span> ${mobileNumber}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Use the from address from env
    const fromAddress = process.env.CUSTOMER_EMAIL_FROM || "Nexus Arena <onboarding@resend.dev>";
    const toEmail = customerEmail;

    console.log("📧 Sending booking confirmation email", {
      from: fromAddress,
      to: toEmail,
      subject: `Booking Confirmed - Nexus Arena - ${bookingDate}`,
      apiKeyExists: !!process.env.RESEND_API_KEY,
    });

    const response = await resend.emails.send({
      from: fromAddress,
      to: toEmail,
      subject: `Booking Confirmed - Nexus Arena - ${bookingDate}`,
      html: htmlContent,
    });

    console.log("📧 Resend API Response:", JSON.stringify(response, null, 2));

    // Check if response has an error
    if (response.error) {
      console.error("❌ Resend error:", response.error);
      return {
        success: false,
        messageId: null,
        error: response.error.message || JSON.stringify(response.error),
      };
    }

    // Check if we got a message ID
    if (response.data?.id) {
      console.log("✅ Email sent successfully with ID:", response.data.id);
      return {
        success: true,
        messageId: response.data.id,
        error: null,
      };
    }

    console.warn("⚠️ Unexpected response structure:", response);
    return {
      success: false,
      messageId: null,
      error: "Unexpected response from Resend API",
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("❌ Email sending failed:", error);
    return {
      success: false,
      messageId: null,
      error: errorMessage,
    };
  }
};
