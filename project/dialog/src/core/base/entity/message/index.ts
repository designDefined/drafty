import { z } from "zod";
import { Identified } from "@/core/base/util/identified";
import { Typed } from "@/core/base/util/typed";

export const Message = Identified.message.extend({
  text: z.string().min(1),
  createTime: z.string().min(1),
});
export type Message = Typed<typeof Message>;

export const FakeMessage = Identified.fakeMessage.extend({
  text: z.string().min(1),
});
export type FakeMessage = Typed<typeof FakeMessage>;
