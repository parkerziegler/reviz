export function collectElementTypes(
  elementTypes: Map<string, number>
): (element: Node) => void {
  return (element: Node): void => {
    const elType = element.nodeName;

    elementTypes.set(
      elType,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      elementTypes.has(elType) ? elementTypes.get(elType)! + 1 : 1
    );
  };
}
