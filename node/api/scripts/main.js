let map;
let markers = {};
let auto = true;
const TIMEOUT = 1000;
const HOME = [45.532286, -73.589860];

// Add a marker to the map
function marker(mapObj, point, html = undefined) {
  let m = L.marker([point.lat, point.lon])

  m.addTo(mapObj)
    .bindPopup(`<div class="marker-content">${html}</div>`)
  // .openPopup();

  return m;
}

// Load ESP32 data 
function loadMarkers(update = true) {
  console.log("Fetching nodes data")
  fetch('../adresses.json').then(res => res.json()).then(adresses => {
    createMarkers(map, adresses, update);
  });
}

// Create or update all markers
async function createMarkers(mapObj, adresses, update = true) {
  for (let i = 0; i < adresses.length; i++) {
    let gps = await getDeviceGPS(adresses[i]);
    console.log(gps);
    if (gps.lon !== undefined) {
      if (update && markers[adresses[i]] !== undefined) {
        markers[adresses[i]].setPopupContent(await markerContent(adresses[i]));
        markers[adresses[i]].setLatLng(
          new L.LatLng(gps.lat, gps.lon)
        );
      } else {
        // Save marker with the same index as it's corresponding node.
        markers[adresses[i]] = marker(
          mapObj,
          gps,
          await markerContent(adresses[i]) // Custom DOM element
        );
      }

    }
  }

  // Auto refresh
  if (auto === true) setTimeout(loadMarkers, TIMEOUT)
}

// Window load event
window.addEventListener('load', () => {
  map = L.map('map').setView(HOME, 25);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  loadMarkers(false);
});
