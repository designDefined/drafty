import { PolicyKey } from "./function/common";
import {
  IP,
  IntentPolicy,
  IntentModel,
  ImplementedIntentPolicy,
} from "./function/intent";
import {
  VP,
  ViewPolicy,
  ViewModel,
  ImplementedViewPolicy,
} from "./function/view";
/**
 * functions
 */
export { VP, IP };

/**
 * types
 */
export type {
  ViewPolicy,
  ImplementedViewPolicy,
  IntentPolicy,
  ImplementedIntentPolicy,
  PolicyKey,
  ViewModel,
  IntentModel,
};
