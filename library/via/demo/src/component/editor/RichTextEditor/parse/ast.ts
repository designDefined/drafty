import { AstTransformResult, Root } from "../types/ast";
import { Delta } from "../types/delta";
import { spliceTokens, concatNextBlock, findInlineFromRoot, insertBlockAfter } from "../utils/token";

export const transformAst = (root: Root, delta: Delta): AstTransformResult => {
  const result: AstTransformResult = { delta };

  switch (delta.type) {
    case "replaceText": {
      // if (delta.start.type === "block") {
      //   targetBlock = findBlockFromRoot(root, delta.start);
      //   if (targetBlock.children.length > 0) targetInline = targetBlock.children[0];
      //   else {
      //     const insertedPosition = insertInlineAfter(root, delta.start, delta.value);
      //     result.rerender = { start: insertedPosition };
      //     break;
      //   }
      // }
      const target = findInlineFromRoot(root, delta.start);
      const blockDeleted = spliceTokens(root, delta.start, delta.end.type === "inline" ? delta.end : delta.start);
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
        const insertedPosition = insertBlockAfter(root, delta.start.blockId);
        result.rerender = { start: insertedPosition };
      }
      break;
    }
  }
  return result;
};
