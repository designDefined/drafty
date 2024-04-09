/**  Common **/
type Falsy = undefined | null | false;
type KeysOfUnion<T> = T extends T ? keyof T : never;

/**  Core **/
export type StyleModule<Key extends string = string> = Record<Key, string>;
export type StyleModuleRecord = { readonly [key: string]: StyleModule };
export type StyleMapper<Modules extends StyleModuleRecord> = (
  modules: Modules,
) => readonly (string | Falsy)[] | string;

/**  Create Style **/
/* Css */
export type Css<Modules extends StyleModuleRecord> = (
  mapper: StyleMapper<Modules>,
) => string;

/* CssNamed */
export type MergeStyle<
  Modules extends StyleModuleRecord,
  Names extends readonly string[],
  Namespace extends Record<Names[number], Css<Modules>>,
> = (
  mapperRecord?: Partial<Record<keyof Namespace, StyleMapper<Modules>>>,
) => Record<keyof Namespace, Css<Modules>>;

export type CssNamed<Modules extends StyleModuleRecord> = <
  Names extends readonly string[],
  Namespace extends Record<Names[number], Css<Modules>>,
>(
  ...names: Names
) => {
  merge: MergeStyle<Modules, Names, Namespace>;
};

/* BindStyle */
export type BindStyle<Modules extends StyleModuleRecord> = <Key extends string>(
  localModule?: StyleModule,
) => (
  ...params: (KeysOfUnion<Modules[keyof Modules]> | Key | Falsy)[]
) => string;

/* Return */
export type CreateStyleReturn<Modules extends StyleModuleRecord> = {
  commonStyles: Modules;
  css: Css<Modules>;
  cssNamed: CssNamed<Modules>;
  bindStyle: BindStyle<Modules>;
};
