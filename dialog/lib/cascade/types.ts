export type StyleModule = { readonly [key: string]: string };
export type StyleModuleRecord = Record<string, StyleModule>;
export type StyleMapper = <T extends StyleModuleRecord>(modules: T) => string[];

export type CreateStyle = <Modules extends StyleModuleRecord>(
  modulesInput: Modules,
) => {
  css: (mapper: StyleMapper) => string;
};
