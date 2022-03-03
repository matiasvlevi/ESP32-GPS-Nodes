var map;
let markers = [];

// Add a marker to the map
function marker(mapObj, point, text = '') {
  let m = L.marker(point);
  m.addTo(mapObj)
    .bindPopup(text)
    .openPopup();

  return m;
}


// Load ESP32 data 
function loadMarkers(update = false) {
  console.log("Fetching nodes data")
  fetch('../data.json').then(res => res.json()).then(x => {
    console.log(x);
    createMarkers(map, x, update);
  });
}

// Create or update all markers
function createMarkers(mapObj, devices, update = false) {
  nodes = Object.values(devices);
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].gps !== undefined) {
      if (!update) mapObj.removeLayer(markers[i]);
      // Save marker with the same index as it's corresponding node.
      markers[i] = (marker(mapObj, [nodes[i].gps.lat, nodes[i].gps.lon], nodes[i].ip));

    }
  }
  setTimeout(loadMarkers, 1500)
}

// Window load event
window.addEventListener('load', () => {
  map = L.map('map').setView([45.56067369133939, -73.71906214019843], 25);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  loadMarkers(true);
});
