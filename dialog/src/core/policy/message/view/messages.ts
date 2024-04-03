import { Message } from "@core/base/entity/message";
import PVI from "@lib/core/pvi";

export const VPMessages = PVI.view(() => ({
  key: ["message", "messages"],
  model: Message.array(),
}));
