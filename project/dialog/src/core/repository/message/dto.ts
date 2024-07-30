import { Identified } from "@core/entity/util/identified";
import { z } from "zod";

export const MessageDto = Identified.message.extend({
  text: z.string().min(1),
  createTime: z.string().min(1),
});
export type MessageDto = z.infer<typeof MessageDto>;
