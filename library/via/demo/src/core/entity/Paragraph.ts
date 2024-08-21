import { ID } from "./common/id";
import { Font, Layout } from "./common/style";
import { Type } from "./common/type";

export type Paragraph = {
  id: ID;
  type: Type["Paragraph"];
  content: string;
  style?: {
    layout?: Layout;
    font?: Font;
    align?: "left" | "center" | "right" | "justify";
  };
};
