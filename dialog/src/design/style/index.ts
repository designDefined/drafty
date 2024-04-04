import { createStyle } from "@lib/cascade";
import layout from "./module/layout.module.css";
import material from "./module/material.module.css";

export const { css } = createStyle({
  layout,
  material,
});
