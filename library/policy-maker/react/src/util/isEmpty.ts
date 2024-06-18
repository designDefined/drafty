export const isEmpty = (value: unknown): boolean => {
  switch (typeof value) {
    case "number":
      return Number.isNaN(value);
    case "object":
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
