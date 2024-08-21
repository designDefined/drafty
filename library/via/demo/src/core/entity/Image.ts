import { ID } from "./common/id";
import { Layout } from "./common/style";
import { Type } from "./common/type";

export type Image = {
  id: ID;
  type: Type["Image"];
  src: string;
  style?: {
    layout?: Layout;
  };
};
