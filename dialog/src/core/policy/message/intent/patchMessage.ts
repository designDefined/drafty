import { Message } from "@/core/base/entity/message";
import { viewPolicy } from "@/core/policy";
import PVI from "@lib/core/pvi/react";

const input = Message.pick({ text: true }).partial();
const output = Message;

export const IPPatchMessage = PVI.intent(() => ({
  key: ["message", "patchMessage"],
  model: { input, output },
  connect: ({ output }) => [
    viewPolicy.message
      .messages()
      .map((prev) =>
        prev.map((item) => (item.id === output.id ? output : item)),
      ),
  ],
}));
