import { InferredPartial, Intent, ParserTree } from "@via/core";
import { useInput } from "../input/useInput";

type UseIntentInputParams<P extends ParserTree<unknown>, O> = {
  intent: Intent<P, O>;
  initiate?: { value: InferredPartial<P>; set?: boolean };
  // updateValue?: InferredPartial<P>;
  // config?: { useInitialValue: boolean };
};

export const useIntentInput = <P extends ParserTree<unknown>, O>({
  intent: { key, parser },
  initiate,
  // config,
}: UseIntentInputParams<P, O>) => {
  if (!parser) throw new Error("no parser provided");
  const input = useInput<P>({ key: "input" + key, parser, initiate });
  return input;
};
