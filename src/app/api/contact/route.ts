import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  let name: string | undefined;
  let email: string | undefined;
  let message: string | undefined;

  try {
    const body = await req.json();
    name = body?.name?.trim();
    email = body?.email?.trim();
    message = body?.message?.trim();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 422 },
    );
  }

  if (!message) {
    return NextResponse.json(
      { error: "Message is required." },
      { status: 422 },
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!toEmail) {
    console.error("CONTACT_TO_EMAIL environment variable is not set.");
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 },
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: "SMSS Contact <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `New Contact Message${name ? ` from ${name}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 8px;">
          <h2 style="color: #191c45; margin-bottom: 24px;">New Contact Request</h2>
          ${name ? `<p style="margin: 0 0 12px;"><strong>Name:</strong> ${name}</p>` : ""}
          <p style="margin: 0 0 12px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #ea7a38;">${email}</a></p>
          <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
          <p style="background: #ffffff; border-left: 4px solid #ea7a38; padding: 16px; border-radius: 4px; white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend emails.send error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Unexpected contact error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}

