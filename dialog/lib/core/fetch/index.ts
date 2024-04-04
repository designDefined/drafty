import createFetch from "./common";
import { delay } from "./util/delay";
import { error } from "./util/error";

export const { api: mockApi } = createFetch({
  baseUrl: "http://localhost:3001",
});

export { delay, error };
