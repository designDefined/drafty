import { DeepPartial } from "../util/deep";

export type Leaf<T> = { _isLeaf: true; parser: Parser<T>; value: T; inputValue?: T; error: unknown };
export type Tree<T> =
  | Leaf<T>
  | {
      [K in keyof T]: Tree<T[K]>;
    };

export type Parser<T> = (arg: unknown) => T;

export type ParserModel<T> =
  | Parser<T>
  | {
      [key in keyof T]: ParserModel<T[key]>;
    };
export type UnknownInput = ParserModel<unknown>;

type UndefinedToOptional<T> = {
  [K in keyof T as undefined extends T[K] ? K : never]?: Exclude<T[K], undefined>;
} & {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};

export type Inferred<T extends UnknownInput> =
  T extends Parser<infer U>
    ? U
    : T extends { [key in keyof T]: ParserModel<T[key]> }
      ? UndefinedToOptional<{ [K in keyof T]: Inferred<T[K]> }>
      : never;

export type GetTreeFromParserModel<T> =
  T extends Parser<infer U> ? Leaf<U> : T extends object ? { [K in keyof T]: GetTreeFromParserModel<T[K]> } : never;

export type GetPartialInputFromTree<T> =
  T extends Leaf<infer U> ? U : T extends object ? { [K in keyof T]?: GetPartialInputFromTree<T[K]> } : never;

const isLeaf = <T>(value: any): value is Leaf<T> => {
  return typeof value === "object" && value !== null && "_isLeaf" in value && value["_isLeaf"] === true;
};

const isParser = <T>(parser: any): parser is Parser<T> => {
  return typeof parser === "function";
};

export const parseLeaf = <T>(value: T, parser: Parser<T>): Partial<Leaf<T>> => {
  try {
    const parsed = parser(value);
    return { value: parsed, inputValue: parsed, error: null };
  } catch (e) {
    return { value, inputValue: value, error: e };
  }
};

export const parseInitialTree = <Input extends UnknownInput>(
  value: Inferred<Input>,
  parser: Input,
  useInitialValue?: boolean,
): GetTreeFromParserModel<Input> => {
  if (isParser(parser)) {
    return {
      _isLeaf: true,
      parser,
      value,
      inputValue: useInitialValue ? value : undefined,
      error: null,
    } as GetTreeFromParserModel<Input>;
  }
  const tree: any = {};
  for (const key in parser) {
    // @ts-ignore
    tree[key] = parseInitialTree(value[key], parser[key], useInitialValue);
  }
  return tree;
};

export const parsePartialTree = <Input extends UnknownInput>(
  input: GetPartialInputFromTree<GetTreeFromParserModel<Input>>,
  parser: Input,
): DeepPartial<GetTreeFromParserModel<Input>> => {
  if (isParser(parser)) return parseLeaf(input, parser) as DeepPartial<GetTreeFromParserModel<Input>>;

  const result: any = {};
  if (typeof input !== "object" || typeof parser !== "object") throw new Error("input must be an object");
  for (const key in input) {
    result[key] = parsePartialTree(input[key], parser[key as unknown as keyof Input] as any);
  }
  return result;
};

export const getValidInputFromTree = <Input extends UnknownInput>(
  values: GetTreeFromParserModel<Input>,
): Inferred<Input> | undefined => {
  if (isLeaf<Inferred<Input>>(values)) {
    if (values.error) throw values.error;
    return values.inputValue;
  }

  return Object.keys(values).reduce((acc, key) => {
    const value = values[key as keyof typeof values];
    if (isLeaf(value)) {
      if (value.error) throw value.error;
      acc[key] = value.inputValue;
    } else {
      acc[key] = getValidInputFromTree(value as any);
    }
    return acc;
  }, {} as any);
};
