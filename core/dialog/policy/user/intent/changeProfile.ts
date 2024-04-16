import { IP } from "@policy-maker/core";
import { User } from "../../../entity/user";

export const IPChangeProfile = IP(() => ({
  key: ["user", "changeProfile"],
  model: { input: User.pick({ name: true }), output: User },
  connect: [],
}));
