import { config } from "dotenv";

config();

export const deviceId =
  process.env.NEUROSITY_DEVICE_UUID || "local7cca794fb5f4675a69371e949b2";

export const channels = Number(process.env.NEUROSITY_DEVICE_CHANNELS) || 8;

export const modelName = process.env.NEUROSITY_DEVICE_MODEL_NAME || "Crown";

export const modelVersion = process.env.NEUROSITY_DEVICE_MODEL_VERSION || "3";

export const model = `${modelName} ${modelVersion}`;

export const manufacturer =
  process.env.NEUROSITY_DEVICE_MANUFACTURER || "Neurosity, Inc";

export const deviceNickname: string = getDeviceNickname(deviceId, modelName);

export const channelNames = (
  process.env.NEUROSITY_DEVICE_CHANNEL_NAMES || "CP3,C3,F5,PO3,PO4,F6,C4,CP4"
).split(",");

export const samplingRate =
  Number(process.env.NEUROSITY_DEVICE_SAMPLING_RATE) || 256;

export const oscLocalHost = process.env.NEUROSITY_OSC_LOCAL_HOST || "0.0.0.0";

export const oscLocalPort =
  Number(process.env.NEUROSITY_OSC_LOCAL_PORT) || 8000;

export const oscRemotePort =
  Number(process.env.NEUROSITY_OSC_REMOTE_PORT) || 9000;

export const oscDataFormat =
  process.env.NEUROSITY_OSC_DATA_FORMAT || "brainflow";

export function getDeviceNickname(deviceId: string, modelName: string): string {
  const shortId = getShortDeviceId(deviceId, 3).toUpperCase();
  return `${modelName}-${shortId}`;
}

export function getShortDeviceId(deviceId: string, length: number = 7): string {
  return deviceId.substring(0, length);
}
