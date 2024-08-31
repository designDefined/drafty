import { Intent, Parser, ParserOptional } from "viajs-core";
import { format } from "./logic";
import { tags } from "./constant";
import { ResultView } from "./view";

export const CreatePlateParser = {
  tag: (input: unknown) => {
    if (!tags.includes(input as string)) throw new Error(`${input} is not a valid tag`);
    return input as string;
  },
  component: Parser<string>,
  hasProps: ParserOptional<boolean>,
};

export const CreatePlateIntent = Intent<[], typeof CreatePlateParser, { tsx: string; css: string }>(() => ({
  key: ["createPlate"],
  parser: CreatePlateParser,
  to: format,
  next: ({ o }) => [ResultView().set(o)],
}));
