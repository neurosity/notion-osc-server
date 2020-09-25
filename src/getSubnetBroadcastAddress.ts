import { networkInterfaces } from "os";

export const globalBroadcastAddress = "255.255.255.255";

export function getSubnetBroadcastAddress(interfaceName = "wlan0") {
  const allInterfaces = networkInterfaces();

  if (!(interfaceName in allInterfaces)) {
    console.log(
      `osc: could not find interface ${interfaceName}. defaulting to global broadcast address: ${globalBroadcastAddress}`
    );
    return globalBroadcastAddress;
  }

  const addressInfo = allInterfaces[interfaceName].find(
    (e) => e.family === "IPv4"
  );

  if (!addressInfo) {
    console.log(
      `osc: could not find subnet broadcast address. defaulting to global broadcast address: ${globalBroadcastAddress}`
    );
    return globalBroadcastAddress;
  }

  const addressSplit = addressInfo.address.split(".");
  const netmaskSplit = addressInfo.netmask.split(".");

  return addressSplit
    .map((e: any, i) => (~netmaskSplit[i] & 0xff) | e)
    .join(".");
}
