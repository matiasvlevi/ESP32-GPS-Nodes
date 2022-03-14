async function markerContent(macAdress) {
  return (await (await fetch(`./getDeviceDom?id=${macAdress}`)).json()).DOM;
}

async function getDeviceGPS(macAdress) {
  let gps = (await (await fetch(`./getDeviceGPS?id=${macAdress}`)).json());
  return gps;
}