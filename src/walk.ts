/**
 * A TypeScript type guard that tests a node to see if it's of type Element.
 *
 * @param node – the candidate Node to test.
 * @returns boolean — true if the Node is an Element, otherwise false.
 */
function isElement(node: Node): node is Element {
  return Boolean(node && node.nodeType === Node.ELEMENT_NODE);
}

/**
 * A function to walk a DOM subtree and return an array of Elements in the subtree.
 * This implementation only visits Nodes of type Element.
 *
 * @param subtree – a DOM subtree.
 */
export function walk(subtree: Node): Element[] {
  const treeWalker = document.createTreeWalker(
    subtree,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: (node: Node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          return NodeFilter.FILTER_ACCEPT;
        }

        return NodeFilter.FILTER_REJECT;
      },
    }
  );

  let currentNode: Node | null = treeWalker.currentNode;
  const elements: Element[] = [];

  while (currentNode) {
    if (isElement(currentNode)) {
      elements.push(currentNode);
    }
    currentNode = treeWalker.nextNode();
  }

  return elements;
}
