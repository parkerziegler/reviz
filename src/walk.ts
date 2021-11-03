type Callback = (element: Node) => void;

export function walk(subtree: Node, cbs: Callback[] = []): Node[] {
  const treeWalker = document.createTreeWalker(
    subtree,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: () => NodeFilter.FILTER_ACCEPT,
    }
  );

  const nodeList: Node[] = [];
  let currentNode: Node | null = treeWalker.currentNode;

  while (currentNode) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    cbs.forEach((cb) => cb(currentNode!));
    currentNode = treeWalker.nextNode();
  }

  return nodeList;
}
