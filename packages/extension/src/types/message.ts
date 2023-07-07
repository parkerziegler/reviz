import type { RevizOutput } from '@reviz/compiler';

import type { Data } from './data';

export interface ExecuteMessage {
  name: 'execute';
  data: Data;
  program: string;
}

export interface RenderMessage {
  name: 'render';
  plot: string;
}

export interface AnalyzeMessage extends RevizOutput {
  name: 'analyze';
  nodeName: string;
  classNames: string;
}
