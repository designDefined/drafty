import { DetailedHTMLProps, HTMLAttributes } from "react";
import { FluidComponentProps } from "./types";
import { useFluidClass, useFluidStyle } from "../hooks";

export type InlineComponentProps = FluidComponentProps<
  DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
>;

export function Span({
  // children
  children,

  // style
  style,
  flex,
  flow,
  align,
  justify,
  spacing,
  isInline = true,
  className,

  // rest
  ...props
}: InlineComponentProps) {
  const memoizedStyle = useFluidStyle(
    { flex, flow, align, justify, spacing, isInline },
    style,
  );
  const memoizedClasses = useFluidClass({ ...props, className });

  return (
    <span {...props} style={memoizedStyle} className={memoizedClasses}>
      {children}
    </span>
  );
}
