// import { Root } from "../types/ast";
// import { InlinePosition } from "../types/position";

// export const getTypeOfNode = (input: Element, idPrefix: string) => {
//   if (input.id === idPrefix) return "root";
//   if (input.id.slice(idPrefix.length).startsWith("b")) return "block";
//   if (input.id.slice(idPrefix.length).startsWith("i")) return "inline";
//   throw new Error("Node type is not valid");
// };

// export const getId = (input: string, idPrefix: string) => {
//   const idWithType = input.slice(idPrefix.length);
//   const id = parseInt(idWithType.slice(1));
//   if (Number.isNaN(id)) throw new Error("Invalid id value");
//   return id;
// };

// export const getPositionOfNode = (node: Node, idPrefix: string) => {
//   const pivotElement = (node.nodeType === Node.TEXT_NODE ? node.parentElement : node) as Element | null;
//   if (!pivotElement) throw new Error("Invalid Node");
//   const pivotType = getTypeOfNode(pivotElement, idPrefix);

//   // from root
//   if (pivotType === "root") return { blockId: 0, inlineId: 0, textContent: node.textContent || "", needRerender: true };

//   // from block
//   if (pivotType === "block") {
//     const inline = firstValidChild(pivotElement);
//     return {
//       blockId: getId(pivotElement.id, idPrefix),
//       inlineId: getId(inline.id, idPrefix),
//       textContent: node.textContent || "",
//       needRerender: true,
//     };
//   }

//   // from inline
//   const block = pivotElement.parentElement as Element;
//   return {
//     blockId: getId(block.id, idPrefix),
//     inlineId: getId(pivotElement.id, idPrefix),
//     textContent: node.textContent || "",
//   };
// };
