import { BlockToken, InlineToken, Root } from "../types/ast";
import { InlinePosition, Position } from "../types/position";

// create
export const createInlineToken = (root: Root, value?: string): InlineToken => {
  root.lastInlineId++;
  return {
    id: root.lastInlineId,
    format: [],
    value: value ?? "",
  };
};

export const createBlockToken = (root: Root): BlockToken => {
  root.lastBlockId++;
  return {
    id: root.lastBlockId,
    format: [],
    children: [],
  };
};

// get
export const findInlineFromRoot = (root: Root, position: InlinePosition) => {
  const block = root.children.find(b => b.id === position.blockId);
  if (!block) throw new Error("Invalid block");
  const inline = block.children.find(i => i.id === position.inlineId);
  if (!inline) throw new Error("Invalid inline");
  return inline;
};

export const findBlockFromRoot = (root: Root, position: Position) => {
  const block = root.children.find(b => b.id === position.blockId);
  if (!block) throw new Error("Invalid block");
  return block;
};

// insert
export const insertInlineAfter = (root: Root, position: Position, textContent?: string): InlinePosition => {
  const block = findBlockFromRoot(root, position);
  if (position.type === "block") {
    const newInline = createInlineToken(root, textContent);
    block.children.push(newInline);
    return {
      type: "inline",
      blockId: position.blockId,
      inlineId: newInline.id,
      offset: textContent?.length ?? 0,
      textContent: textContent ?? "",
    };
  }
  const index = block.children.findIndex(({ id }) => id === position.inlineId);
  const newInline = createInlineToken(root, textContent);
  block.children.splice(index + 1, 0, newInline);
  return {
    type: "inline",
    blockId: position.blockId,
    inlineId: newInline.id,
    offset: textContent?.length ?? 0,
    textContent: textContent ?? "",
  };
};

export const insertBlockAfter = (root: Root, blockId: number): InlinePosition => {
  // if (blockId === undefined) {
  //   const newBlock = createBlockToken(root);
  //   const newInline = createInlineToken(root);
  //   newBlock.children.push(newInline);
  //   root.children.push(newBlock);
  //   return {
  //     type: "inline",
  //     blockId: newBlock.id,
  //     inlineId: newBlock.children[0].id,
  //     offset: 0,
  //     textContent: "",
  //   };
  // }
  const block = root.children.find(b => b.id === blockId);
  if (!block) throw new Error("Invalid block");

  const index = root.children.indexOf(block);
  const newBlock: BlockToken = createBlockToken(root);
  const newInline = createInlineToken(root);

  newBlock.children.push(newInline);
  root.children.splice(index + 1, 0, newBlock);
  return { type: "inline", blockId: newBlock.id, inlineId: newInline.id, offset: 0, textContent: "" };
};

// concat
export const concatNextBlock = (root: Root, position: InlinePosition) => {
  const block = findBlockFromRoot(root, position);
  const index = root.children.indexOf(block);
  const nextBlock = root.children[index + 1];
  if (!nextBlock) return;
  block.children.push(...nextBlock.children);
  root.children.splice(index + 1, 1);
};

// splice
export const spliceTokens = (root: Root, from: InlinePosition, to: InlinePosition): boolean => {
  if (from.blockId === to.blockId && from.inlineId === to.inlineId) {
    const target = findInlineFromRoot(root, from);
    target.value = target.value.slice(0, from.offset) + target.value.slice(to.offset);
    return false;
  }
  if (from.blockId === to.blockId) {
    const blockTarget = findBlockFromRoot(root, from);
    const startIndex = blockTarget.children.findIndex(({ id }) => id === from.inlineId);
    const endIndex = blockTarget.children.findIndex(({ id }) => id === to.inlineId);
    blockTarget.children.splice(startIndex + 1, endIndex - startIndex - 1);

    const inlineStartTarget = findInlineFromRoot(root, from);
    inlineStartTarget.value = inlineStartTarget.value.slice(0, from.offset);
    const inlineEndTarget = findInlineFromRoot(root, to);
    inlineEndTarget.value = inlineEndTarget.value.slice(to.offset);
    return false;
  }

  const startBlockTarget = findBlockFromRoot(root, from);
  const startBlockIndex = root.children.indexOf(startBlockTarget);
  const endBlockTarget = findBlockFromRoot(root, to);
  const endBlockIndex = root.children.indexOf(endBlockTarget);

  root.children.splice(startBlockIndex + 1, endBlockIndex - startBlockIndex - 1);

  const startInlineTarget = findInlineFromRoot(root, from);
  const startInlineIndex = startBlockTarget.children.indexOf(startInlineTarget);
  startBlockTarget.children.splice(startInlineIndex + 1);
  startInlineTarget.value = startInlineTarget.value.slice(0, from.offset);

  const endInlineTarget = findInlineFromRoot(root, to);
  const endInlineIndex = endBlockTarget.children.indexOf(endInlineTarget);
  endBlockTarget.children.splice(0, endInlineIndex);
  endInlineTarget.value = endInlineTarget.value.slice(to.offset);
  return true;
};
