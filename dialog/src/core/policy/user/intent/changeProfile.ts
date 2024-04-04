import { User } from "@core/base/entity/user";
import { viewPolicy } from "@core/policy";
import PVI from "@lib/core/pvi";

const input = User.pick({ name: true });
const output = User;

export const IPChangeProfile = PVI.intent(() => ({
  key: ["user", "changeProfile"],
  model: { input, output },
  connect: () => [viewPolicy.user.me().revalidate()],
}));
