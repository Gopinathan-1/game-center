import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingConfirmationData {
  customerName: string;
  customerEmail: string;
  bookingDate: string;
  slotLabels: string[];
  mobileNumber: string;
}

export const sendBookingConfirmationEmail = async (data: BookingConfirmationData) => {
  try {
    const { customerName, customerEmail, bookingDate, slotLabels, mobileNumber } = data;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4B69F0; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .booking-details { background-color: white; padding: 15px; border-left: 4px solid #4B69F0; margin: 15px 0; }
            .label { font-weight: bold; color: #4B69F0; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Booking Confirmed ✓</h1>
              <p style="margin: 5px 0 0 0;">Nexus Arena Cafe</p>
            </div>
            
            <div class="content">
              <p>Hello <strong>${customerName}</strong>,</p>
              
              <p>Your booking has been confirmed! We look forward to seeing you at Nexus Arena Cafe.</p>
              
              <div class="booking-details">
                <div><span class="label">Date:</span> ${bookingDate}</div>
                <div style="margin-top: 10px;"><span class="label">Time Slots:</span></div>
                <ul style="margin: 5px 0; padding-left: 20px;">
                  ${slotLabels.map((slot) => `<li>${slot}</li>`).join("")}
                </ul>
                <div style="margin-top: 10px;"><span class="label">Contact:</span> ${mobileNumber}</div>
              </div>
              
              <p style="margin-top: 20px; color: #666;">
                Please arrive 5-10 minutes before your first slot time. If you need to cancel or reschedule, 
                please contact us at your earliest convenience.
              </p>
              
              <p>Thank you for choosing Nexus Arena Cafe!</p>
              
              <div class="footer">
                <p>This is an automated confirmation email. Please do not reply to this email.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const response = await resend.emails.send({
      from: process.env.CUSTOMER_EMAIL_FROM || "onboarding@resend.dev",
      to: customerEmail || process.env.CUSTOMER_EMAIL_TO || "",
      subject: `Booking Confirmed - Nexus Arena Cafe - ${bookingDate}`,
      html: htmlContent,
    });

    return {
      success: true,
      messageId: response.data?.id,
      error: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return {
      success: false,
      messageId: null,
      error: errorMessage,
    };
  }
};
