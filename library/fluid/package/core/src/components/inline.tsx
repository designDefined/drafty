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

export type HeadingComponentProps = FluidComponentProps<
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
>;

export function H1({
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
}: HeadingComponentProps) {
  const memoizedStyle = useFluidStyle(
    { flex, flow, align, justify, spacing, isInline },
    style,
  );
  const memoizedClasses = useFluidClass({ ...props, className });

  return (
    <h1 {...props} style={memoizedStyle} className={memoizedClasses}>
      {children}
    </h1>
  );
}

export function H2({
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
}: HeadingComponentProps) {
  const memoizedStyle = useFluidStyle(
    { flex, flow, align, justify, spacing, isInline },
    style,
  );
  const memoizedClasses = useFluidClass({ ...props, className });

  return (
    <h2 {...props} style={memoizedStyle} className={memoizedClasses}>
      {children}
    </h2>
  );
}

export function H3({
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
}: HeadingComponentProps) {
  const memoizedStyle = useFluidStyle(
    { flex, flow, align, justify, spacing, isInline },
    style,
  );
  const memoizedClasses = useFluidClass({ ...props, className });

  return (
    <h3 {...props} style={memoizedStyle} className={memoizedClasses}>
      {children}
    </h3>
  );
}

export function H4({
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
}: HeadingComponentProps) {
  const memoizedStyle = useFluidStyle(
    { flex, flow, align, justify, spacing, isInline },
    style,
  );
  const memoizedClasses = useFluidClass({ ...props, className });

  return (
    <h4 {...props} style={memoizedStyle} className={memoizedClasses}>
      {children}
    </h4>
  );
}

export function H5({
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
}: HeadingComponentProps) {
  const memoizedStyle = useFluidStyle(
    { flex, flow, align, justify, spacing, isInline },
    style,
  );
  const memoizedClasses = useFluidClass({ ...props, className });

  return (
    <h5 {...props} style={memoizedStyle} className={memoizedClasses}>
      {children}
    </h5>
  );
}

export function H6({
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
}: HeadingComponentProps) {
  const memoizedStyle = useFluidStyle(
    { flex, flow, align, justify, spacing, isInline },
    style,
  );
  const memoizedClasses = useFluidClass({ ...props, className });

  return (
    <h6 {...props} style={memoizedStyle} className={memoizedClasses}>
      {children}
    </h6>
  );
}
