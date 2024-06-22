export const isEmpty = (value: unknown): boolean => {
  switch (typeof value) {
    case "number":
      return Number.isNaN(value);
    case "object":
      if (value === null) return false; // TODO: is it okay?
      return (
        value === null ||
        Object.keys(value).filter(
          (key) => !isEmpty(value[key as keyof typeof value]),
        ).length === 0
      );
    default:
      return value === null || value === undefined;
  }
};
