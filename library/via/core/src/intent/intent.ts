import { Store } from "../store";
import { Falsy } from "../util/falsy";
import { hashKeys, RawKey } from "../util/hashKey";
import { UnknownInput, Inferred } from "./input";

export type To<I, O> = (input: I) => O | Promise<O>;
export type Next = (store: Store) => void;
export type IntentParams<Input extends UnknownInput, O, I extends Inferred<Input> = Inferred<Input>> = {
  key: (RawKey | Falsy)[];
  input?: Input;
  to?: To<I, O>;
  from?: () => I;
  next?: (result: { i: I; o: O }) => (Next | Falsy)[];
  catch?: (result: { i: I; error: unknown }) => Next[];
};

export type StoredIntent<I, O> = {
  input?: I;
  output?: O;
  isWorking: boolean;
};

export const Intent =
  <Input extends UnknownInput, O, Deps extends unknown[] = never[]>(
    params: (...deps: Deps) => IntentParams<Input, O>,
  ) =>
  (...args: Deps) => {
    const intent = params(...args);
    const key = hashKeys(intent.key);
    return { ...intent, key };
  };

export type Intent<Input extends UnknownInput, O> = ReturnType<ReturnType<typeof Intent<Input, O, unknown[]>>>;
