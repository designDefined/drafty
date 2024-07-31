import merge from "deepmerge";
import { DeepPartial } from "./deep";

export const deepMerge = <T>(original: T, partial: DeepPartial<T>) =>
  merge<T>(original, partial as any, { arrayMerge: (_, source) => source });
