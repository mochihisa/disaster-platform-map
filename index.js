//ここの読み込みをgeojsonなどでループ回したい

//とりあえず国土地理院のCSVそのままで
let csv = new XMLHttpRequest();
csv.open("GET", "shelter-ishikawa.csv", false);
try {
    csv.send(null);
} catch (err) {
    console.log(err);
}

let shelterArray = [];

let lines = csv.responseText.split(/\r\n|\n/);

for (let i = 0; i < lines.length; ++i) {
    let cells = lines[i].split(",");
    if (cells.length != 1) {
        shelterArray.push(cells);
    }
}


shelterMarkers = L.featureGroup();

shelterArray.forEach(function(shelter){
    console.log(shelter);
    shelterMarkers.addLayer(L.marker([shelter.slice(-3)[0], shelter.slice(-2)[0]])
    .bindPopup(`<a href=\"\">${shelter[3]}</a>`)
    .on('click', function (e) {
        map.setView([shelter.slice(-3)[0], shelter.slice(-2)[0]], 19);
    }));
});


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
map.on('zoomend', function () {
    if (map.getZoom() >= 9) {
        map.removeLayer(areaCircles);
        map.addLayer(shelterMarkers);
    } else {
        map.removeLayer(shelterMarkers);
        map.addLayer(areaCircles);
    }
});