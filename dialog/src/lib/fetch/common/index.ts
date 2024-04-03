import { CreateFetch } from "./types";

const createFetch: CreateFetch = ({ baseUrl, getAuth }) => {
  const parseUrl = (url: string) => baseUrl + url;

  const base = async (
    url: string,
    init: RequestInit = {},
    auth: boolean = false,
  ) => {
    try {
      let res: Response;
      // send requests
      if (!auth) {
        // non-authenticated requests
        res = await fetch(parseUrl(url), init);
      } else {
        // authenticated requests
        if (!getAuth) throw Error("no getAuth function provided");
        const token = getAuth();
        if (!token) throw Error("no token found");
        res = await fetch(parseUrl(url), {
          ...init,
          headers: {
            ...init.headers,
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // receive response
      if (res.headers.get("content-type")?.includes("application/json")) {
        const body = await res.json();
        return res.ok ? Promise.resolve(body) : Promise.reject(body);
      } else {
        return res.ok
          ? Promise.resolve({ status: res.status, ok: res.ok })
          : Promise.reject({ status: res.status, ok: res.ok });
      }
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const getter =
    (method: "GET", auth: boolean) =>
    (url: string, headers: HeadersInit = {}) =>
      base(url, { method, headers }, auth);

  const updater =
    (method: "POST" | "PATCH" | "PUT" | "DELETE", auth: boolean) =>
    (url: string, body?: Record<string, unknown>, headers: HeadersInit = {}) =>
      base(
        url,
        {
          method: method,
          body: body ? JSON.stringify(body) : undefined,
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
        },
        auth,
      );

  const get = getter("GET", false);
  const deleteApi = updater("DELETE", false);
  const post = updater("POST", false);
  const patch = updater("PATCH", false);
  const put = updater("PUT", false);

  const authGet = getter("GET", true);
  const authDelete = updater("DELETE", true);
  const authPost = updater("POST", true);
  const authPatch = updater("PATCH", true);
  const authPut = updater("PUT", true);

  const api = {
    get,
    post,
    patch,
    put,
    delete: deleteApi,
  };
  const authApi = {
    get: authGet,
    post: authPost,
    patch: authPatch,
    put: authPut,
    delete: authDelete,
  };
  return { api, authApi };
};
export default createFetch;
