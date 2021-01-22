import { UDPPort } from "osc";
import { timer, Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";

import {
  deviceId,
  deviceNickname,
  channels,
  model,
  modelName,
  modelVersion,
  manufacturer,
  samplingRate,
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
  disconnectSubject: Subject<boolean> = new Subject();

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

    this.sendDeviceInfo();
  }

  sendDeviceInfo(): Subscription {
    const packet = {
      address: `/neurosity/notion/${deviceId}/info`,
      args: [
        {
          type: "s",
          value: deviceId
        },
        {
          type: "s",
          value: deviceNickname
        },
        {
          type: "s",
          value: model
        },
        {
          type: "s",
          value: modelName
        },
        {
          type: "s",
          value: modelVersion
        },
        {
          type: "s",
          value: manufacturer
        },
        {
          type: "i",
          value: samplingRate
        },
        {
          type: "i",
          value: channels
        },
        {
          type: "s",
          value: channelNames.join(",")
        }
      ]
    };

    // Send every second
    return timer(0, 1000)
      .pipe(takeUntil(this.disconnectSubject))
      .subscribe(() => {
        this.osc.send(packet);
      });
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
    this.disconnectSubject.next(true);
    console.info(`osc: port disconnected`);
  }
}
