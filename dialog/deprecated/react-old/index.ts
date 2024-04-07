import { createIntentPolicyFactory, createViewPolicyFactory } from "./core";
import { useView, useStaticView, useIntent } from "./hooks";

const PVI = {
  createViewPolicyFactory,
  createIntentPolicyFactory,
};

export { PVI, useView, useStaticView, useIntent };
