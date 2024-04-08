import styles from "./index.module.css";
import { cssNamed } from "@design/style";
import { ButtonDefaultProps } from "./types";
import { CustomStyle } from "@lib/cascade";

const { merge } = cssNamed("root");

function Default({
  customStyle = {},
  children,
  ...props
}: ButtonDefaultProps & { customStyle?: CustomStyle<typeof merge> }) {
  const css = merge(customStyle);
  return (
    <button
      className={css.root(({ material }) => [
        material.glass,
        styles.ButtonDefault,
      ])}
      {...props}
    >
      {children}
    </button>
  );
}

const Button = { Default };
export default Button;
