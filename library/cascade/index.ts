import {
  CreateStyleReturn,
  Css,
  CssNamed,
  StyleMapper,
  StyleModule,
  StyleModuleRecord,
} from "./types";

const createStyle = <Modules extends StyleModuleRecord>(
  modules: StyleModuleRecord,
): CreateStyleReturn<Modules> => {
  const commonStyles = modules as Modules;

  const parseToString = (result: ReturnType<StyleMapper<Modules>>): string => {
    if (typeof result === "string") return result;
    return result.filter((cl) => !!cl).join(" ");
  };
  const css = (styleFn: StyleMapper<Modules>) => {
    const classes = styleFn(commonStyles);
    return parseToString(classes);
  };

  const cssNamed: CssNamed<Modules> = <
    Names extends readonly string[],
    Namespace extends Record<Names[number], Css<Modules>>,
  >(
    ...names: Names
  ) => {
    const merge = (
      mapperRecord?: Partial<Record<keyof Namespace, StyleMapper<Modules>>>,
    ) => {
      const result: Namespace = {} as Namespace;
      for (const key of names) {
        const validKey = key as keyof Namespace;
        const mapper = mapperRecord && mapperRecord[validKey];
        const mapped: string = mapper
          ? parseToString(mapper(commonStyles))
          : "";
        const mergedStyleFn = (param: StyleMapper<Modules>) => {
          const local = parseToString(param(commonStyles));
          return [local, mapped].filter((cl) => !!cl).join(" ");
        };
        result[validKey] = mergedStyleFn as Namespace[typeof validKey];
      }
      return result;
    };

    return { merge };
  };

  return { commonStyles, css, cssNamed };
};

export { createStyle };
export type { StyleModule };
