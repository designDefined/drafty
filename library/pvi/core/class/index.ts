// import { ZodType } from "zod";
// import { AnyViewPolicyRecords } from "../types/typesAny";
// import { ZodAnyObject } from "../adapter/zod/types";
// import { ViewModel, ViewPolicyParam } from "../types/view";
// import { IntentModel, IntentPolicyParam, IntentPolicy } from "../types/intent";
// import { ViewPolicy } from "./view";

// const createViewPolicyFactory = () => {
//   const createViewPolicy = <Deps extends unknown[], Model extends ViewModel>(
//     param: ViewPolicyParam<Deps, Model>,
//   ) => {
//     new ViewPolicy(param);
//   };
//   return createViewPolicy;
// };
// const createIntentPolicyFactory = <View extends AnyViewPolicyRecords>(
//   viewPolicies: View,
// ) => {
//   const view = viewPolicies;
//   const createIntentPolicy = <
//     I extends ZodAnyObject,
//     O extends ZodType,
//     Deps extends unknown[],
//     Model extends IntentModel<I, O>,
//   >(
//    param: IntentPolicyParam<I, O, Deps, Model, View>,
//   ): IntentPolicy<I, O, Deps, Model> => {
//     const intentPolicy = (...deps: Deps) => {
//       const { key, model, connect } = param(...deps);
//       const connectInjected: ReturnType<
//         IntentPolicy<I, O, Deps, Model>
//       >["connect"] = (io) => (connect ? connect({ ...io, view }) : []);
//       return { key, model, connect: connectInjected };
//     };
//     return intentPolicy;
//   };
//   return createIntentPolicy;
// };

// export { createViewPolicyFactory, createIntentPolicyFactory };
