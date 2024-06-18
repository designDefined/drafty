export const pickValidValues = <T extends Record<string, unknown>>(
  value?: T,
) => {
  if (!value) return {};
  return Object.keys(value).reduce((acc, key) => {
    if (value[key as keyof T] === undefined) return acc;
    return { ...acc, [key]: value[key as keyof T] };
  }, {} as T);
};
