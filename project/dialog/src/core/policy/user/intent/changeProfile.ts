import { User } from "../../../base/entity/user";
import { IP } from "../../../policy/intentPolicyFactory";

const input = User.pick({ name: true });
const output = User;

export const IPChangeProfile = IP(() => ({
  key: ["user", "changeProfile"],
  model: { input, output },
  connect: (view) => [view.user.me().invalidate()],
}));
