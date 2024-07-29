import { EndLog } from "./log";

export type DebugConfig = {
  delay?: number;
  error?: { probability: number /* = % */; message: string };
};

export const debugResponse = <T>(
  response: T,
  config: DebugConfig,
  endLog: EndLog,
) => {
  const promise = new Promise<T>((resolve, reject) => {
    if (config.delay) {
      setTimeout(() => {
        if (config.error) {
          const { probability, message } = config.error;
          if (Math.random() < probability) {
            endLog.fail(new Error(message));
            reject(new Error(message));
          } else {
            endLog.success(response);
            resolve(response);
          }
        } else {
          endLog.success(response);
          resolve(response);
        }
      }, config.delay);
    } else {
      if (config.error) {
        const { probability, message } = config.error;
        if (Math.random() < probability) {
          endLog.fail(new Error(message));
          reject(new Error(message));
        } else {
          endLog.success(response);
          resolve(response);
        }
      } else {
        endLog.success(response);
        resolve(response);
      }
    }
  });
  return promise;
};

export const debugError = <T>(
  error: unknown,
  config: DebugConfig,
  endLog: EndLog,
) => {
  const promise = new Promise<T>((_, reject) => {
    if (config.delay) {
      setTimeout(() => {
        endLog.fail(error);
        reject(error);
      }, config.delay);
    } else {
      endLog.fail(error);
      reject(error);
    }
  });
  return promise;
};
