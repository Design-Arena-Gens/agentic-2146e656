"use server";

import { z } from "zod";
import { persistBlueprint } from "@/lib/persistence";
import { runForgePipeline } from "@/lib/forge-engine";
import type { ForgeBrief } from "@/lib/types";

const briefSchema = z.object({
  brandName: z.string().min(2),
  brandTagline: z.string().min(2),
  projectGoals: z.string().min(10),
  targetAudience: z.string().min(3),
  tone: z.enum(["playful", "professional", "elevated", "experimental", "friendly"]),
  keyFeatures: z.array(z.string().min(2)).min(1),
  integrations: z.array(z.string()),
  enableBooking: z.boolean().default(false),
  enablePayments: z.boolean().default(false),
});

export type BuildBlueprintPayload = z.infer<typeof briefSchema>;

export const buildBlueprint = async (payload: BuildBlueprintPayload) => {
  const parsed = briefSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false as const,
      error: "Invalid input",
      issues: parsed.error.issues,
    };
  }

  const brief = parsed.data as ForgeBrief;
  const blueprint = await runForgePipeline(brief);
  await persistBlueprint(blueprint);

  return {
    success: true as const,
    blueprint,
  };
};
