import { Identified } from "@/core/base/util/identified";
import { Typed } from "@/core/base/util/typed";
import { z } from "zod";

export const MessageDto = Identified.message.extend({
  text: z.string().min(1),
  createTime: z.string().min(1),
});
export type MessageDto = Typed<typeof MessageDto>;
