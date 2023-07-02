import { walk } from './walk';
import {
  initializeAttrSets,
  collectMarkType,
  collectGeomAttrs,
  collectPresAttrs,
  collectTextAttrs,
  AttrSets,
  RevizTextDatum,
  collectPositionAttrs,
  RevizPositionDatum,
} from './attributes';
import { inferXScaleType } from './scales';
import { buildVizSpec, VizSpec } from './ir';
import { generate } from './generate';
import {
  CIRCLE_ATTR_NAMES,
  GeomAttrNames,
  PresAttrNames,
  PRES_ATTR_NAMES,
  RECT_ATTR_NAMES,
} from './constants';

export interface RevizOutput {
  spec: VizSpec;
  program: string;
}

export const analyzeVisualization = (root: SVGSVGElement): RevizOutput => {
  const markTypes = new Map<'circle' | 'rect', number>([
    ['circle', 0],
    ['rect', 0],
  ]);
  const geomAttrs: AttrSets<GeomAttrNames> = initializeAttrSets<GeomAttrNames>([
    ...CIRCLE_ATTR_NAMES,
    ...RECT_ATTR_NAMES,
  ]);

  const presAttrs: AttrSets<PresAttrNames> =
    initializeAttrSets<PresAttrNames>(PRES_ATTR_NAMES);

  const textAttrs: RevizTextDatum[] = [];
  const positionAttrs: RevizPositionDatum[] = [];

  walk(root, [
    collectMarkType(markTypes),
    collectGeomAttrs(geomAttrs),
    collectPresAttrs(presAttrs),
    collectTextAttrs(textAttrs),
    collectPositionAttrs(positionAttrs),
  ]);

  const vizSpec = buildVizSpec({
    markType: [...markTypes.entries()].reduce((acc, el) =>
      el[1] > acc[1] ? el : acc
    )[0],
    xScaleType: inferXScaleType(textAttrs),
    geomAttrs,
    presAttrs,
    positionAttrs,
  });
  const program = generate(vizSpec);

  return {
    spec: vizSpec,
    program,
  };
};
