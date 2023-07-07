// Attribute constants.
export const PRES_ATTR_NAMES = <const>[
  'fill',
  'fill-opacity',
  'stroke',
  'stroke-opacity',
  'stroke-width',
];
export type PresAttrNames = (typeof PRES_ATTR_NAMES)[number];

export const CIRCLE_ATTR_NAMES = <const>['cx', 'cy', 'r'];
export const RECT_ATTR_NAMES = <const>['x', 'y', 'width', 'height'];
type CircleAttrNames = (typeof CIRCLE_ATTR_NAMES)[number];
type RectAttrNames = (typeof RECT_ATTR_NAMES)[number];
export type GeomAttrNames = CircleAttrNames | RectAttrNames;

export const ATTR_NAMES = [
  ...PRES_ATTR_NAMES,
  ...CIRCLE_ATTR_NAMES,
  ...RECT_ATTR_NAMES,
];

// Code generation constants.
export const PROGRAM_HOLE = '??';
export const EVAL_HOLE = '•';

// Observable Plot constants.
export const OBSERVABLE_DEFAULT_R = 3;
