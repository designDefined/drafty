import { Block } from "./Block";
import { ID } from "./common/id";

export type Presentation = {
  id: ID;
  title: string;
  children: Block[];
};
