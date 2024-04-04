import { Message } from "@/core/base/entity/message";
import { viewPolicy } from "@/core/policy";
import PVI from "@lib/core/pvi/react";

const input = Message.pick({ text: true });
const output = Message;

export const IPSendMessage = PVI.intent(() => ({
  key: ["message", "sendMessage"],
  model: { input, output },
  connect: () => [viewPolicy.message.messages().revalidate()],
}));
