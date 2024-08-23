import { SelectionState } from "../types/state";
import { getInlinePositionOfNode } from "../utils/position";
import { sortSelection } from "../utils/sortSelection";

export const toSelectionState = (selection: Selection | null): SelectionState | null => {
  try {
    console.log(selection);
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
