import { InlinePosition } from "./position";

export type SelectionState =
  | { type: "ranged"; start: InlinePosition; end: InlinePosition }
  | { type: "collapsed"; start: InlinePosition };

export type KeyState =
  | { type: "idle" }
  | { type: "write"; isComposing: boolean }
  | { type: "delete" }
  | { type: "lineBreak" }
  | { type: "copy" }
  | { type: "paste" }
  | { type: "cut" }
  | { type: "format"; key: "b" | "i" };

export type States = {
  selectionBeforeInput: SelectionState | null;
  selectionAfterInput: SelectionState | null;
  key: KeyState | null;
};

export const initialStates = { selectionBeforeInput: null, selectionAfterInput: null, key: null };
