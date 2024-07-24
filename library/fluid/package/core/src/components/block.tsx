import { DetailedHTMLProps, HTMLAttributes } from "react";
import { FluidComponentProps } from "./types";
import { useFluidClass, useFluidStyle } from "../hooks";

export type BlockComponentProps = FluidComponentProps<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>;

export function Div({
  // children
  children,

  // style
  style,
  flex,
  flow,
  justify,
  align,
  spacing,
  isInline,
  className,

  // rest
  ...props
}: BlockComponentProps) {
  const memoizedStyle = useFluidStyle(
    { flex, flow, spacing, justify, align, isInline },
    style,
  );
  const memoizedClasses = useFluidClass({ ...props, className });

  return (
    <div {...props} style={memoizedStyle} className={memoizedClasses}>
      {children}
    </div>
  );
}

export function Main({
  // children
  children,

  // style
  style,
  flex,
  flow,
  justify,
  align,
  spacing,
  isInline,
  className,

  // rest
  ...props
}: BlockComponentProps) {
  const memoizedStyle = useFluidStyle(
    { flex, flow, spacing, justify, align, isInline },
    style,
  );
  const memoizedClasses = useFluidClass({ ...props, className });

  return (
    <main {...props} style={memoizedStyle} className={memoizedClasses}>
      {children}
    </main>
  );
}

export function Article({
  // children
  children,

  // style
  style,
  flex,
  flow,
  justify,
  align,
  spacing,
  isInline,
  className,

  // rest
  ...props
}: BlockComponentProps) {
  const memoizedStyle = useFluidStyle(
    { flex, flow, spacing, justify, align, isInline },
    style,
  );
  const memoizedClasses = useFluidClass({ ...props, className });

  return (
    <article {...props} style={memoizedStyle} className={memoizedClasses}>
      {children}
    </article>
  );
}

export function Section({
  // children
  children,

  // style
  style,
  flex,
  flow,
  justify,
  align,
  spacing,
  isInline,
  className,

  // rest
  ...props
}: BlockComponentProps) {
  const memoizedStyle = useFluidStyle(
    { flex, flow, spacing, justify, align, isInline },
    style,
  );
  const memoizedClasses = useFluidClass({ ...props, className });

  return (
    <section {...props} style={memoizedStyle} className={memoizedClasses}>
      {children}
    </section>
  );
}

export function P({
  // children
  children,

  // style
  style,
  flex,
  flow,
  justify,
  align,
  spacing,
  isInline,
  className,

  // rest
  ...props
}: BlockComponentProps) {
  const memoizedStyle = useFluidStyle(
    { flex, flow, spacing, justify, align, isInline },
    style,
  );
  const memoizedClasses = useFluidClass({ ...props, className });

  return (
    <p {...props} style={memoizedStyle} className={memoizedClasses}>
      {children}
    </p>
  );
}
