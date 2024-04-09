import { createStyle, StyleModule } from "cascade";
import layout from "./module/layout.module.css";
import material from "./module/material.module.css";

type Modules = {
  layout: StyleModule<"page">;
  material: StyleModule<"glass" | "glassClear" | "glassBlurry">;
};

export const { css, cssNamed, bindStyle } = createStyle<Modules>({
  layout,
  material,
});
