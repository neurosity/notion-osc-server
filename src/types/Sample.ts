import { Marker } from "./Marker";

export type Sample = {
  data: number[];
  timestamp: string;
  count: number;
  marker?: Marker;
};
