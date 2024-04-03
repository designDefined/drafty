import { IPChangeProfile } from "./intent/changeProfile";
import { VPMe } from "./view/me";

export const userViewPolicy = {
  me: VPMe,
};

export const userIntentPolicy = {
  changeProfile: IPChangeProfile,
};
