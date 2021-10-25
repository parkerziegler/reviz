export function walk(subtree: Node): Node[] {
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
    nodeList.push(currentNode);
    currentNode = treeWalker.nextNode();
  }

  return nodeList;
}
