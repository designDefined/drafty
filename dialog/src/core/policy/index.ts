import { userIntentPolicy, userViewPolicy } from "./user";

export const intentPolicy = {
  user: userIntentPolicy,
};

export const viewPolicy = {
  user: userViewPolicy,
};

export const policy = {
  user: { view: userViewPolicy, intent: userIntentPolicy },
};
