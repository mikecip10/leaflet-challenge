// Map
var myMap = L.map("map", {
  center: [36.77, -119.41],
  zoom: 5
});

// Tile
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Marker
function markerSize(quakeMagnitude) {
    return quakeMagnitude * 5;
}

// Opacity
function markerOpacity(quakeMagnitude) {
  if (quakeMagnitude > 6) {
    return .9
  } else if (quakeMagnitude > 5) {
    return .8
  } else if (quakeMagnitude > 4) {
    return .7
  } else (quakeMagnitude > 3)
    return .60
  }

// Color
function markerColor(quakeMagnitude) {
  if (quakeMagnitude > 5) {
    return 'red'
  } else if (quakeMagnitude > 4) {
    return 'orange'
  } else (quakeMagnitude > 3)
    return 'yellow'
  }

// GET request, and function to handle returned JSON data
d3.json(queryUrl, function(data) {
  
  var earthquakes = L.geoJSON(data.features, {
    onEachFeature : popup,
    pointToLayer: marker
  });

// call function to create map
  createMap(earthquakes);

});

function marker(feature, location) {
  var options = {
    stroke: false,
    fillOpacity: markerOpacity(feature.properties.mag),
    color: markerColor(feature.properties.mag),
    fillColor: markerColor(feature.properties.mag),
    radius: markerSize(feature.properties.mag)
  }

  return L.circleMarker(location, options);

}

// Define a function we want to run once for each feature in the features array
function popup(feature, layer) {
  // Give each feature a popup describing the place and time of the earthquake
  return layer.bindPopup(`<h3> ${feature.properties.place} </h3> <hr> <h4>Magnitude: ${feature.properties.mag} </h4> <p> ${Date(feature.properties.time)} </p>`);
}

// function to receive a layer of markers and plot them on a map.
function createMap(earthquakes) {

  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

}).addTo(myMap);
