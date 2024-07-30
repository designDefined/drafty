export type Falsy = false | null | undefined;
export type Key = string | Record<string, unknown> | Falsy;

export const hashFn = (target: Key): string => {
  if (target === false || target === null || target === undefined) return "";
  if (typeof target === "string") return target;
  return JSON.stringify(
    Object.keys(target)
      .sort()
      .reduce((result, key) => {
        if (
          typeof target[key] === "object" &&
          target[key] !== null &&
          !Array.isArray(target[key])
        ) {
          result[key] = hashFn(target[key] as Record<string, unknown>);
          return result;
        }
        if (key[0] !== "_") result[key] = target[key];
        return result;
      }, {} as any),
  );
};

export const hashKeys = (targets: Key[]) =>
  Object.keys(targets)
    .sort()
    .reduce((acc: string, index) => {
      const key = targets[index as keyof typeof targets];
      if (typeof key === "string") return acc + "_" + key;
      return acc + "_" + hashFn(key as Record<string, unknown>);
    }, "");
