import { KeyboardEvent } from "react";
import { KeyState, SelectionState } from "../types/state";

export const toKeyState = (e: KeyboardEvent<HTMLDivElement>, before: SelectionState | null): KeyState => {
  if (!before) return { type: "idle" };
  switch (e.key) {
    // default allowed
    case "c": {
      if (e.ctrlKey || e.metaKey) return { type: "copy" };
      break;
    }

    // default prevented
    case "v": {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        return { type: "paste" };
      }
      break;
    }

    case "x": {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        return { type: "cut" };
      }
      break;
    }

    case "b":
    case "i": {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        return { type: "format", key: e.key };
      }
      break;
    }
    case "Enter": {
      if (e.nativeEvent.isComposing) {
        break;
      }
      e.preventDefault();
      return { type: "lineBreak", consume: true };
    }
    case "Backspace":
    case "Delete": {
      return { type: "delete" };
    }
    default: {
      return { type: "write", isComposing: e.nativeEvent.isComposing };
    }
  }
  return { type: "write", isComposing: e.nativeEvent.isComposing };
};
