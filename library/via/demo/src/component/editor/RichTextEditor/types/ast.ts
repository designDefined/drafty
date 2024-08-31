import { Delta } from "./delta";
import { InlinePosition } from "./position";

export type InlineToken = {
  id: number;
  format: string[];
  value: string;
};

export type BlockToken = {
  id: number;
  format: string[];
  children: InlineToken[];
};

export type Root = {
  children: BlockToken[];
  lastInlineId: number;
  lastBlockId: number;
};

export const initialRoot: Root = {
  children: [
    {
      id: 0,
      format: [],
      children: [
        {
          id: 0,
          format: [],
          value: "",
        },
      ],
    },
  ],
  lastInlineId: 0,
  lastBlockId: 0,
};

export type AstTransformResult = {
  delta: Delta;
  rerender?: { start: InlinePosition; end?: InlinePosition };
};
