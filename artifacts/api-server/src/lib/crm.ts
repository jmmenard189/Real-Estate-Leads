/**
 * CRM Abstraction Layer for GTA Home Search
 *
 * Dispatches new leads to one or more configured destinations:
 *   1. Follow Up Boss (if FOLLOW_UP_BOSS_API_KEY is set)
 *   2. Zapier / custom webhook (if WEBHOOK_URL is set)
 *   3. Email notification (if NOTIFICATION_EMAIL + EMAIL_USER + EMAIL_PASS are set)
 *
 * Set environment variables in your Replit Secrets panel.
 */

import nodemailer from "nodemailer";
import { logger } from "./logger";

export interface LeadData {
  name: string;
  email: string;
  phone?: string | null;
  message?: string | null;
  source: string;
  leadType: string;
  address?: string | null;
  areaOfInterest?: string | null;
  timeline?: string | null;
  budget?: string | null;
}

// ============================================================
// FOLLOW UP BOSS
// Set: FOLLOW_UP_BOSS_API_KEY
// ============================================================
async function sendToFollowUpBoss(lead: LeadData): Promise<boolean> {
  const apiKey = process.env.FOLLOW_UP_BOSS_API_KEY;
  if (!apiKey) return false;

  try {
    const payload = {
      source: process.env.FOLLOW_UP_BOSS_SYSTEM || "mygtahomesearch",
      person: {
        name: lead.name,
        emails: [{ value: lead.email, type: "work" }],
        phones: lead.phone ? [{ value: lead.phone, type: "mobile" }] : [],
        tags: [lead.source, `leadtype-${lead.leadType}`],
      },
      notes: lead.message ? [{ body: formatLeadNote(lead) }] : [],
    };

    const response = await fetch("https://api.followupboss.com/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      logger.error({ status: response.status }, "Follow Up Boss API error");
      return false;
    }

    logger.info({ source: lead.source }, "Lead sent to Follow Up Boss");
    return true;
  } catch (err) {
    logger.error({ err }, "Failed to send lead to Follow Up Boss");
    return false;
  }
}

// ============================================================
// ZAPIER / WEBHOOK
// Set: WEBHOOK_URL
// ============================================================
async function sendToWebhook(lead: LeadData): Promise<boolean> {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) return false;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, timestamp: new Date().toISOString(), site: "mygtahomesearch.com" }),
    });

    if (!response.ok) {
      logger.error({ status: response.status }, "Webhook delivery error");
      return false;
    }

    logger.info({ source: lead.source }, "Lead sent to webhook");
    return true;
  } catch (err) {
    logger.error({ err }, "Failed to send lead to webhook");
    return false;
  }
}

