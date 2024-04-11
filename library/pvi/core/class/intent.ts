// import { ZodAnyObject } from "../adapter/zod/types";
// import { PolicyKey } from "../types/common";
// import { IntentModel, IntentPolicyParam } from "../types/intent";
// import { TypeOf, ZodType } from "zod";
// import { AnyViewPolicyRecords } from "../types/typesAny";

// export class IntentPolicy<
//   I extends ZodAnyObject,
//   O extends ZodType,
//   Deps extends unknown[],
//   Model extends IntentModel<I, O>,
//   ViewPolicies extends AnyViewPolicyRecords,
// > {
//   private _key: (...deps: Deps) => PolicyKey;
//   private _model: (...deps: Deps) => Model;
//   private _connect: (...deps: Deps) =>
//     | ((
//         view: ViewPolicies,
//         io: {
//           input: TypeOf<I>;
//           output: TypeOf<O>;
//         },
//       ) => Promise<unknown>[])
//     | undefined;
//   private _viewPolicies: ViewPolicies;

//   constructor(
//     viewPolicies: ViewPolicies,
//     param: IntentPolicyParam<I, O, Deps, Model, ViewPolicies>,
//   ) {
//     this._key = (...deps: Deps) => param(...deps).key;
//     this._model = (...deps: Deps) => param(...deps).model;
//     this._connect = (...deps: Deps) => param(...deps).connect;
//     this._viewPolicies = viewPolicies;
//   }

//   public inject(viewPolicies: ViewPolicies) {
//     this._viewPolicies = viewPolicies;
//   }

//   public read(...deps: Deps) {
//     return {
//       key: this._key(...deps),
//       model: this._model(...deps),
//     };
//   }
// }
