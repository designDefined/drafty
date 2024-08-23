export const getFirstValidChild = (element: Element) => {
  const child = Array.from(element.children).find(child => child.nodeType === Node.ELEMENT_NODE);
  if (!child) return undefined;
  if (!child.id) return undefined;
  return child;
};
