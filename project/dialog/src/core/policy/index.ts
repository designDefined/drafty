import queryClient from "../external/queryClient";
import { integrateWithReact } from "../../../../../library/pvi/react";
import { intentPolicy } from "./intentPolicy";
import { viewPolicy } from "./viewPolicy";

export const {
  policy,
  hooks: { useView, useStaticView, useViewState, useIntent },
} = integrateWithReact({
  viewPolicy,
  intentPolicy,
  queryClient,
});
