import { Model } from "../store";
import { DeepPartial } from "../util/deep";

// Model Types
export type ModelTree<T> = T extends object
  ? T extends any[]
    ? [ModelTree<T[number]>]
    : { [K in keyof T]: ModelTree<T[K]> }
  : Model<T>;

// Input Types
export type InputLeaf<T> = T extends object
  ? never
  : {
      value: T;
      input?: T;
      error?: unknown;
    };
export type InputTree<T> = T extends object
  ? T extends any[]
    ? InputTree<T[number]>[]
    : { [K in keyof T]: InputTree<T[K]> }
  : InputLeaf<T>;

const isInputLeaf = <T>(
  input: InputLeaf<T> | InputTree<T>,
): input is InputLeaf<T> =>
  typeof input === "object" &&
  typeof input !== null &&
  "value" in input &&
  (typeof input["value"] !== "object" || input["value"] === null);

export const parseInput = <T>(
  input: T,
  model?: Model<T>,
  clearInput?: boolean,
) => {
  try {
    const parsed = model?.(input) ?? input;
    return {
      value: parsed,
      input: clearInput ? undefined : parsed,
      error: null,
    };
  } catch (e) {
    return {
      value: input,
      input: clearInput ? undefined : input,
      error: e,
    };
  }
};

export const parseInputTree = <T>(
  inputValue: DeepPartial<T>,
  models?: ModelTree<T>,
): InputTree<T> => {
  // parse primitive values
  if (typeof inputValue !== "object" || inputValue === null)
    return parseInput(inputValue, models as Model<T>) as InputTree<T>;

  // parse array with model[0]
  if (Array.isArray(inputValue)) {
    if (!models)
      return inputValue.map((value) => parseInitialTree(value)) as InputTree<T>;
    if (!Array.isArray(models)) throw new Error("Model is not an array");
    return inputValue.map((value) =>
      parseInputTree(value, models[0]),
    ) as InputTree<T>;
  }

  // parse object
  return Object.keys(inputValue).reduce((acc, key) => {
    const value = inputValue[key as keyof T];
    const model = models?.[key as keyof ModelTree<T>];
    (acc as Record<string, unknown>)[key] =
      value === undefined
        ? parseInput(value, undefined, true)
        : parseInputTree<typeof value>(value, model as ModelTree<typeof value>);
    return acc;
  }, {} as InputTree<T>);
};

export const parseInitialTree = <T>(
  initialValue: T,
  models?: ModelTree<T>,
): InputTree<T> => {
  // parse primitive values
  if (typeof initialValue !== "object" || initialValue === null)
    return parseInput(initialValue, models as Model<T>, true) as InputTree<T>;

  // parse array with model[0]
  if (Array.isArray(initialValue)) {
    if (!models)
      return initialValue.map((value) =>
        parseInitialTree(value),
      ) as InputTree<T>;
    if (!Array.isArray(models)) throw new Error("Model is not an array");
    return initialValue.map((value) =>
      parseInitialTree(value, models[0]),
    ) as InputTree<T>;
  }

  // parse object
  return Object.keys(initialValue).reduce((acc, key) => {
    const value = initialValue[key as keyof T];
    const model = models?.[key as keyof ModelTree<T>];
    (acc as Record<string, unknown>)[key] =
      value === undefined
        ? parseInput(value, undefined, true)
        : parseInitialTree<typeof value>(
            value,
            model as ModelTree<typeof value>,
          );
    return acc;
  }, {} as InputTree<T>);
};

export const getValueFromInputTree = <T>(tree: InputTree<T>): T => {
  if (isInputLeaf(tree)) return tree.value;
  if (Array.isArray(tree))
    return tree.map(getValueFromInputTree) as unknown as T;
  return Object.keys(tree).reduce((acc, key) => {
    acc[key as keyof T] = getValueFromInputTree(
      (tree as Record<string, InputTree<any>>)[key],
    );
    return acc;
  }, {} as T);
};

export const getInputFromInputTree = <T>(
  tree: InputTree<T>,
): DeepPartial<T> => {
  if (isInputLeaf(tree)) return tree.input as DeepPartial<T>;
  if (Array.isArray(tree))
    return tree.map(getInputFromInputTree) as unknown as DeepPartial<T>;
  return Object.keys(tree).reduce((acc, key) => {
    acc[key as keyof T] = getValueFromInputTree(
      (tree as Record<string, InputTree<any>>)[key],
    );
    return acc;
  }, {} as DeepPartial<T>);
};
