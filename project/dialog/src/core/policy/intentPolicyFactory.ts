import { createIntentPolicy } from "@pvi/core";
import { viewPolicy } from "./viewPolicy";

export const IP = createIntentPolicy(viewPolicy);
