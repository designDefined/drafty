import { IP } from "@core/policy/intentPolicyFactory";
import { Message } from "@/core/base/entity/message";

const input = Message.pick({ text: true });
const output = Message;

export const IPSendMessage = IP(() => ({
  key: ["message", "sendMessage"],
  model: { input, output },
  connect: (view, { output }) => [
    view.message.messages().map((prev) => [output, ...prev]),
  ],
}));
