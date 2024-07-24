import { useMemo } from "react";

export type DefaultStyledProps = {
  onClick?: unknown; // clickable, focusable
  onMouseDown?: unknown; // clickable
  onInput?: unknown; // focusable
  onChange?: unknown; // focusable
  disabled?: unknown; // disabled
  error?: unknown; // errored
};

export type EnhancedClass = string | undefined | Record<string, boolean>;
export type PropsWithEnhancedClass<T extends DefaultStyledProps> = Omit<
  T,
  "className"
> & { className?: EnhancedClass | EnhancedClass[] };

const parseEnhancedClass = (classes: EnhancedClass): string | undefined => {
  if (!classes) return undefined;
  if (typeof classes === "string") return classes;
  return Object.keys(classes)
    .filter((key) => classes[key])
    .join(" ");
};

const parseEnhancedClasses = (
  classes: EnhancedClass | EnhancedClass[],
): string | undefined =>
  Array.isArray(classes)
    ? classes.reduce<string>((acc, current) => {
        if (!current) return acc;
        if (typeof current === "string") return `${acc} ${current}`;
        return `${acc} ${Object.keys(current)
          .filter((key) => current[key])
          .join(" ")}`;
      }, "")
    : parseEnhancedClass(classes);

export const parseDefaultClasses = (props: DefaultStyledProps): string => {
  const classNames: string[] = [];
  if (props.onClick || props.onMouseDown) classNames.push("clickable");
  if (props.onInput || props.onChange) classNames.push("focusable");
  if (props.disabled) classNames.push("disabled");
  if (props.error) classNames.push("errorable");
  return classNames.join(" ");
};

export const useFluidClass = <
  T extends PropsWithEnhancedClass<DefaultStyledProps>,
>({
  className,
  onClick,
  onMouseDown,
  onInput,
  onChange,
  disabled,
  error,
}: T) => {
  const classString = useMemo(() => {
    const enhancedClass = parseEnhancedClasses(className);
    const defaultClass = parseDefaultClasses({
      onClick,
      onMouseDown,
      onInput,
      onChange,
      disabled,
      error,
    });
    return [enhancedClass, defaultClass].join(" ");
  }, [className, onClick, onMouseDown, onInput, onChange, disabled, error]);

  return classString;
};
