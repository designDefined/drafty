import { ID } from "./common/id";
import { Font, Layout, Material } from "./common/style";
import { Type } from "./common/type";

export type Paragraph = {
  id: ID;
  type: Type["Paragraph"];
  content: string;
  style?: {
    layout?: Layout;
    material?: Material;
    font?: Font;
    align?: "left" | "center" | "right" | "justify";
  };
};
