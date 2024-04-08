type Falsy = undefined | null | false;

export type StyleModule<Key extends string = string> = Record<Key, string>;
export type StyleModuleRecord = { readonly [key: string]: StyleModule };
export type StyleMapper<Modules extends StyleModuleRecord> = (
  modules: Modules,
) => readonly (string | Falsy)[] | string;

/* Create Style */

export type Css<Modules extends StyleModuleRecord> = (
  mapper: StyleMapper<Modules>,
) => string;

export type MergeStyle<
  Modules extends StyleModuleRecord,
  Names extends readonly string[],
  Namespace extends Record<Names[number], Css<Modules>>,
> = (
  mapperRecord: Partial<Record<keyof Namespace, StyleMapper<Modules>>>,
) => Record<keyof Namespace, Css<Modules>>;

export type CssNamed<Modules extends StyleModuleRecord> = <
  Names extends readonly string[],
  Namespace extends Record<Names[number], Css<Modules>>,
>(
  ...names: Names
) => {
  merge: MergeStyle<Modules, Names, Namespace>;
};

export type CustomStyle<
  T extends MergeStyle<StyleModuleRecord, [], Record<string, unknown>>,
> = Parameters<T>[0];

export type CreateStyleReturn<Modules extends StyleModuleRecord> = {
  commonStyles: Modules;
  css: Css<Modules>;
  cssNamed: CssNamed<Modules>;
};
