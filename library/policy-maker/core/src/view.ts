import { ZodType, TypeOf } from "zod";
import { Key, hashKeys } from "./util";
import { StoreConfig } from "./store";
import { Predicate } from "./intent";

export const ViewPolicy =
  <Args extends unknown[], Model extends ZodType>(
    init: (...args: Args) => {
      key: Key[];
      model: Model;
      config?: Partial<StoreConfig>;
    },
  ) =>
  (...args: Args): ViewPolicy<TypeOf<Model>> => {
    const { key, model, config } = init(...args);
    const hashedKey = hashKeys(key);
    const predicate: Predicate = (str) => str.startsWith(hashedKey);

    return {
      key: hashedKey,
      model,
      config,
      set: (fn: (prev?: TypeOf<Model>) => TypeOf<Model> | void) => ({
        type: "SET" as const,
        predicate,
        fn,
      }),
      invalidate: () => ({
        type: "INVALIDATE" as const,
        predicate,
      }),
      reset: () => ({
        type: "RESET" as const,
        predicate,
      }),
    };
  };

export type ViewPolicy<T> = {
  key: string;
  model: ZodType<T>;
  config?: Partial<StoreConfig>;
  set: (fn: (prev?: T) => T | void) => {
    type: "SET";
    predicate: Predicate;
    fn: (prev?: T) => T | void;
  };
  invalidate: () => { type: "INVALIDATE"; predicate: Predicate };
  reset: () => { type: "RESET"; predicate: Predicate };
};
