import { Marker } from "./Marker";

export type Sample = {
  data: number[];
  timestamp: number;
  count: number;
  marker?: Marker;
};
