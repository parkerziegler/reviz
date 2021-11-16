export function normalizeExampleName(name: string): string {
  const parts = name.split('-');

  return parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
