import { z } from "zod";

export function slugify(value: string) {
    return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const contestantApplicationSchema = z
  .object({
    eventId: z.string().min(1),
    name: z.string().min(2),
    age: z.coerce.number().int().min(16).max(30),
    phone: z.string().min(7),
    email: z.string().email(),
    state: z.string().min(1),
    city: z.string().min(1),

    institution: z.string().optional(),
    course: z.string().optional(),
    occupation: z.string().optional(),

    instagram: z.string().optional(),
    facebook: z.string().optional(),
    tiktok: z.string().optional(),

    talent: z.string().optional(),
    bio: z.string().min(1),

    portrait: z.string().url(),
    portraitPublicId: z.string().min(1),
    fullPhoto: z.string().url(),
    fullPhotoPublicId: z.string().min(1),

    guardianName: z.string().optional(),
    guardianRelation: z.string().optional(),
    guardianPhone: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const isMinor = data.age === 16 || data.age === 17;
    if (!isMinor) return;

    for (const field of ["guardianName", "guardianRelation", "guardianPhone"] as const) {
      if (!data[field] || data[field]!.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [field],
          message: `${field} is required for applicants aged 16–17`,
        });
      }
    }
  });

export type ContestantApplicationInput = z.infer<typeof contestantApplicationSchema>;