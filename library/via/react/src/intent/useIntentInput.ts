import { InputSetter, Intent, ParserTree } from "@via/core";
import { useInput } from "../input/useInput";

type UseIntentInputParams<P extends ParserTree<unknown>, O> = {
  intent: Intent<P, O>;
  initialSetter?: InputSetter<P>;
  cacheTime?: number;
};

export const useIntentInput = <P extends ParserTree<unknown>, O>({
  intent: { key, parser, cacheTime },
  initialSetter,
  cacheTime: overrideCacheTime,
  // config,
}: UseIntentInputParams<P, O>) => {
  if (!parser) throw new Error("no parser provided");
  const input = useInput<P>({ key: "input" + key, parser, initialSetter, cacheTime: overrideCacheTime ?? cacheTime });
  return input;
};
