import { OSC } from "./server";
import { createSamplesStream } from "./simulate";
import * as exitHook from "async-exit-hook";

const oscServer = new OSC();

createSamplesStream().subscribe((sample) => {
  const packet = oscServer.nextSample(sample);
  console.log(JSON.stringify(packet, null, 2));
});

exitHook(() => {
  oscServer.disconnect();
});
