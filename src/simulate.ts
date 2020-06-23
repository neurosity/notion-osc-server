import { timer } from "rxjs";
import { map } from "rxjs/operators";
import { samplingRate, channels } from "./options";
import { Sample } from "./types/Sample";

const startTime = Date.now();

export function createSamplesStream() {
  return timer(0, 1000 / samplingRate).pipe(map((i) => getSample(i)));
}

function getSample(i: number): Sample {
  const offset = (i * 1000) / samplingRate;
  var time = new Number((startTime + offset) / 1000.0);
  return {
    count: i % samplingRate,
    timestamp: time.toString(),
    data: Array.from({ length: channels }, getRandomAmplitude)
  };
}

export function getRandomAmplitude() {
  // Random number between -50 and 50
  const random = Math.floor(Math.random() * 101) - 50;
  // Random 6 digit decimals
  const decimals = Number(Math.random().toFixed(6));
  return random + decimals;
}
