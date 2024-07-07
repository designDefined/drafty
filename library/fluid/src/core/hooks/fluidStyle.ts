import { CSSProperties, useMemo, useRef } from "react";

/*
 * types
 */

type FlexDirectionValue = "row" | "row-reverse" | "column" | "column-reverse";
type FlexWrapValue = "nowrap" | "wrap" | "wrap-reverse";

type FlexJustifyValue =
  | "start"
  | "center"
  | "end"
  | "space-between"
  | "space-around"
  | "space-evenly";

type FlexAlignValue = "start" | "center" | "end" | "stretch" | "baseline";

type Padding = number | string | undefined;
type Gap = number | string | undefined;
type Margin = number | string | undefined;

export type FluidStyle = {
  flex?: [number, number, string];
  flow?: [FlexDirectionValue, FlexWrapValue, FlexAlignValue, FlexJustifyValue];
  spacing?: [Padding] | [Padding, Gap] | [Padding, Gap, Margin];
  isInline?: boolean;
};

/*
 * hooks
 */

const defaultFluidStyle: Required<FluidStyle> = {
  flex: [1, 1, "auto"],
  flow: ["column", "nowrap", "stretch", "start"],
  spacing: [undefined, undefined, undefined],
  isInline: false,
};

export const useFluidStyle = (style: FluidStyle, override?: CSSProperties) => {
  const {
    flex: [grow, shrink, basis],
    flow: [direction, wrap, align, justify],
    spacing: [padding, gap, margin],
    isInline,
  } = Object.keys(defaultFluidStyle).reduce((acc, _key) => {
    const key = _key as keyof FluidStyle;

    return { ...acc, [key]: style[key] || defaultFluidStyle[key] };
  }, {} as Required<FluidStyle>);

  const overrideRef = useRef(override);

  const styleObject: CSSProperties = useMemo(
    () => ({
      display: isInline ? "inline-flex" : "flex",
      overflow: "auto",
      flex: `${grow} ${shrink} ${basis}`,
      flexFlow: `${direction} ${wrap}`,
      alignItems: `${align}`,
      justifyContent: `${justify}`,
      gap,
      padding,
      margin,
      ...overrideRef.current,
    }),
    [
      isInline,
      grow,
      shrink,
      basis,
      direction,
      wrap,
      align,
      justify,
      padding,
      gap,
      margin,
    ],
  );

  return styleObject;
};
