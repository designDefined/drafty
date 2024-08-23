import { KeyboardEvent } from "react";
import { KeyState, SelectionState, States } from "../types/state";
import { sortSelection } from "../utils/sortSelection";
import { getInlinePositionOfNode } from "../utils/position";
import { Delta } from "../types/delta";
import { AstTransformResult, Root } from "../types/ast";
import { concatNextBlock, insertBlockAfter, spliceTokens } from "../utils/token";
import { findInlineFromRoot } from "../utils/token";

/**
 * Selection => SelectionState
 */
export const toSelectionState = (selection: Selection | null): SelectionState | null => {
  try {
    if (!selection || !selection.anchorNode || !selection.focusNode) return null;
    const { startNode, startOffset, endNode, endOffset } = sortSelection(selection);
    if (selection.isCollapsed) return { type: "collapsed", start: getInlinePositionOfNode(startNode, startOffset) };
    return {
      type: "ranged",
      start: getInlinePositionOfNode(startNode, startOffset),
      end: getInlinePositionOfNode(endNode, endOffset),
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};

/**
 * KeyboardEvent => KeyState
 */
export const toKeyState = (e: KeyboardEvent<HTMLDivElement>): KeyState => {
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
      return { type: "lineBreak" };
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

/**
 * States => Delta
 */
export const toDelta = (states: States): Delta => {
  const { selectionBeforeInput: before, selectionAfterInput: after, key } = states;
  if (!key) return { type: "nothing" };
  switch (key.type) {
    case "write": {
      if (!before || !after) break;
      // collapsed
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
  }
  return { type: "nothing" };
};

/**
 * Ast, Delta => Result
 */
export const transformAst = (root: Root, delta: Delta): AstTransformResult => {
  const result: AstTransformResult = { delta };

  switch (delta.type) {
    case "replaceText": {
      const target = findInlineFromRoot(root, delta.start);
      const blockDeleted = spliceTokens(root, delta.start, delta.end);
      target.value = delta.value;
      if (blockDeleted) {
        concatNextBlock(root, delta.start);
        result.rerender = { start: { ...delta.start, offset: target.value.length } };
      }
      break;
    }
    case "breakLine": {
      const blockDeleted = spliceTokens(root, delta.start, delta.end);
      if (blockDeleted) {
        result.rerender = { start: { ...delta.end, offset: 0 } };
      } else {
        const insertedPosition = insertBlockAfter(root, delta.start);
        result.rerender = { start: insertedPosition };
      }
      break;
    }
  }
  return result;
};
