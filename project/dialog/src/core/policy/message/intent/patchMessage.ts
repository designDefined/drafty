import { Message } from "../../../base/entity/message";
import { IP } from "../../../policy/intentPolicyFactory";
const input = Message.pick({ text: true }).partial();
const output = Message;

export const IPPatchMessage = IP(() => ({
  key: ["message", "patchMessage"],
  model: { input, output },
  connect: (view, { output }) => [
    view.message
      .messages()
      .map((prev) =>
        prev.map((item) => (item.id === output.id ? output : item)),
      ),
  ],
}));
