import { z } from "zod";

export const PAGE_TOKEN = z.string().min(1);
export type PAGE_TOKEN = z.infer<typeof PAGE_TOKEN>;

export const PAGE_NUMBER = z.number().int().nonnegative();
export type PAGE_NUMBER = z.infer<typeof PAGE_NUMBER>;
