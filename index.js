//ここの読み込みをgeojsonなどでループ回したい
shelterMarkers = L.featureGroup();
shelterMarkers.addLayer(L.marker([36.56116, 136.6575]).bindPopup("<a href=\"\">避難所1</a>"));
shelterMarkers.addLayer(L.marker([36.56316, 136.5475]).bindPopup("<a href=\"\">避難所2</a>"));

areaCircles = L.featureGroup();
areaCircles.addLayer(L.circle([36.56106, 136.6565], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 100000
}).on('click', function (e) {
    map.setView([36.56106, 136.6565], 9);
}));



// 初期地図表示
var map = L.map('map').setView([36.56106, 136.6565], 6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

map.addLayer(areaCircles);


// zoom
map.on('zoomend', function() {
    if (map.getZoom() >=9){
        map.removeLayer(areaCircles);
        map.addLayer(shelterMarkers);
    } else {   
        map.removeLayer(shelterMarkers);
        map.addLayer(areaCircles);
    }
});