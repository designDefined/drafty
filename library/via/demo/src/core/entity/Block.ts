import { Code } from "./Code";
import { Layout, Material, Preset } from "./common/style";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { Image } from "./Image";
import { Type } from "./common/type";
import { ID } from "./common/id";

export type Block = {
  id: ID;
  type: Type["Block"];
  name: string;
  children: (Block | Heading | Paragraph | Image | Code)[];
  style?: {
    preset?: Preset;
    layout?: Layout;
    material?: Material;
  };
};
