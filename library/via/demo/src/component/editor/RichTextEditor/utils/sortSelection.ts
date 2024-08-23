export const sortSelection = (selection: Selection) => {
  const { anchorNode, anchorOffset, focusNode, focusOffset } = selection;
  if (!anchorNode || !focusNode) throw new Error("Invalid selection");
  if (anchorNode === focusNode) {
    if (anchorOffset < focusOffset)
      return { startNode: anchorNode, startOffset: anchorOffset, endNode: focusNode, endOffset: focusOffset };
    else return { startNode: focusNode, startOffset: focusOffset, endNode: anchorNode, endOffset: anchorOffset };
  }
  const position = anchorNode.compareDocumentPosition(focusNode);
  if (position & Node.DOCUMENT_POSITION_FOLLOWING)
    return { startNode: anchorNode, startOffset: anchorOffset, endNode: focusNode, endOffset: focusOffset };
  else return { startNode: focusNode, startOffset: focusOffset, endNode: anchorNode, endOffset: anchorOffset };
};
