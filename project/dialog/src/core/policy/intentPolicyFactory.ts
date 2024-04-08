import PVI from "@pvi/react";
import { viewPolicy } from "./viewPolicy";

export const IP = PVI.createIntentPolicyFactory(viewPolicy);
