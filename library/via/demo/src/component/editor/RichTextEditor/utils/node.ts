export const getFirstValidChild = (element: Element) => {
  const child = Array.from(element.children).find(child => child.nodeType === Node.ELEMENT_NODE);
  if (!child) throw new Error("Invalid child");
  if (!child.id) throw new Error("Invalid child id");
  return child;
};
