import { Inferred } from "viajs-core";
import { CreatePlateParser } from "./intent";

type Input = Inferred<typeof CreatePlateParser>;

export const format = (input: Input) => {
  console.log(input);
  const flexiveTagName = input.tag[0].toUpperCase() + input.tag.slice(1);
  const componentName = input.component[0].toUpperCase() + input.component.slice(1);

  const tsx = `import styles from "./${componentName}.module.css";
import { ${flexiveTagName} } from "@flexive/core";
${
  input.hasProps
    ? `
type ${componentName}Props = {}
`
    : ``
}
export default function ${componentName}(${input.hasProps ? `{}:${componentName}Props` : ``}) {
  return (
    <${flexiveTagName} className={styles.${componentName}}>
    </${flexiveTagName}>
  );
}
`;

  const css = `.${componentName} {
}
`;

  return { tsx, css };
};
