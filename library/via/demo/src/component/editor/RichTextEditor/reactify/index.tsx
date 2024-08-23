import styles from "../styles/styles.module.css";
import { ReactNode } from "react";
import { BlockToken, InlineToken, Root } from "../types/ast";
import { stringifyId } from "../utils/id";

const fromInline = (token: InlineToken, prefix: string, isOnly: boolean): ReactNode => {
  const id = stringifyId(token.id, true, prefix);
  const classes = [styles.inline, ...token.format.map(f => "f-" + f)].join(" ");
  return (
    <span key={id} id={id} className={classes}>
      {token.value.length === 0 && isOnly ? <br /> : token.value}
    </span>
  );
};

const fromBlock = (token: BlockToken, prefix: string): ReactNode => {
  const id = stringifyId(token.id, false, prefix);
  const classes = [styles.block, ...token.format.map(f => "f-" + f)].join(" ");
  return (
    <div key={id} id={id} className={classes}>
      {token.children.map(inline => fromInline(inline, prefix, token.children.length === 1))}
    </div>
  );
};

export const fromRoot = (root: Root, prefix: string): ReactNode[] => {
  return root.children.map(block => fromBlock(block, prefix));
};
