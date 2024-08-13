import { InferredPartial, ParserTree, View } from "@via/core";
import { useInput } from "../input/useInput";

type UseViewInputParams<P extends ParserTree<unknown>, O> = {
  view: View<O>;
  parser: P;
  initiate?: { value: InferredPartial<P>; set?: boolean };
};

export const useViewInput = <P extends ParserTree<unknown>, O>({
  view: { key },
  parser,
  initiate,
}: UseViewInputParams<P, O>) => {
  if (!parser) throw new Error("no parser provided");
  const input = useInput<P>({ key: "input" + key, parser, initiate });
  return input;
};
