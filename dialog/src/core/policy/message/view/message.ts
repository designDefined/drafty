import { Message } from "@/core/base/entity/message";
import PVI from "@lib/core/pvi/react";

export const VPMessage = PVI.view<[Message["id"]], typeof Message>(
  (messageId) => ({
    key: ["message", { message: messageId }],
    model: Message,
  }),
);
