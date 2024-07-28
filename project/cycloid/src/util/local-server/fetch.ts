import { DebugConfig, debugResponse } from "./debug";

type GetConfig<T> = {
  id?: number;
  parser?: (data: unknown) => T;
  debug?: DebugConfig;
};

type PostConfig<Response> = {
  parser?: (data: unknown) => Response;
  debug?: DebugConfig;
};

const get = async <T>(key: string, config?: GetConfig<T>) => {
  try {
    // get data
    const data = await localStorage.getItem(key);
    if (data === null) throw new Error("Data not found");
    const json = JSON.parse(data);

    // find by id
    const identified = config?.id
      ? json.find((datum: { id: number }) => datum?.id === config.id)
      : data;
    if (identified === undefined) throw new Error("Data of id not found");

    // parse
    const parsed: T = config?.parser ? config.parser(identified) : identified;

    // debug
    const promise = config?.debug
      ? debugResponse(parsed, config.debug)
      : Promise.resolve(parsed);

    return promise;
  } catch (e) {
    return Promise.reject(e);
  }
};

const post = async <Body, Response extends { id: number }>(
  key: string,
  body: Body,
  config?: PostConfig<Response>,
) => {
  try {
    const existing = await localStorage.getItem(key);
    if (!existing) {
      const datum = { id: 0, ...body };

      // parse and set
      const parsed = (
        config?.parser ? config.parser(datum) : datum
      ) as Response;
      localStorage.setItem(key, JSON.stringify([parsed]));

      // debug
      const promise = config?.debug
        ? debugResponse(parsed, config.debug)
        : Promise.resolve(parsed);

      return promise;
    }

    const json = JSON.parse(existing);
    if (!Array.isArray(json)) throw new Error("Data is not an array");
    const id = json.length > 0 ? json[json.length - 1].id + 1 : 0;
    const datum = { id, ...body };

    // parse and set
    const parsed = (config?.parser ? config.parser(datum) : datum) as Response;
    json.push(parsed);
    localStorage.setItem(key, JSON.stringify(json));

    // debug
    const promise = config?.debug
      ? debugResponse(parsed, config.debug)
      : Promise.resolve(parsed);

    return promise;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const fetch = {
  get,
  post,
};
