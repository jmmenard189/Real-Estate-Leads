/**
 * CRM Abstraction Layer for GTA Home Search
 *
 * This module handles sending leads to external CRM systems.
 * Currently configured for email fallback, but can be connected to:
 * - Follow Up Boss API (see FOLLOW_UP_BOSS section below)
 * - Zapier webhook
 * - Custom webhook endpoint
 *
 * HOW TO CONFIGURE:
 * Set the appropriate environment variables in your Replit secrets.
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
// FOLLOW UP BOSS INTEGRATION
// ============================================================
// To connect Follow Up Boss:
// 1. Get your API key from Follow Up Boss > Admin > API
// 2. Set environment variable: FOLLOW_UP_BOSS_API_KEY=your_api_key
// 3. Optionally set: FOLLOW_UP_BOSS_SYSTEM=mygtahomesearch
// Documentation: https://api.followupboss.com/
// ============================================================
async function sendToFollowUpBoss(lead: LeadData): Promise<boolean> {
  const apiKey = process.env.FOLLOW_UP_BOSS_API_KEY;
  if (!apiKey) {
    return false;
  }

  try {
    const payload = {
      source: process.env.FOLLOW_UP_BOSS_SYSTEM || "mygtahomesearch",
      person: {
        name: lead.name,
        emails: [{ value: lead.email, type: "work" }],
        phones: lead.phone ? [{ value: lead.phone, type: "mobile" }] : [],
        tags: [lead.source, `leadtype-${lead.leadType}`],
      },
      notes: lead.message
        ? [{ body: formatLeadNote(lead) }]
        : [],
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
// ZAPIER / WEBHOOK INTEGRATION
// ============================================================
// To connect Zapier or a custom webhook:
// 1. Create a Zap with "Webhooks by Zapier" as the trigger
// 2. Copy the webhook URL from Zapier
// 3. Set environment variable: WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...
// This also works with Make (Integromat), n8n, or any custom webhook receiver
// ============================================================
async function sendToWebhook(lead: LeadData): Promise<boolean> {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
// EMAIL NOTIFICATION FALLBACK
// ============================================================
// Set environment variable: NOTIFICATION_EMAIL=your@email.com
// Requires a transactional email service (e.g. SendGrid, Mailgun, Resend)
// For now this just logs to server console as a fallback
// ============================================================
async function sendEmailNotification(lead: LeadData): Promise<boolean> {
  const notificationEmail = process.env.NOTIFICATION_EMAIL;
  if (!notificationEmail) {
    // Log the lead to server console as a last resort fallback
    logger.info(
      {
        lead: {
          name: lead.name,
          email: lead.email,
          source: lead.source,
          leadType: lead.leadType,
        },
      },
      "New lead received (no notification method configured)"
    );
    return true;
  }

  // TODO: Integrate your email service here (Resend, SendGrid, Mailgun, etc.)
  logger.info(
    { email: notificationEmail, source: lead.source },
    "Email notification would be sent (not yet implemented)"
  );
  return true;
}

function formatLeadNote(lead: LeadData): string {
  const lines: string[] = [`New lead from ${lead.source}`];
  if (lead.leadType) lines.push(`Type: ${lead.leadType}`);
  if (lead.areaOfInterest) lines.push(`Area of Interest: ${lead.areaOfInterest}`);
  if (lead.address) lines.push(`Property Address: ${lead.address}`);
  if (lead.timeline) lines.push(`Timeline: ${lead.timeline}`);
  if (lead.budget) lines.push(`Budget: ${lead.budget}`);
  if (lead.message) lines.push(`Message: ${lead.message}`);
  return lines.join("\n");
}

/**
 * Main function to dispatch a lead to all configured CRM destinations.
 * Tries Follow Up Boss first, then webhook, then email fallback.
 */
export async function dispatchLead(lead: LeadData): Promise<void> {
  const results = await Promise.allSettled([
    sendToFollowUpBoss(lead),
    sendToWebhook(lead),
    sendEmailNotification(lead),
  ]);

  const successCount = results.filter(
    (r) => r.status === "fulfilled" && r.value === true
  ).length;

  logger.info(
    { source: lead.source, successCount },
    "Lead dispatched to CRM destinations"
  );
}
