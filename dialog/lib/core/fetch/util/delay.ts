export const delay =
  (delay?: number) =>
  <T>(data: T): Promise<T> =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, delay ?? 1000);
    });
