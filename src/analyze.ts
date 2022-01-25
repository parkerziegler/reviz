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
import { inferVizMetaAttrs } from './inference';
import { buildVizSpec, VizSpec } from './ir';
import { generate } from './generate';
import {
  CIRCLE_ATTR_NAMES,
  GeomAttrNames,
  PresAttrNames,
  PRES_ATTR_NAMES,
  RECT_ATTR_NAMES,
} from './constants';

interface RevizOutput {
  spec: VizSpec;
  program: string;
}

export const analyzeVisualization = (root: SVGSVGElement): RevizOutput => {
  const markTypes: string[] = [];
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

  const vizMetaAttrs = inferVizMetaAttrs({
    markTypes,
    textAttrs,
  });

  const vizSpec = buildVizSpec({
    ...vizMetaAttrs,
    geomAttrs,
    presAttrs,
    textAttrs,
    positionAttrs,
  });
  const program = generate(vizSpec);

  return {
    spec: vizSpec,
    program,
  };
};
