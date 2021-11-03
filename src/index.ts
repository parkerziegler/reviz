import { collectElementTypes } from './element-types';
import { walk } from './walk';

export function analyzeVisualization(root: SVGElement): void {
  const elementTypes = new Map<string, number>();

  const collectElement = collectElementTypes(elementTypes);
  walk(root, [collectElement]);
}
