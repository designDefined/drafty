export type StyleModule = { readonly [key: string]: string };
export type StyleModuleRecord = { readonly [key: string]: StyleModule };
export type StyleMapper<T extends StyleModuleRecord> = (
  modules: T,
) => readonly string[] | string;

export type CreateStyle = <Modules extends StyleModuleRecord>(
  modulesInput: Modules,
) => {
  css: (mapper: StyleMapper<Modules>) => string;
};
