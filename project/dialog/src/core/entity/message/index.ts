import { TypeOf, z } from "zod";
import { Identified } from "../util/identified";

export const Message = Identified.message.extend({
  text: z.string().min(1),
  createTime: z.string().min(1),
});
export type Message = TypeOf<typeof Message>;

export const PendingMessage = Identified.pendingMessage.extend({
  text: z.string().min(1),
});
export type PendingMessage = TypeOf<typeof PendingMessage>;
