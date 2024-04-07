import PVI from "@lib/core/pvi/react";
import { viewPolicy } from "./viewPolicy";

export const IP = PVI.createIntentPolicyFactory(viewPolicy);
