import { createIntentPolicyFactory, createViewPolicyFactory } from "./core";
import { createIntentHooks, createViewHooks } from "./hooks";

const PVI = {
  createViewPolicyFactory,
  createIntentPolicyFactory,
  createViewHooks,
  createIntentHooks,
};

export default PVI;
