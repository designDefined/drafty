import { FluidStyle } from "library/fluid/package/core";

export type Paragraph = {
  id: number;
  content: string;
  textAlign: "left" | "center" | "right";
  classNames: string[];
} & FluidStyle;
