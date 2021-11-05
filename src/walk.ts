type Callback = (element: Element) => void;

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
 * A function to walk a DOM subtree and run an array of callbacks
 * on each visited node. This implementation only visits Nodes of type Element.
 *
 * @param subtree – a DOM subtree.
 * @param cbs – an array of callbacks to execute on each visited node.
 */
export function walk(subtree: Node, cbs: Callback[]): void {
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

  while (currentNode) {
    if (isElement(currentNode)) {
      const element = currentNode;
      cbs.forEach((cb) => cb(element));
    }
    currentNode = treeWalker.nextNode();
  }
}
