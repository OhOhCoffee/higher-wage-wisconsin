"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type FormState = { error?: string; success?: boolean };

export async function sendJoinEmail(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const newsletter = formData.get("newsletter") === "on";
  const message = formData.get("message") as string;

  if (!firstName || !lastName || !email || !message) {
    return { error: "Please fill in all required fields." };
  }

  const { error } = await resend.emails.send({
    from: "Higher Wage Wisconsin <noreply@higher-wage-wisconsin.vercel.app>",
    to: process.env.CONTACT_EMAIL!,
    subject: `New join request from ${firstName} ${lastName}`,
    text: [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Newsletter: ${newsletter ? "Yes" : "No"}`,
      ``,
      message,
    ].join("\n"),
  });

  if (error) {
    return { error: "Failed to send. Please try again." };
  }

  return { success: true };
}
