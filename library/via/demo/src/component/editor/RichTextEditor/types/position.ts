export type BlockPosition = {
  type: "block";
  blockId: number;
  offset: number;
  textContent: string;
};

export type InlinePosition = {
  type: "inline";
  blockId: number;
  inlineId: number;
  offset: number;
  textContent: string;
};

export type Position = BlockPosition | InlinePosition;
