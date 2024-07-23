/**
 * @link https://github.com/pmndrs/jotai/blob/main/src/vanilla/store.ts#L70
 */
export const isPromise = (value: unknown): value is Promise<unknown> =>
  typeof (value as any)?.then === "function" &&
  typeof (value as any)?.catch === "function" &&
  typeof (value as any)?.finally === "function";
