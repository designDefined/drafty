import { messageIntentPolicy, messageViewPolicy } from "./message";
import { userIntentPolicy, userViewPolicy } from "./user";

export const viewPolicy = {
  user: userViewPolicy,
  message: messageViewPolicy,
};

export const intentPolicy = {
  user: userIntentPolicy,
  message: messageIntentPolicy,
};

export const policy = {
  user: { view: userViewPolicy, intent: userIntentPolicy },
  message: { view: messageViewPolicy, intent: messageIntentPolicy },
};
