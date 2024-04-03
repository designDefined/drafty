type Api = {
  get: (url: string, headers?: HeadersInit) => Promise<unknown>;
  post: (
    url: string,
    body?: Record<string, unknown>,
    headers?: HeadersInit,
  ) => Promise<unknown>;
  patch: (
    url: string,
    body?: Record<string, unknown>,
    headers?: HeadersInit,
  ) => Promise<unknown>;
  put: (
    url: string,
    body?: Record<string, unknown>,
    headers?: HeadersInit,
  ) => Promise<unknown>;
  delete: (
    url: string,
    body?: Record<string, unknown>,
    headers?: HeadersInit,
  ) => Promise<unknown>;
};

export type CreateFetch = (config: {
  baseUrl: string;
  getAuth?: () => string;
}) => { api: Api; authApi: Api };
