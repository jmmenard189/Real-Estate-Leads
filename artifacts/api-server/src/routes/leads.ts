import { Router, type IRouter } from "express";
import { db, leadsTable } from "@workspace/db";
import { dispatchLead } from "../lib/crm";
import { z } from "zod";

const router: IRouter = Router();

const submitLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().optional(),
  source: z.string().min(1, "Source is required"),
  leadType: z.enum(["buyer", "seller", "general"]),
  address: z.string().optional(),
  areaOfInterest: z.string().optional(),
  timeline: z.string().optional(),
  budget: z.string().optional(),
});

router.post("/leads", async (req, res) => {
  const parsed = submitLeadSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: "VALIDATION_ERROR",
      message: parsed.error.issues.map((i) => i.message).join(", "),
    });
    return;
  }

  const leadData = parsed.data;

  try {
    // Save lead to database
    const [savedLead] = await db
      .insert(leadsTable)
      .values({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone ?? null,
        message: leadData.message ?? null,
        source: leadData.source,
        leadType: leadData.leadType,
        address: leadData.address ?? null,
        areaOfInterest: leadData.areaOfInterest ?? null,
        timeline: leadData.timeline ?? null,
        budget: leadData.budget ?? null,
      })
      .returning();

    // Dispatch to CRM (Follow Up Boss, webhook, or email) in the background
    // We don't await this so the user gets an instant response
    dispatchLead(leadData).catch((err) => {
      req.log.error({ err }, "Background CRM dispatch failed");
    });

    req.log.info(
      { leadId: savedLead.id, source: leadData.source },
      "Lead saved successfully"
    );

    res.json({
      success: true,
      message: "Thank you! We will be in touch shortly.",
      leadId: String(savedLead.id),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to save lead");
    res.status(500).json({
      error: "SERVER_ERROR",
      message: "Failed to process your request. Please try again.",
    });
  }
});

export default router;
