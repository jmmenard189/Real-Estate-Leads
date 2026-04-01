import { db } from "@workspace/db";
import { adminUsersTable } from "@workspace/db";
import { hashPassword } from "./password";
import { logger } from "./logger";

export async function seedAdmin(): Promise<void> {
  try {
    const existing = await db.select().from(adminUsersTable).limit(1);
    if (existing.length > 0) return;

    const passwordHash = await hashPassword("Jean7898!");
    await db.insert(adminUsersTable).values({
      username: "jmmenard189",
      passwordHash,
      role: "super_admin",
    });
    logger.info("Default admin account created successfully.");
  } catch (err) {
    logger.error({ err }, "Failed to seed admin user");
  }
}
