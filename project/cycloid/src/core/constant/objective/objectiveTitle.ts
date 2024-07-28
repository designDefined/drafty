import { z } from "zod";

export const OBJECTIVE_TITLE = z.string().min(2).max(40);
export type OBJECTIVE_TITLE = z.infer<typeof OBJECTIVE_TITLE>;
