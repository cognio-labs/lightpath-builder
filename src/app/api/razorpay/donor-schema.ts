import { z } from "zod";

export const donorSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, ""))
    .pipe(z.string().regex(/^(\+?91)?[6-9]\d{9}$/)),
  pan: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
    .optional()
    .or(z.literal("").transform(() => undefined)),
});
