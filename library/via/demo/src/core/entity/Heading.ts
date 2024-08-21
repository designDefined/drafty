import { ID } from "./common/id";
import { Type } from "./common/type";

export type Heading = {
  id: ID;
  type: Type["Heading"];
  content: string;
  importance: 1 | 2 | 3 | 4;
};
