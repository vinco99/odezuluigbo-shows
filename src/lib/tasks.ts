import { prisma } from "@/lib/prisma";

export const TASK_KIND_LABEL: Record<string, string> = {
  VIDEO: "Watch video",
  SOCIAL: "Social share",
  SURVEY: "Survey",
  CUSTOM: "Custom",
};

export const TASK_VERIFICATION_LABEL: Record<string, string> = {
  AUTO: "Automatic",
  TIMED: "Timed",
  MANUAL: "Manual review",
};

/** Human-readable reward description, e.g. "+50 vote credits · once per 24h" */
export function describeReward(task: {
  reward: number;
  cooldownHours: number | null;
  maxCompletions: number | null;
}) {
  const parts = [`+${task.reward} credit${task.reward === 1 ? "" : "s"}`];
  if (task.cooldownHours) {
    parts.push(`every ${task.cooldownHours}h`);
  } else if (task.maxCompletions && task.maxCompletions > 1) {
    parts.push(`up to ${task.maxCompletions}×`);
  } else {
    parts.push("one-time");
  }
  return parts.join(" · ");
}