import { InlinePosition } from "../types/position";
import { extractId, parseId } from "./id";
// import { getFirstValidChild } from "./node";

export const isTextOrBrNode = (node: Node) => {
  return (
    node.nodeType === Node.TEXT_NODE || (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName === "BR")
  );
};

export const getInlinePositionOfNode = (node: Node, offset: number): InlinePosition => {
  const targetElement = isTextOrBrNode(node) ? node.parentElement : node;
  if (!(targetElement instanceof HTMLElement)) throw Error("Invalid Node");
  const result = parseId(targetElement.id);
  switch (result.type) {
    case "root": {
      throw new Error("why root?");
    }

    case "block": {
      throw new Error("why block?");
      // const inline = getFirstValidChild(targetElement);
      // if (!inline) return { type: "block", blockId: result.blockId, offset, textContent: node.textContent ?? "" };
      // return {
      //   type: "inline",
      //   blockId: result.blockId,
      //   inlineId: extractId(inline.id),
      //   offset,
      //   textContent: node.textContent ?? "",
      // };
    }
    case "inline": {
      const block = targetElement.parentElement;
      if (!block) throw Error("Invalid Node");
      return {
        type: "inline",
        blockId: extractId(block.id),
        inlineId: result.inlineId,
        offset,
        textContent: node.textContent ?? "",
      };
    }
  }
};
