import { View } from "viajs-core";

export const ResultView = View<[], { tsx: string; css: string }>(() => ({
  key: ["result"],
  from: () => ({ tsx: "", css: "" }),
}));
