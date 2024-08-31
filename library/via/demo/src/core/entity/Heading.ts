import { ID } from "./common/id";
import { Layout, Material } from "./common/style";
import { Type } from "./common/type";

export type Heading = {
  id: ID;
  type: Type["Heading"];
  content: string;
  importance: 1 | 2 | 3 | 4 | 5 | 6;
  style?: {
    layout?: Layout;
    material?: Material;
  };
};
