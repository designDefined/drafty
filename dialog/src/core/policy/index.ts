import PVI from "@lib/core/pvi/react";
import { intentPolicy } from "./intentPolicy";
import { viewPolicy } from "./viewPolicy";

export const { useView, useStaticView } = PVI.createViewHooks(viewPolicy);
export const { useIntent } = PVI.createIntentHooks(intentPolicy);

export const policy = { view: viewPolicy, intent: intentPolicy };
