import { Message } from "@core/entity/message";
import { viewPolicy } from "@core/policy/view";
import { IP } from "@policy-maker/core";

const input = Message.pick({ text: true });
const output = Message;

export const IPSendMessage = IP(() => ({
  key: ["message", "sendMessage"],
  model: { input, output },
  connect: ({ output }) => [
    viewPolicy.message
      .messages()
      .map((prev) => ({ ...prev, data: [...prev.data, output] })),
  ],
}));
