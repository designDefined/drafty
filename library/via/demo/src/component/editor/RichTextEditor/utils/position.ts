import { InlinePosition } from "../types/position";
import { extractId, parseId } from "./id";
import { getFirstValidChild } from "./node";

export const getInlinePositionOfNode = (node: Node, offset: number): InlinePosition => {
  const targetElement = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
  if (!(targetElement instanceof HTMLElement)) throw Error("Invalid Node");
  const result = parseId(targetElement.id);
  switch (result.type) {
    case "root": {
      const block = getFirstValidChild(targetElement);
      const inline = getFirstValidChild(block);
      return {
        blockId: extractId(block.id),
        inlineId: extractId(inline.id),
        textContent: node.textContent ?? "",
        offset,
      };
    }
    case "block": {
      const inline = getFirstValidChild(targetElement);
      return {
        blockId: result.blockId,
        inlineId: extractId(inline.id),
        textContent: node.textContent ?? "",
        offset,
      };
    }
    case "inline": {
      const block = targetElement.parentElement;
      if (!block) throw Error("Invalid Node");
      return {
        blockId: extractId(block.id),
        inlineId: result.inlineId,
        textContent: node.textContent ?? "",
        offset,
      };
    }
  }
};
