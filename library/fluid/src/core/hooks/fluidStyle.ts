import { CSSProperties, useMemo, useRef } from "react";

/*
 * types
 */

/* simple */
type Value = number | string | undefined;

/* flex */
type FlexGrow = number;
type FlexShrink = number;
type FlexBasis = string;
type FlexDirection =
  | "row"
  | "row-reverse"
  | "column"
  | "column-reverse"
  | undefined;
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse" | undefined;

/* justify */
type FlexJustify =
  | "start"
  | "center"
  | "end"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | undefined;
type FlexJustifyMax = Value;
type FlexJustifyMin = Value;

/* align */
type FlexAlign =
  | "start"
  | "center"
  | "end"
  | "stretch"
  | "baseline"
  | undefined;
type FlexAlignMax = Value;
type FlexAlignMin = Value;

/* spacing */
type Padding = Value;
type Gap = Value;
type Margin = Value;

export type FluidStyle = {
  flex?: [FlexGrow, FlexShrink, FlexBasis];
  flow?:
    | [FlexDirection, FlexWrap, FlexAlign, FlexJustify]
    | [FlexDirection, FlexWrap, FlexAlign]
    | [FlexDirection, FlexWrap]
    | [FlexDirection];
  align?:
    | [FlexAlign, FlexAlignMax, FlexAlignMin]
    | [FlexAlign, FlexAlignMax]
    | [FlexAlign];
  justify?:
    | [FlexJustify, FlexJustifyMax, FlexJustifyMin]
    | [FlexJustify, FlexAlignMax]
    | [FlexJustify];
  spacing?: [Padding, Gap, Margin] | [Padding, Gap] | [Padding];
  isInline?: boolean;
};

/*
 * default
 */
const defaultFluidStyle: Required<FluidStyle> = {
  flex: [1, 1, "auto"],
  flow: ["column", "nowrap"],
  align: [undefined],
  justify: [undefined],
  spacing: [undefined],
  isInline: false,
};

/*
 * hooks
 */
export const useFluidStyle = (style: FluidStyle, override?: CSSProperties) => {
  const {
    flex: [grow, shrink, basis],
    flow: [direction, wrap, alignAlias, justifyAlias],
    align: [align, alignMax, alignMin],
    justify: [justify, justifyMax, justifyMin],
    spacing: [padding, gap, margin],
    isInline,
  } = Object.keys(defaultFluidStyle).reduce((acc, _key) => {
    const key = _key as keyof FluidStyle;

    return { ...acc, [key]: style[key] || defaultFluidStyle[key] };
  }, {} as Required<FluidStyle>);

  const overrideRef = useRef(override);
  const { alignKey, justifyKey } = useMemo(() => {
    const isVertical = direction === "column" || direction === "column-reverse";
    return {
      alignKey: isVertical ? "Width" : "Height",
      justifyKey: isVertical ? "Height" : "Width",
    };
  }, [direction]);

  const styleObject: CSSProperties = useMemo(
    () => ({
      display: isInline ? "inline-flex" : "flex",
      overflow: "auto",
      flex: `${grow} ${shrink} ${basis}`,
      flexFlow: `${direction} ${wrap}`,
      alignItems: `${align ?? alignAlias}`,
      justifyContent: `${justify ?? justifyAlias}`,
      [`max${alignKey}`]: alignMax,
      [`min${alignKey}`]: alignMin,
      [`max${justifyKey}`]: justifyMax,
      [`min${justifyKey}`]: justifyMin,
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
      alignAlias,
      justifyAlias,
      align,
      justify,
      padding,
      gap,
      margin,
      alignKey,
      alignMax,
      alignMin,
      justifyKey,
      justifyMax,
      justifyMin,
    ],
  );

  return styleObject;
};
