import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "Prestige Audit <info@prestigeaudit.ge>",
      to: "info@prestigeaudit.ge",
      replyTo: email,
      subject: `New Contact: ${subject || "General Inquiry"} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 16px;">
          <h2 style="color: #1e3a5f; margin-bottom: 24px;">New Contact Form Submission</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px; width: 120px;">Name</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${email}</td>
            </tr>
            ${
              phone
                ? `
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Phone</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${phone}</td>
            </tr>`
                : ""
            }
            ${
              subject
                ? `
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Service</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${subject}</td>
            </tr>`
                : ""
            }
          </table>

          <div style="margin-top: 24px; padding: 20px; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 13px; margin: 0 0 8px;">Message</p>
            <p style="color: #0f172a; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="margin-top: 24px; color: #94a3b8; font-size: 12px;">
            Sent from prestigeaudit.ge contact form. Hit Reply to respond directly to ${name}.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
