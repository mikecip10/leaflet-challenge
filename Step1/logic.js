// queries
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var query2 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"

// GET
d3.json(queryUrl, function(data) {
  createFeatures(data.features);
});

function createFeatures(quakeData) {

  // Pop ups
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
      "</h3><hr><p>Magnitude: " + feature.properties.mag + "</p>");
  }

  // Marker
  var quakes = L.geoJSON(quakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      var color;
      var g = 255;
      var r= Math.floor(250-75*feature.properties.mag);
      var b = Math.floor(250-75*feature.properties.mag);
      color= "rgb("+r+" ,"+g+","+ b+")"
      
      var geojsonMarkerOptions = {
        radius: 5*feature.properties.mag,
        fillColor: color,
        color: "black",
        weight: 1.5,
        opacity: 1,
        fillOpacity: 0.6
      };
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  });


  createMap(quakes);
  
}

function createMap(quakes) {

  // layers
  var streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})

  var baseMaps = {
    "Street Map": streets
  };

  var overlayMaps = {
    Earthquakes: quakes
  };

  var myMap = L.map("map", {
    center: [
      37.09, -119.4
    ],
    zoom: 5,
    layers: [streets, quakes]
  });


  function getColor(a) {
      return a < 1 ? 'rgb(0, 153, 51)' :
            a < 2  ? 'rbg(255,225,225)' :
            a < 3  ? 'rbg(255,195,195)' :
            a < 4  ? 'rbg(255,165,165)' :
            a < 5  ? 'rgb(255,135,135)' :
            a < 6  ? 'rgb(255,105,105)' :
            d < 8  ? 'rgb(255,45,45)' :
            a < 7  ? 'rgb(255,75,75)' :
            d < 9  ? 'rgb(255,15,15)' :
            'rgb(255,0,0)';
        }

  // legend
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 1, 2, 3, 4, 5, 6, 7, 8],
      labels = [];

      div.innerHTML+='Magnitude<br><hr>'
  
      // loop
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }
  
  return div;
  };
  
  legend.addTo(myMap);

}