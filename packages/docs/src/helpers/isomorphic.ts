/**
 * Convert an example file name to a human readable title.
 *
 * @example
 * // returns 'NPR Covid Shift'
 * normalizeExampleName('NPR-covid-shift');
 * @param name – The example's file name. Assumes the file name is kebab case.
 * @returns – A human readable title for the example.
 */
export function normalizeExampleName(name: string): string {
  const parts = name.split('-');

  return parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