// ============================================================
// EMAIL NOTIFICATION
// Set: NOTIFICATION_EMAIL (who receives the alert)
//      EMAIL_USER         (Gmail address you send from)
//      EMAIL_PASS         (Gmail App Password — 16 chars, no spaces)
//
// How to get a Gmail App Password:
//   1. Go to myaccount.google.com > Security
//   2. Turn on 2-Step Verification (if not already on)
//   3. Search "App passwords" in the Google account search bar
//   4. Create an app password — copy the 16-character code
//   5. Paste it (without spaces) as EMAIL_PASS in Replit Secrets
// ============================================================
async function sendEmailNotification(lead: LeadData): Promise<boolean> {
  const to = process.env.NOTIFICATION_EMAIL;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!to) {
    logger.info(
      { name: lead.name, email: lead.email, source: lead.source, leadType: lead.leadType },
      "New lead received — set NOTIFICATION_EMAIL to receive email alerts"
    );
    return false;
  }

  if (!user || !pass) {
    logger.warn(
      "NOTIFICATION_EMAIL is set but EMAIL_USER / EMAIL_PASS are missing — cannot send email"
    );
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT || 587),
      secure: false,
      auth: { user, pass },
    });

    const typeLabel =
      lead.leadType === "buyer" ? "Buyer" :
      lead.leadType === "seller" ? "Seller" : "General Inquiry";

    const subject = `New ${typeLabel} Lead — ${lead.name}`;

    const rows = [
      ["Name", lead.name],
      ["Email", lead.email],
      ...(lead.phone ? [["Phone", lead.phone]] : []),
      ["Lead Type", typeLabel],
      ["Source", lead.source],
      ...(lead.areaOfInterest ? [["Area of Interest", lead.areaOfInterest]] : []),
      ...(lead.timeline ? [["Timeline", lead.timeline]] : []),
      ...(lead.budget ? [["Budget", lead.budget]] : []),
      ...(lead.address ? [["Property Address", lead.address]] : []),
    ] as [string, string][];

    const tableRows = rows
      .map(([label, value]) =>
        `<tr>
          <td style="padding:8px 12px;background:#f8f9fa;font-weight:600;color:#374151;white-space:nowrap;border-bottom:1px solid #e5e7eb;">${label}</td>
          <td style="padding:8px 12px;color:#111827;border-bottom:1px solid #e5e7eb;">${value}</td>
        </tr>`
      )
      .join("");

    const messageBlock = lead.message
      ? `<div style="margin-top:20px;padding:16px;background:#f8f9fa;border-left:4px solid #1e3a5f;border-radius:4px;">
          <p style="margin:0 0 8px;font-weight:600;color:#374151;">Message</p>
          <p style="margin:0;color:#111827;line-height:1.6;">${lead.message.replace(/\n/g, "<br>")}</p>
        </div>`
      : "";

    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:#1e3a5f;padding:24px 32px;border-radius:8px 8px 0 0;">
          <h1 style="margin:0;color:#ffffff;font-size:20px;">New Lead — GTA Home Search</h1>
          <p style="margin:4px 0 0;color:#93c5fd;font-size:14px;">${new Date().toLocaleString("en-CA", { timeZone: "America/Toronto", dateStyle: "full", timeStyle: "short" })}</p>
        </div>
        <div style="padding:24px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
          <table style="width:100%;border-collapse:collapse;margin-bottom:8px;">
            ${tableRows}
          </table>
          ${messageBlock}
          <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb;">
            <a href="mailto:${lead.email}" style="display:inline-block;padding:10px 20px;background:#1e3a5f;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">Reply to ${lead.name}</a>
          </div>
          <p style="margin:16px 0 0;font-size:12px;color:#9ca3af;">This notification was sent from mygtahomesearch.com · <a href="https://mygtahomesearch.com/admin/dashboard" style="color:#9ca3af;">View all leads</a></p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"GTA Home Search" <${user}>`,
      to,
      subject,
      html,
      text: formatLeadNote(lead),
    });

    logger.info({ to, source: lead.source }, "Email notification sent");
    return true;
  } catch (err) {
    logger.error({ err }, "Failed to send email notification");
    return false;
  }
}

function formatLeadNote(lead: LeadData): string {
  const lines: string[] = [`New lead from ${lead.source}`];
  if (lead.leadType) lines.push(`Type: ${lead.leadType}`);
  if (lead.name) lines.push(`Name: ${lead.name}`);
  if (lead.email) lines.push(`Email: ${lead.email}`);
  if (lead.phone) lines.push(`Phone: ${lead.phone}`);
  if (lead.areaOfInterest) lines.push(`Area of Interest: ${lead.areaOfInterest}`);
  if (lead.address) lines.push(`Property Address: ${lead.address}`);
  if (lead.timeline) lines.push(`Timeline: ${lead.timeline}`);
  if (lead.budget) lines.push(`Budget: ${lead.budget}`);
  if (lead.message) lines.push(`Message: ${lead.message}`);
  return lines.join("\n");
}

/**
 * Dispatch a lead to all configured destinations.
 */
export async function dispatchLead(lead: LeadData): Promise<void> {
  const [fub, webhook, email] = await Promise.allSettled([
    sendToFollowUpBoss(lead),
    sendToWebhook(lead),
    sendEmailNotification(lead),
  ]);

  logger.info(
    {
      source: lead.source,
      followUpBoss: fub.status === "fulfilled" ? fub.value : false,
      webhook: webhook.status === "fulfilled" ? webhook.value : false,
      email: email.status === "fulfilled" ? email.value : false,
    },
    "Lead dispatched"
  );
}
