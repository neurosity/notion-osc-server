import { UDPPort } from "osc";

import {
  deviceId,
  channelNames,
  oscLocalHost,
  oscLocalPort,
  oscRemotePort,
  oscDataFormat
} from "./options";

import { Sample } from "./types/Sample";
import { getSubnetBroadcastAddress } from "./getSubnetBroadcastAddress";

export class OSC {
  osc: UDPPort;

  constructor() {
    const oscRemoteHost = getSubnetBroadcastAddress("en0");

    this.osc = new UDPPort({
      localAddress: oscLocalHost,
      localPort: oscLocalPort,
      remoteAddress: oscRemoteHost,
      remotePort: oscRemotePort,
      broadcast: true,
      metadata: true
    });

    this.osc.on("ready", () => {
      console.info(
        `osc: port is streaming over UDP | local ${oscLocalHost}:${oscLocalPort} | remote ${oscRemoteHost}:${oscRemotePort}`
      );
    });

    this.osc.open();
  }

  // Neuromore compatible format
  nextSampleByChannel(sample: Sample) {
    sample.data.forEach((channelAmplitude, channelIndex) => {
      const channel = (
        channelNames?.[channelIndex] ?? ""
      ).toLowerCase();

      this.osc.send({
        address: `/neurosity/notion/${deviceId}/${channel}`,
        args: [
          {
            type: "f",
            value: channelAmplitude
          }
        ]
      });
    });
  }

  nextNeuromoreSample(sample: Sample) {
    let packet;

    sample.data.forEach((channelAmplitude, channelIndex) => {
      const channel = (
        channelNames?.[channelIndex] ?? ""
      ).toLowerCase();

      packet = {
        address: `/neurosity/notion/${deviceId}/${channel}`,
        args: [
          {
            type: "f",
            value: channelAmplitude
          }
        ]
      };

      this.osc.send(packet);
    });

    return packet;
  }

  nextBrainFlowSample(sample: Sample) {
    const packet = {
      address: `/neurosity/notion/${deviceId}/raw`,
      args: [
        sample.data.map((channelAmplitude) => ({
          type: "f",
          value: channelAmplitude
        })),
        {
          type: "s",
          value: sample.timestamp
        },
        {
          type: "i",
          value: sample.count
        },
        {
          type: "s",
          value: sample.marker || ""
        }
      ]
    };

    this.osc.send(packet);

    return packet;
  }

  nextSample(sample: Sample) {
    if (oscDataFormat === "brainflow") {
      return this.nextBrainFlowSample(sample);
    }

    if (oscDataFormat === "neuromore") {
      return this.nextNeuromoreSample(sample);
    }
  }

  disconnect() {
    this.osc.close();
    console.info(`osc: port disconnected`);
  }
}
