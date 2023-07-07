import { readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * Reads a JSON file synchronously from the file system and returns the parsed
 * JSON. Assumes the JSON file is in the `src/data` directory.
 *
 * @param jsonName – The name of the JSON file to read.
 * @returns – The parsed JSON.
 */
export function readData<T extends object>(jsonName: string): T[] {
  const json = readFileSync(
    path.join(process.cwd(), `src/data/${jsonName}.json`)
  ).toString();

  return JSON.parse(json) as T[];
}
