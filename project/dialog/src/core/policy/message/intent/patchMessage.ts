import { Message } from "@core/entity/message";
import { viewPolicy } from "@core/policy/view";
import { IP } from "@policy-maker-old/core";

const input = Message.pick({ text: true }).partial();
const output = Message;

export const IPPatchMessage = IP(() => ({
  key: ["message", "patchMessage"],
  model: { input, output },
  connect: ({ output }) => [
    // viewPolicy.message
    //   .messages()
    //   .map((prev) =>
    //     prev.map((item) => (item.id === output.id ? output : item)),
    //   ),
  ],
}));
