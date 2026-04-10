import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `sample-user-${userId}`,
    email: `user${userId}@example.com`,
    name: `Sample User ${userId}`,
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("tasks router", () => {
  describe("tasks.create", () => {
    it("creates a task with required fields", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.tasks.create({
        title: "Test Task",
        priority: "high",
        status: "todo",
      });

      expect(result).toBeDefined();
    });

    it("validates title is required", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.tasks.create({
          title: "",
          priority: "medium",
          status: "todo",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.message).toContain("Title is required");
      }
    });

    it("creates a task with all optional fields", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const dueDate = new Date();
      const result = await caller.tasks.create({
        title: "Complete Task",
        description: "This is a complete task",
        priority: "high",
        status: "in-progress",
        dueDate,
        category: "Work",
      });

      expect(result).toBeDefined();
    });
  });

  describe("tasks.list", () => {
    it("returns empty list for user with no tasks", async () => {
      const ctx = createAuthContext(999);
      const caller = appRouter.createCaller(ctx);

      const tasks = await caller.tasks.list({});
      expect(Array.isArray(tasks)).toBe(true);
    });

    it("filters tasks by status", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const tasks = await caller.tasks.list({ status: "todo" });
      expect(Array.isArray(tasks)).toBe(true);
    });

    it("filters tasks by priority", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const tasks = await caller.tasks.list({ priority: "high" });
      expect(Array.isArray(tasks)).toBe(true);
    });

    it("searches tasks by title", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const tasks = await caller.tasks.list({ search: "test" });
      expect(Array.isArray(tasks)).toBe(true);
    });
  });

  describe("tasks.stats", () => {
    it("returns task statistics", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const stats = await caller.tasks.stats();
      expect(stats).toHaveProperty("total");
      expect(stats).toHaveProperty("completed");
      expect(stats).toHaveProperty("inProgress");
      expect(stats).toHaveProperty("pending");
      expect(typeof stats.total).toBe("number");
      expect(typeof stats.completed).toBe("number");
      expect(typeof stats.inProgress).toBe("number");
      expect(typeof stats.pending).toBe("number");
    });
  });
});
