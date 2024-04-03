import createFetch from "./common";

export const { api: mockApi } = createFetch({
  baseUrl: "http://localhost:3001",
});
