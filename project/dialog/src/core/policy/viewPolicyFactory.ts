import PVI from "@pvi/react";
import queryClient from "../external/queryClient";

export const VP = PVI.createViewPolicyFactory(queryClient);
