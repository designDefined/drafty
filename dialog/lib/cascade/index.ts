import { CreateStyle, StyleMapper } from "./types";

const createStyle: CreateStyle = (modulesInput) => {
  const _modules = modulesInput;
  const css = (styleFn: StyleMapper<typeof _modules>) => {
    const classes = styleFn(_modules);
    return Array.isArray(classes) ? classes.join(" ") : (classes as string);
  };
  return { css };
};

export { createStyle };
