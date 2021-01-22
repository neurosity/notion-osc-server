const osc = require("osc");

const udp = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: 9000
});

udp.open();

udp.on("ready", function () {
  console.log("receiver is ready");
});

udp.on("message", function (message, timetag, info) {
  if (message.address.split("/")[4] === "info") {
    console.log("info", message);
  }

  if (message.address.split("/")[4] === "raw") {
    console.log("raw", message);
  }
});
