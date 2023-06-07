import ColorValue from "../components/ColorValue";

/**
 * Formats a value or array of values to a friendlier format for display.
 *
 * // returns "1px"
 * @example formatOneOrMoreValues("stroke-width", 1)
 * // returns ["#f2df16", "steelblue"]
 * @example formatOneOrMoreValues("fill", ["#f2df16", "steelblue"])
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
          ", "
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
 * // returns "#f2df16"
 * @example formatValue("fill", "#f2df16")
 * // returns "1px"
 * @example formatValue("stroke-width", 1)
 * @param property – The property in the reviz spec.
 * @param value – The value to format.
 * @returns – The formatted value as a React node.
 */
function formatValue(
  property: string,
  value: string | number
): React.ReactNode {
  switch (property) {
    case "fill":
    case "stroke":
      return <ColorValue color={value as string} />;
    default:
      return value;
  }
}

/**
 * Intersperse an array of elements, including ReactNodes, with a separator.
 *
 * // returns [<Color value="#f2df16" />, <Color value="steelblue" />]
 * @example intersperse(["#f2df16", "steelblue"], ", ")
 * @param arr – The array to intersperse.
 * @param sep – The separator to use between elements.
 * @returns – The interspersed array.
 */
function intersperse<T>(arr: T[], sep: any): T[] {
  if (arr.length === 0) {
    return [];
  }

  return arr.slice(1).reduce((acc, el) => acc.concat([sep, el]), [arr[0]]);
}
