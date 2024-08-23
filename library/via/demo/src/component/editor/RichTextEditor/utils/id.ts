type IdParseResult = { type: "root" } | { type: "block"; blockId: number } | { type: "inline"; inlineId: number };

export const parseId = (id: string): IdParseResult => {
  if (id.endsWith("_")) return { type: "root" };

  const idString = id.split("_")[1];
  const type = idString[0];
  const idNumber = parseInt(idString.slice(1));
  if (Number.isNaN(idNumber)) throw new Error("Id is not integer");
  if (type === "b") return { type: "block", blockId: idNumber };
  if (type === "i") return { type: "inline", inlineId: idNumber };
  throw new Error("Id type is not valid");
};

export const extractId = (id: string) => {
  const idString = id.split("_")[1];
  const idNumber = parseInt(idString.slice(1));
  if (Number.isNaN(idNumber)) throw new Error("Id is not integer");
  return idNumber;
};

export const stringifyId = (id: number, isInline: boolean, prefix: string) => `${prefix}${isInline ? "i" : "b"}${id}`;
