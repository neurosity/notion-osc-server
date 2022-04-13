import { OSC } from "./server";
import { createSamplesStream } from "./simulate";
import ShutdownHook from "shutdown-hook";

const oscServer = new OSC();
const shutdownHook = new ShutdownHook();

createSamplesStream().subscribe((sample) => {
  const packet = oscServer.nextSample(sample);
  console.log(JSON.stringify(packet, null, 2));
});

shutdownHook.add(
  () => {
    oscServer.disconnect();
  },
  { name: "osc server disconnect" }
);
