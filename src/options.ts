import { config } from "dotenv";

config();

export const deviceId =
  process.env.NEUROSITY_DEVICE_UUID ||
  "local7cca794fb5f4675a69371e949b2";

export const channels =
  Number(process.env.NEUROSITY_DEVICE_CHANNELS) || 8;

export const channelNames = (
  process.env.NEUROSITY_DEVICE_CHANNEL_NAMES ||
  "CP6,F6,C4,CP4,CP3,F5,C3,CP5"
).split(",");

export const samplingRate =
  Number(process.env.NEUROSITY_DEVICE_SAMPLING_RATE) || 250;

export const oscLocalHost =
  process.env.NEUROSITY_OSC_LOCAL_HOST || "0.0.0.0";

export const oscLocalPort =
  Number(process.env.NEUROSITY_OSC_LOCAL_PORT) || 8000;

export const oscRemoteHost =
  process.env.NEUROSITY_OSC_REMOTE_HOST || "192.168.0.255";

export const oscRemotePort =
  Number(process.env.NEUROSITY_OSC_REMOTE_PORT) || 9000;

export const oscDataFormat =
  process.env.NEUROSITY_OSC_DATA_FORMAT || "brainflow";
