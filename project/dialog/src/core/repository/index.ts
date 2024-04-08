import { createFetch } from "fetch";

export const { api: mockApi } = createFetch({
  baseUrl: "http://localhost:3001",
});
