import type { Data } from "./data";

export interface ExecuteMessage {
  name: "execute";
  data: Data;
  program: string;
}

export interface RenderMessage {
  name: "render";
  plot: string;
}
