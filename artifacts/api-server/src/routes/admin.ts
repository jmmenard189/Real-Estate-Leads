import { Router, type Request, type Response, type NextFunction } from "express";
import { db } from "@workspace/db";
import { leadsTable, adminUsersTable } from "@workspace/db";
import { eq, desc, ilike, or, sql } from "drizzle-orm";
import { hashPassword, verifyPassword } from "../lib/password";
import { z } from "zod";

const router = Router();

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.adminUserId) {
    res.status(401).json({ error: "UNAUTHORIZED", message: "Please log in to access this area." });
    return;
  }
  next();
}

function requireSuperAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.adminUserId || req.session.adminRole !== "super_admin") {
    res.status(403).json({ error: "FORBIDDEN", message: "Insufficient permissions." });
    return;
  }
  next();
}

// POST /api/admin/login
router.post("/admin/login", async (req, res) => {
  const schema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "INVALID_INPUT", message: "Username and password are required." });
    return;
  }
  const { username, password } = parsed.data;
  try {
    const [adminUser] = await db
      .select()
      .from(adminUsersTable)
      .where(eq(adminUsersTable.username, username))
      .limit(1);
    if (!adminUser) {
      res.status(401).json({ error: "INVALID_CREDENTIALS", message: "Invalid username or password." });
      return;
    }
    const valid = await verifyPassword(password, adminUser.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "INVALID_CREDENTIALS", message: "Invalid username or password." });
      return;
    }
    req.session.adminUserId = adminUser.id;
    req.session.adminUsername = adminUser.username;
    req.session.adminRole = adminUser.role;
    res.json({ id: adminUser.id, username: adminUser.username, role: adminUser.role });
  } catch (err) {
    res.status(500).json({ error: "SERVER_ERROR", message: "An error occurred." });
  }
});

// POST /api/admin/logout
router.post("/admin/logout", requireAuth, (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

// GET /api/admin/me
router.get("/admin/me", requireAuth, (req, res) => {
  res.json({
    id: req.session.adminUserId,
    username: req.session.adminUsername,
    role: req.session.adminRole,
  });
});

// GET /api/admin/leads
router.get("/admin/leads", requireAuth, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 25));
    const offset = (page - 1) * limit;
    const search = (req.query.search as string) ?? "";
    const leadType = (req.query.type as string) ?? "";
    const status = (req.query.status as string) ?? "";

    const conditions: ReturnType<typeof ilike>[] = [];

    if (search) {
      conditions.push(
        or(
          ilike(leadsTable.name, `%${search}%`),
          ilike(leadsTable.email, `%${search}%`),
          ilike(leadsTable.phone, `%${search}%`),
        )!,
      );
    }
    if (leadType) conditions.push(eq(leadsTable.leadType, leadType) as any);
    if (status) conditions.push(eq(leadsTable.status, status) as any);

    const whereClause = conditions.length > 0
      ? conditions.reduce((acc, c) => sql`${acc} AND ${c}` as any)
      : undefined;

    const [leads, countResult] = await Promise.all([
      whereClause
        ? db.select().from(leadsTable).where(whereClause as any).orderBy(desc(leadsTable.createdAt)).limit(limit).offset(offset)
        : db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt)).limit(limit).offset(offset),
      whereClause
        ? db.select({ count: sql<number>`count(*)` }).from(leadsTable).where(whereClause as any)
        : db.select({ count: sql<number>`count(*)` }).from(leadsTable),
    ]);

    const total = Number(countResult[0]?.count ?? 0);

    res.json({
      leads,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    res.status(500).json({ error: "SERVER_ERROR", message: "Failed to fetch leads." });
  }
});

// PATCH /api/admin/leads/:id — update lead status
router.patch("/admin/leads/:id", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id);
  const schema = z.object({ status: z.enum(["new", "contacted", "qualified", "lost"]) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success || isNaN(id)) {
    res.status(400).json({ error: "INVALID_INPUT" });
    return;
  }
  try {
    const [updated] = await db
      .update(leadsTable)
      .set({ status: parsed.data.status, updatedAt: new Date() })
      .where(eq(leadsTable.id, id))
      .returning();
    if (!updated) {
      res.status(404).json({ error: "NOT_FOUND" });
      return;
    }
    res.json(updated);
  } catch {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
});

// GET /api/admin/leads/export — download CSV
router.get("/admin/leads/export", requireAuth, async (req, res) => {
  try {
    const leads = await db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt));
    const headers = ["ID", "Name", "Email", "Phone", "Type", "Source", "Area", "Timeline", "Budget", "Status", "Message", "Created At"];
    const rows = leads.map((l) => [
      l.id,
      `"${(l.name ?? "").replace(/"/g, '""')}"`,
      `"${(l.email ?? "").replace(/"/g, '""')}"`,
      `"${(l.phone ?? "").replace(/"/g, '""')}"`,
      l.leadType,
      l.source,
      `"${(l.areaOfInterest ?? "").replace(/"/g, '""')}"`,
      `"${(l.timeline ?? "").replace(/"/g, '""')}"`,
      `"${(l.budget ?? "").replace(/"/g, '""')}"`,
      l.status,
      `"${(l.message ?? "").replace(/"/g, '""')}"`,
      l.createdAt.toISOString(),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`);
    res.send(csv);
  } catch {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
});

// GET /api/admin/users — list admin users (super_admin only)
router.get("/admin/users", requireAuth, requireSuperAdmin, async (_req, res) => {
  try {
    const users = await db
      .select({ id: adminUsersTable.id, username: adminUsersTable.username, role: adminUsersTable.role, createdAt: adminUsersTable.createdAt })
      .from(adminUsersTable)
      .orderBy(adminUsersTable.createdAt);
    res.json(users);
  } catch {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
});

// POST /api/admin/users — create admin user (super_admin only)
router.post("/admin/users", requireAuth, requireSuperAdmin, async (req, res) => {
  const schema = z.object({
    username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    password: z.string().min(8),
    role: z.enum(["admin", "super_admin"]).default("admin"),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "INVALID_INPUT", message: parsed.error.issues[0]?.message ?? "Invalid input." });
    return;
  }
  try {
    const existing = await db.select().from(adminUsersTable).where(eq(adminUsersTable.username, parsed.data.username)).limit(1);
    if (existing.length > 0) {
      res.status(409).json({ error: "CONFLICT", message: "Username already exists." });
      return;
    }
    const passwordHash = await hashPassword(parsed.data.password);
    const [created] = await db.insert(adminUsersTable).values({
      username: parsed.data.username,
      passwordHash,
      role: parsed.data.role,
    }).returning({ id: adminUsersTable.id, username: adminUsersTable.username, role: adminUsersTable.role, createdAt: adminUsersTable.createdAt });
    res.status(201).json(created);
  } catch {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
});

// DELETE /api/admin/users/:id (super_admin only, can't delete self)
router.delete("/admin/users/:id", requireAuth, requireSuperAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "INVALID_INPUT" });
    return;
  }
  if (id === req.session.adminUserId) {
    res.status(400).json({ error: "CANNOT_DELETE_SELF", message: "You cannot delete your own account." });
    return;
  }
  try {
    const [deleted] = await db.delete(adminUsersTable).where(eq(adminUsersTable.id, id)).returning();
    if (!deleted) {
      res.status(404).json({ error: "NOT_FOUND" });
      return;
    }
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
});

export default router;
