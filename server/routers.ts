import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getUserTasks, getTaskById, createTask, updateTask, deleteTask, getTaskStats } from "./db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  tasks: router({
    list: protectedProcedure
      .input(z.object({
        status: z.string().optional(),
        priority: z.string().optional(),
        category: z.string().optional(),
        search: z.string().optional(),
      }))
      .query(async ({ ctx, input }) => {
        return getUserTasks(ctx.user.id, input);
      }),

    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const task = await getTaskById(input.id, ctx.user.id);
        if (!task) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Task not found" });
        }
        return task;
      }),

    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1, "Title is required").max(255),
        description: z.string().max(500).optional(),
        priority: z.enum(["low", "medium", "high"]).default("medium"),
        status: z.enum(["todo", "in-progress", "done"]).default("todo"),
        dueDate: z.date().optional(),
        category: z.enum(["Work", "Personal", "Study", "Other"]).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await createTask(ctx.user.id, input);
        const tasks = await getUserTasks(ctx.user.id, {});
        return tasks[tasks.length - 1];
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).max(255).optional(),
        description: z.string().max(500).optional(),
        priority: z.enum(["low", "medium", "high"]).optional(),
        status: z.enum(["todo", "in-progress", "done"]).optional(),
        dueDate: z.date().optional(),
        category: z.enum(["Work", "Personal", "Study", "Other"]).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;
        const task = await getTaskById(id, ctx.user.id);
        if (!task) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Task not found" });
        }
        await updateTask(id, ctx.user.id, data);
        const updated = await getTaskById(id, ctx.user.id);
        return updated;
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const task = await getTaskById(input.id, ctx.user.id);
        if (!task) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Task not found" });
        }
        await deleteTask(input.id, ctx.user.id);
        return { success: true };
      }),

    stats: protectedProcedure
      .query(async ({ ctx }) => {
        return getTaskStats(ctx.user.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
