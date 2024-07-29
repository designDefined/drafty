import { DebugConfig, debugError, debugResponse } from "./debug";

const KEY_PREFIX = "CYCLOID_LOCAL_SERVER_";

type GetConfig<T> = {
  id?: number;
  parser?: (data: unknown) => T;
  debug?: DebugConfig;
};

type PostConfig = {
  debug?: DebugConfig;
};

const get = async <T>(key: string, config?: GetConfig<T>): Promise<T> => {
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
    const promise = config?.debug
      ? debugResponse(parsed, config.debug)
      : Promise.resolve(parsed);

    return promise;
  } catch (e) {
    return config?.debug ? debugError(e, config.debug) : Promise.reject(e);
  }
};

const post = async <T extends { id: number }>(
  key: string,
  body: Omit<T, "id">,
  config?: PostConfig,
): Promise<Omit<T, "id"> & { id: number }> => {
  try {
    const existing = await localStorage.getItem(KEY_PREFIX + key);
    if (!existing) {
      const datum = { id: 0, ...body };

      // parse and set
      localStorage.setItem(KEY_PREFIX + key, JSON.stringify([datum]));

      // debug
      const promise = config?.debug
        ? debugResponse(datum, config.debug)
        : Promise.resolve(datum);

      return promise;
    }

    const json = JSON.parse(existing);
    if (!Array.isArray(json)) throw new Error("Data is not an array");
    const id = json.length > 0 ? json[json.length - 1].id + 1 : 0;
    const datum = { id, ...body };

    // parse and set
    const parsed = datum;
    json.push(parsed);
    localStorage.setItem(KEY_PREFIX + key, JSON.stringify(json));

    // debug
    const promise = config?.debug
      ? debugResponse(parsed, config.debug)
      : Promise.resolve(parsed);

    return promise;
  } catch (e) {
    return config?.debug ? debugError(e, config.debug) : Promise.reject(e);
  }
};

export const fetchLocal = {
  get,
  post,
};
