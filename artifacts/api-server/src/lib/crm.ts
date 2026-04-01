/**
 * CRM Abstraction Layer for GTA Home Search
 *
 * Dispatches new leads to one or more configured destinations:
 *   1. Follow Up Boss  (set FOLLOW_UP_BOSS_API_KEY)
 *   2. Zapier / webhook (set WEBHOOK_URL)
 *   3. Email via Resend (set RESEND_API_KEY + NOTIFICATION_EMAIL)
 */

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
// ============================================================
async function sendToWebhook(lead: LeadData): Promise<boolean> {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) return false;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        timestamp: new Date().toISOString(),
        site: "mygtahomesearch.com",
      }),
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
// EMAIL via RESEND  (resend.com — free, no App Password needed)
// Set: RESEND_API_KEY   → your Resend API key
//      NOTIFICATION_EMAIL → where you want to receive alerts
// ============================================================
async function sendResendEmail(lead: LeadData): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;
  if (!apiKey || !to) return false;

  const typeLabel =
    lead.leadType === "buyer" ? "Buyer" :
    lead.leadType === "seller" ? "Seller" : "General Inquiry";

  const subject = `New ${typeLabel} Lead — ${lead.name}`;

  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ...(lead.phone ? [["Phone", lead.phone] as [string, string]] : []),
    ["Lead Type", typeLabel],
    ["Source", lead.source],
    ...(lead.areaOfInterest ? [["Area of Interest", lead.areaOfInterest] as [string, string]] : []),
    ...(lead.timeline ? [["Timeline", lead.timeline] as [string, string]] : []),
    ...(lead.budget ? [["Budget", lead.budget] as [string, string]] : []),
    ...(lead.address ? [["Property Address", lead.address] as [string, string]] : []),
  ];

  const tableRows = rows
    .map(([label, value]) =>
      `<tr>
        <td style="padding:10px 14px;background:#f1f5f9;font-weight:600;color:#374151;white-space:nowrap;border-bottom:1px solid #e2e8f0;font-size:13px;">${label}</td>
        <td style="padding:10px 14px;color:#111827;border-bottom:1px solid #e2e8f0;font-size:13px;">${value}</td>
      </tr>`
    )
    .join("");

  const messageBlock = lead.message
    ? `<div style="margin-top:20px;padding:16px;background:#f8fafc;border-left:4px solid #1e3a5f;border-radius:4px;">
        <p style="margin:0 0 6px;font-weight:600;color:#374151;font-size:13px;">Message</p>
        <p style="margin:0;color:#111827;line-height:1.6;font-size:13px;">${lead.message.replace(/\n/g, "<br>")}</p>
      </div>`
    : "";

  const timestamp = new Date().toLocaleString("en-CA", {
    timeZone: "America/Toronto",
    dateStyle: "full",
    timeStyle: "short",
  });

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;">
      <div style="background:#1e3a5f;padding:24px 28px;">
        <h1 style="margin:0 0 4px;color:#ffffff;font-size:18px;font-weight:700;">New Lead — GTA Home Search</h1>
        <p style="margin:0;color:#93c5fd;font-size:13px;">${timestamp}</p>
      </div>
      <div style="padding:24px 28px;">
        <table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">
          ${tableRows}
        </table>
        ${messageBlock}
        <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e2e8f0;display:flex;gap:12px;">
          <a href="mailto:${lead.email}" style="display:inline-block;padding:10px 20px;background:#1e3a5f;color:#ffffff;text-decoration:none;border-radius:6px;font-size:13px;font-weight:600;">
            Reply to ${lead.name}
          </a>
          <a href="https://mygtahomesearch.com/admin/dashboard" style="display:inline-block;padding:10px 20px;background:#f1f5f9;color:#374151;text-decoration:none;border-radius:6px;font-size:13px;font-weight:600;">
            View All Leads
          </a>
        </div>
        <p style="margin:20px 0 0;font-size:11px;color:#94a3b8;">This notification was sent from mygtahomesearch.com</p>
      </div>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "GTA Home Search <onboarding@resend.dev>",
        to: [to],
        subject,
        html,
        text: formatLeadNote(lead),
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      logger.error({ status: response.status, body }, "Resend API error");
      return false;
    }

    logger.info({ to, source: lead.source }, "Email notification sent via Resend");
    return true;
  } catch (err) {
    logger.error({ err }, "Failed to send email via Resend");
    return false;
  }
}

function formatLeadNote(lead: LeadData): string {
  const lines = [`New lead from ${lead.source}`];
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

export async function dispatchLead(lead: LeadData): Promise<void> {
  const [fub, webhook, email] = await Promise.allSettled([
    sendToFollowUpBoss(lead),
    sendToWebhook(lead),
    sendResendEmail(lead),
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
