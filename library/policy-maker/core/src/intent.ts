import { ZodType, TypeOf } from "zod";
import { Key, hashKeys } from "./util";

export type Predicate = (key: string) => boolean;

type Set = {
  type: "SET";
  predicate: Predicate;
  fn: (prev?: any) => any | void;
};

type Invalidate = {
  type: "INVALIDATE";
  predicate: Predicate;
};

type Reset = {
  type: "RESET";
  predicate: Predicate;
};

type Execute = {
  type: "EXECUTE";
  callback: () => void;
};

export type IntentNext =
  | Set
  | Invalidate
  | Reset
  | Execute
  | undefined /* = Falsy */
  | null /* = Falsy */
  | false; /* = Falsy */

export const IntentPolicy =
  <Args extends unknown[], Input extends ZodType, Output extends ZodType>(
    init: (...args: Args) => {
      key: Key[];
      model: { input: Input; output: Output };
      next?: (result: {
        input: TypeOf<Input>;
        output: TypeOf<Output>;
      }) => IntentNext[];
      catch?: (result: {
        input: TypeOf<Input>;
        error: unknown;
      }) => IntentNext[];
    },
  ) =>
  (...args: Args): IntentPolicy<TypeOf<Input>, TypeOf<Output>> => {
    const { key, model, next, catch: _catch } = init(...args);
    return { key: hashKeys(key), model, next, catch: _catch };
  };

export type IntentPolicy<Input, Output> = {
  key: string;
  model: { input: ZodType<Input>; output: ZodType<Output> };
  next?: (result: { input: Input; output: Output }) => IntentNext[];
  catch?: (result: { input: Input; error: unknown }) => IntentNext[];
};
