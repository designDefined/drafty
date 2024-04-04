import { CreateStyle } from "./types";

const createStyle: CreateStyle = (modulesInput) => {
  const _modules = modulesInput;
  const css = (styleFn: (modules: typeof _modules) => string[]) =>
    styleFn(_modules).join(" ");
  return { css };
};

export { createStyle };
