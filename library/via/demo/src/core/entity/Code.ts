import { Layout } from "./common/style";
import { Type } from "./common/type";

export type Language = "typescript" | "css" | "html" | "json" | "markdown";

export type Code = {
  type: Type["Code"];
  id: number;
  content: string;
  laguage: Language;
  style?: {
    layout?: Layout;
  };
};
