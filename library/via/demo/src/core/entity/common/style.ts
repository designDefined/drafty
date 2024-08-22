import { FluidStyle } from "@fluid/core";

export type Layout = FluidStyle;

export type Font = {
  color?: string;
  size?: number | string;
  weight?: number | string;
  lineHeight?: number | string;
  letterSpacing?: number | string;
};

export type Align = "left" | "center" | "right" | "justify";

export type Material = {
  border?: { color?: string; width?: number; radius?: number };
  background?: { color?: string };
};

export type Preset = string[];
