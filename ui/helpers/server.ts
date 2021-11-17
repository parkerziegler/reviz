import * as fs from 'fs';
import * as path from 'path';

export function readData<T extends object>(jsonName: string): T[] {
  const json = fs
    .readFileSync(path.join(process.cwd(), `data/${jsonName}.json`))
    .toString();
  return JSON.parse(json) as T[];
}
