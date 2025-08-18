import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
  requireTLS: Number(process.env.SMTP_PORT || 587) === 587,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { name = "", email = "", message = "", company = "" } = req.body || {};
  if (company) return res.status(200).json({ ok: true }); // honeypot
  if (!name || !message || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return res.status(400).json({ error: "Bad input" });
  }

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,     // e.g. "Website <frazer@printimpact.com.au>"
      to: process.env.MAIL_TO,         // e.g. "frazer@printimpact.com.au"
      replyTo: `${name} <${email}>`,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    res.status(200).json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Send failed" });
  }
}
