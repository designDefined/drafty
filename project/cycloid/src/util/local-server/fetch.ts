import { DebugConfig, debugError, debugResponse } from "./debug";
import { startLog } from "./log";

// constants
const KEY_PREFIX = "CYCLOID_LOCAL_SERVER";

// types
type GetConfig<T> = {
  id?: number;
  parser?: (data: unknown) => T;
  debug?: DebugConfig;
};
type PostConfig = {
  override?: boolean;
  debug?: DebugConfig;
};

// apis
const get = async <T>(key: string, config?: GetConfig<T>): Promise<T> => {
  const endLog = startLog(key, "GET");
  try {
    // get data
    const data = await localStorage.getItem(KEY_PREFIX + key);
    if (data === null) throw new Error("Data not found");
    const json = JSON.parse(data);

    // find by id
    const identified =
      config?.id !== undefined
        ? json.find((datum: { id: number }) => datum?.id === config.id)
        : json;
    if (identified === undefined) throw new Error("Data of id not found");

    // parse
    const parsed: T = config?.parser ? config.parser(identified) : identified;

    // debug
    if (config?.debug) return debugResponse(parsed, config.debug, endLog);
    endLog.success(parsed);
    return Promise.resolve(parsed);
  } catch (e) {
    // handle error
    if (config?.debug) return debugError(e, config.debug, endLog);
    endLog.fail(e);
    return Promise.reject(e);
  }
};

const post = async <T extends { id: number }>(
  key: string,
  body: Omit<T, "id">,
  config?: PostConfig,
): Promise<Omit<T, "id"> & { id: number }> => {
  const endLog = startLog(key, "POST");
  try {
    // get existing data
    const existing = await localStorage.getItem(KEY_PREFIX + key);

    if (!existing) {
      const datum = { id: 0, ...body };

      // parse and set
      localStorage.setItem(KEY_PREFIX + key, JSON.stringify([datum]));

      // debug
      const promise = config?.debug
        ? debugResponse(datum, config.debug, endLog)
        : Promise.resolve(datum);

      return promise;
    }

    const json = JSON.parse(existing);
    if (!Array.isArray(json)) throw new Error("Data is not an array");
    const id = config?.override
      ? 0
      : json.length > 0
        ? json[json.length - 1].id + 1
        : 0;
    const datum = { id, ...body };

    // parse and set
    const parsed = datum;
    if (!config?.override) {
      json.push(parsed);
      localStorage.setItem(KEY_PREFIX + key, JSON.stringify(json));
    } else {
      localStorage.setItem(KEY_PREFIX + key, JSON.stringify([parsed]));
    }

    // debug
    const promise = config?.debug
      ? debugResponse(parsed, config.debug, endLog)
      : Promise.resolve(parsed);

    return promise;
  } catch (e) {
    // handle error
    if (config?.debug) return debugError(e, config.debug, endLog);
    endLog.fail(e);
    return Promise.reject(e);
  }
};

export const fetchLocal = {
  get,
  post,
};
