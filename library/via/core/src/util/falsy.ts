export type Falsy = false | null | undefined;

export const isFalsy = (value: unknown): value is Falsy =>
  value === false || value === null || value === undefined;
