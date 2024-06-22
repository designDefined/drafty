export const isDeepEqual = (a: unknown, b: unknown): boolean => {
  if (typeof a === "object" && typeof b === "object") {
    if (a === null) return b === null;
    if (b === null) return false;
    if (Array.isArray(a)) {
      if (!Array.isArray(b) || a.length !== b.length) return false;
      return a.every((v, i) => isDeepEqual(v, b[i]));
    }
    return Object.keys(a).every((key) =>
      isDeepEqual(
        a[key as keyof typeof a],
        (b as Record<string, unknown>)[key],
      ),
    );
  }
  return a === b;
};
