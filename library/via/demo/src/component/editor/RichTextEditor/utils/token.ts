import { BlockToken, InlineToken, Root } from "../types/ast";
import { BlockPosition, InlinePosition } from "../types/position";

// create
export const createInlineToken = (root: Root): InlineToken => {
  root.lastInlineId++;
  return {
    id: root.lastInlineId,
    format: [],
    value: "",
  };
};

export const createBlockToken = (root: Root): BlockToken => {
  root.lastBlockId++;
  return {
    id: root.lastBlockId,
    format: [],
    children: [createInlineToken(root)],
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

export const findBlockFromRoot = (root: Root, position: BlockPosition) => {
  const block = root.children.find(b => b.id === position.blockId);
  if (!block) throw new Error("Invalid block");
  return block;
};

export const insertBlockAfter = (root: Root, position: BlockPosition): InlinePosition => {
  const block = findBlockFromRoot(root, position);
  const index = root.children.indexOf(block);
  const newBlock: BlockToken = createBlockToken(root);
  root.children.splice(index + 1, 0, newBlock);
  return { blockId: newBlock.id, inlineId: newBlock.children[0].id, offset: 0, textContent: "" };
};

export const concatNextBlock = (root: Root, position: BlockPosition) => {
  const block = findBlockFromRoot(root, position);
  const index = root.children.indexOf(block);
  const nextBlock = root.children[index + 1];
  if (!nextBlock) return;
  block.children.push(...nextBlock.children);
  root.children.splice(index + 1, 1);
};

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
    blockTarget.children.splice(startIndex + 1, endIndex - startIndex);

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
