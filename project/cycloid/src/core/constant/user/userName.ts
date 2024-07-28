import { z } from "zod";

export const USER_NAME = z.string().min(2).max(40);
export type USER_NAME = z.infer<typeof USER_NAME>;
