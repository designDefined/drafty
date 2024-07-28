export type DebugConfig = {
  delay?: number;
  error?: { probability: number /* = % */; message: string };
};

export const debugResponse = <T>(response: T, config: DebugConfig) => {
  const promise = new Promise<T>((resolve, reject) => {
    if (config.delay) {
      setTimeout(() => {
        if (config.error) {
          const { probability, message } = config.error;
          if (Math.random() < probability) reject(new Error(message));
          else resolve(response);
        } else {
          resolve(response);
        }
      }, config.delay);
    } else {
      if (config.error) {
        const { probability, message } = config.error;
        if (Math.random() < probability) reject(new Error(message));
        else resolve(response);
      } else {
        resolve(response);
      }
    }
  });
  return promise;
};
