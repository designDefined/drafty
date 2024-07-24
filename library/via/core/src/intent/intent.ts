import { Model, Store } from "../store";
import { Falsy } from "../util/falsy";
import { hashKeys, RawKey } from "../util/hashKey";
import { ModelTree } from "./input";

export type IOModel<I, O> = {
  tree?: ModelTree<I>;
  input?: Model<I>;
  output?: Model<O>;
};
export type To<I, O> = (input: I) => O | Promise<O>;
export type Next = (store: Store) => void;
export type IntentParams<I, O> = {
  key: (RawKey | Falsy)[];
  to?: To<I, O>;
  from?: () => I;
  next?: (result: { i: I; o: O }) => Next[];
  model?: IOModel<I, O>;
};

export type StoredIntent<I, O> = {
  input?: I;
  output?: O;
  isWorking: boolean;
};

export const Intent =
  <I, O, Deps extends unknown[] = never[]>(
    params: (...deps: Deps) => IntentParams<I, O>,
  ) =>
  (...args: Deps) => {
    const intent = params(...args);
    const key = hashKeys(intent.key);
    return { ...intent, key };
  };

export type Intent<I, O> = ReturnType<
  ReturnType<typeof Intent<I, O, unknown[]>>
>;
