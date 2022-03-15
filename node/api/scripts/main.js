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

async function initMarker(map, gps, key) {
  markers[key] = marker(
    map,
    gps,
    await markerContent(key) // Custom DOM element
  );
}

async function updateMarker(gps, key) {
  markers[key].setPopupContent(await markerContent(key));
  markers[key].setLatLng(
    new L.LatLng(gps.lat, gps.lon)
  );
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
    if (gps.lon === undefined) continue;
    if (update && markers[adresses[i]] !== undefined) {
      await updateMarker(gps, adresses[i]);
    } else {
      // Save marker with the same index as it's corresponding node.
      await initMarker(mapObj, gps, adresses[i]);
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
