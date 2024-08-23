import { Delta } from "../types/delta";
import { States } from "../types/state";

export const toDelta = (states: States): Delta => {
  const { selectionBeforeInput: before, selectionAfterInput: after, key } = states;
  if (!key) return { type: "nothing" };
  switch (key.type) {
    case "write": {
      if (!before || !after) break;
      return {
        type: "replaceText",
        start: before.start,
        end: before.type === "collapsed" ? before.start : before.end,
        value: after.start.textContent,
      };
    }
    case "lineBreak": {
      if (!before) break;
      return {
        type: "breakLine",
        start: before.start,
        end: before.type === "collapsed" ? before.start : before.end,
      };
    }
    case "delete": {
      if (!before) break;
      return {
        type: "deleteText",
        start: before.start,
        end: before.type === "collapsed" ? before.start : before.end,
      };
    }
  }
  return { type: "nothing" };
};
