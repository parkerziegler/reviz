import prettier from 'prettier/standalone';
import babel from 'prettier/parser-babel';

import ColorValue from '../components/spec/ColorValue';

/**
 * Formats a value or array of values to a friendlier format for display.
 *
 * @example
 * // returns "1px"
 * formatOneOrMoreValues("stroke-width", 1)
 * @example
 * // returns ["#f2df16", "steelblue"]
 * formatOneOrMoreValues("fill", ["#f2df16", "steelblue"])
 * @param property – The property in the reviz spec.
 * @param values – The value or array of values to format.
 * @returns – The formatted value or array of values as a React node.
 */
export function formatOneOrMoreValues(
  property: string,
  values: string | number | string[] | number[]
): React.ReactNode {
  if (Array.isArray(values) && values.length > 1) {
    return (
      <div className="flex items-center overflow-auto">
        <span>[</span>
        {intersperse(
          values.map((value) => formatValue(property, value)),
          ', '
        )}
        <span>]</span>
      </div>
    );
  } else {
    return formatValue(property, Array.isArray(values) ? values[0] : values);
  }
}

/**
 * Format a reviz spec value to a friendlier format for display.
 *
 * @example
 * // returns <ColorValue color={"#f2df16"} />
 * formatValue("fill", "#f2df16")
 * @example
 * // returns "1px"
 * formatValue("stroke-width", 1)
 * @param property – The property in the reviz spec.
 * @param value – The value to format.
 * @returns – The formatted value as a React node.
 */
function formatValue(
  property: string,
  value: string | number
): React.ReactNode {
  switch (property) {
    case 'fill':
    case 'stroke':
      return <ColorValue color={value as string} />;
    default:
      return value;
  }
}

/**
 * Intersperse an array of elements, including ReactNodes, with a separator.
 *
 * @example
 * // returns [<Color value="#f2df16" />, <Color value="steelblue" />]
 * intersperse(["#f2df16", "steelblue"], ", ")
 * @param arr – The array to intersperse.
 * @param sep – The separator to use between elements.
 * @returns – The interspersed array.
 */
function intersperse<T>(arr: T[], sep: T): T[] {
  if (arr.length === 0) {
    return [];
  }

  return arr.slice(1).reduce((acc, el) => acc.concat([sep, el]), [arr[0]]);
}

/**
 * Turn a space-separated string of classNames into a period-separated string of
 * classNames.
 *
 * @example
 * // returns ".bg-slate-600.text-white"
 * formatClasses("bg-slate-600 text-white")
 * @param classNames – The space-separated string of classNames returned by
 * el.getAttribute("class").
 * @returns – The period-separated string of classNames.
 */
export function formatClassNames(classNames: string): string {
  return '.' + classNames.split(' ').join('.');
}

/**
 * Inject the dimensions of the slot for the program output into the generated
 * Plot program.
 *
 * @example
 * // returns "Plot.plot({ width: 100, height: 100, ... })"
 * injectDimensions("Plot.plot({ ... })", { width: 100, height: 100 })
 * @param program – The program string to inject visualization dimensions into.
 * @param dimensions – The dimensions of the slot for the program output.
 * @returns – The program string with visualization dimensions injected.
 */
export function injectDimensions(
  program: string,
  dimensions: { width: number; height: number }
): string {
  const searchString = 'Plot.plot({';
  const insertionPoint = searchString.length;

  return `${program.slice(0, insertionPoint)}
  width: ${dimensions.width},
  height: ${dimensions.height},
  ${program.slice(insertionPoint)}`;
}

/**
 * Format a program string using Prettier and Babel's JavaScript parser.
 *
 * @param program – The program string to format.
 * @returns – The formatted program string.
 */
export function formatProgram(program: string): string {
  return prettier.format(program, {
    parser: 'babel',
    plugins: [babel],
  });
}

/**
 * Format an Observable Plot program string to be executed as a program.
 *
 * @param program – The program string to format.
 * @returns – The formatted, executable program string.
 */
export function formatExecutableProgram(
  program: string,
  dimensions: { width: number; height: number }
): string {
  return formatProgram(`function plot(Plot, data) {
    return ${injectDimensions(program, dimensions)}
  }`);
}
