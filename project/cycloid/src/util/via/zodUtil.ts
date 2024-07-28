import { ModelTree } from "@via/core";
import {
  UnknownKeysParam,
  ZodArray,
  ZodObject,
  ZodRawShape,
  ZodType,
  ZodTypeAny,
} from "zod";

const isShapable = <T>(
  model:
    | ZodType<T>
    | ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, T, T>,
): model is ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, T, T> =>
  model instanceof ZodObject;

const isElementable = <T>(
  model: ZodType<T> | ZodArray<ZodType<T>>,
): model is ZodArray<ZodType<T>> => model instanceof ZodArray;

const deepParse = <T>(
  model:
    | ZodType<T>
    | ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny, T, T>,
): ModelTree<T> => {
  if (isShapable(model))
    return Object.keys(model.shape).reduce(
      (acc, key) => {
        const value = model.shape[key];
        acc[key] = deepParse(value);
        return acc;
      },
      {} as Record<string, unknown>,
    ) as ModelTree<T>;
  if (isElementable(model)) return [deepParse(model.element)] as ModelTree<T>;
  else return model.parse as ModelTree<T>;
};

export const zodUtil = {
  isShapable,
  deepParse,
};
