import * as fs from 'fs';
import * as path from 'path';

export function readData<T extends object>(json_name: string): T[] {
  const json = fs
    .readFileSync(path.join(process.cwd(), `data/${json_name}.json`))
    .toString();
  return JSON.parse(json) as T[];
}
