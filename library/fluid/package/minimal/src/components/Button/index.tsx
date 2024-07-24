import styles from "./styles.module.css";
import {
  Button as _Button,
  ButtonComponentProps,
  useFluidClass,
} from "../../../../core";

function Default({
  className,
  children,
  theme = "filled",
  flex,
  flow,
  spacing,
  isInline,
  ...props
}: ButtonComponentProps & { theme: "stroked" | "filled" }) {
  const memoizedClasses = useFluidClass({ ...props, className });
  return (
    <_Button
      className={[styles.Default, styles[theme], memoizedClasses]}
      flex={flex ?? [1, 0, "auto"]}
      flow={flow ?? ["row", "nowrap", "center", "center"]}
      spacing={spacing ?? [12, 8]}
      isInline={isInline ?? true}
      {...props}
    >
      {children}
    </_Button>
  );
}

export const Button = {
  Default,
};
