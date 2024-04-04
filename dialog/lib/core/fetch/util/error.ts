export const error =
  (probability?: number) =>
  <T>(data: T): Promise<T> => {
    return new Promise((resolve, reject) => {
      if (Math.random() < (probability ?? 100) / 100) {
        reject(new Error("Error"));
      } else {
        resolve(data);
      }
    });
  };
