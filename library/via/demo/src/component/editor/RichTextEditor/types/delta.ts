import { InlinePosition } from "./position";

export type Delta =
  | {
      type: "nothing";
    }
  | {
      type: "replaceText";
      start: InlinePosition;
      end: InlinePosition;
      value: string;
    }
  | {
      type: "breakLine";
      start: InlinePosition;
      end: InlinePosition;
    }
  | {
      type: "deleteText";
      start: InlinePosition;
      end: InlinePosition;
    };
