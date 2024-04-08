import PVI from "@pvi/react";
import { intentPolicy } from "./intentPolicy";
import { viewPolicy } from "./viewPolicy";

export const { useView, useStaticView, useViewState } =
  PVI.createViewHooks(viewPolicy);
export const { useIntent } = PVI.createIntentHooks(intentPolicy);

export const policy = { view: viewPolicy, intent: intentPolicy };
