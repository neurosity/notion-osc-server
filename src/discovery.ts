import { UDPPort } from "osc";

const udp = new UDPPort({
  localAddress: "0.0.0.0",
  localPort: 9000
});

udp.open();

udp.on("ready", function () {
  console.log("receiver is ready");
});

udp.on("message", function (message, timetag, info) {
  console.log(message);
});
