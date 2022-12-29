let map, draw, source, layer, pointInteraction, lineInteraction, polygonInteraction;
var iconFeatureList = [];
let hitTolerance;
var features = [];
var jspanelCounter = 0;

initializeMap = () => {

    source = new ol.source.Vector({ wrapX: false });

    layer = new ol.layer.Vector({
        source: source,
    });

    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            layer
        ],
        view: new ol.View({
            center: [3875337.272593909, 4673762.797695817],
            zoom: 7
        })
    });

    pointInteraction = new ol.interaction.Draw({
        source: source,
        type: "Point"
    })
    map.addInteraction(pointInteraction);
    pointInteraction.setActive(false);
    pointInteraction.on("drawend",
        (event) => {
            console.log(event.feature.getGeometry().getCoordinates());
            pointInteraction.setActive(false);
            var format = new ol.format.WKT(),
                wkt = format.writeGeometry(event.feature.getGeometry());
            $('#geometryType').val(wkt); //deðere atama yapýyoruz 
            $('#addPopupNumber').val('')
            $('#addPopupName').val('')
            $('#addPopup').show();

        });


    lineInteraction = new ol.interaction.Draw({
        source: source,
        type: "LineString"
    })
    map.addInteraction(lineInteraction);
    lineInteraction.setActive(false);
    lineInteraction.on("drawend",
        (event) => {
            console.log(event.feature.getGeometry().getCoordinates());
            lineInteraction.setActive(false);
            var format = new ol.format.WKT(),
                wkt = format.writeGeometry(event.feature.getGeometry());
            $('#geometryType').val(wkt);
            $('#addPopupNumber').val('')
            $('#addPopupName').val('')
            $('#addPopup').show();
        });


    polygonInteraction = new ol.interaction.Draw({
        source: source,
        type: "Polygon"
    })
    map.addInteraction(polygonInteraction);
    polygonInteraction.setActive(false);
    polygonInteraction.on("drawend",
        (event) => {
            console.log(event.feature.getGeometry().getCoordinates());
            polygonInteraction.setActive(false);
            var format = new ol.format.WKT(),
                wkt = format.writeGeometry(event.feature.getGeometry());
            $('#geometryType').val(wkt);
            $('#addPopupNumber').val('')
            $('#addPopupName').val('')
            $('#addPopup').show();
        });


    InfoInteraction = new ol.interaction.Select({
        source: source
    })
    map.addInteraction(InfoInteraction);
    InfoInteraction.setActive(false);
}
var addDrawCount = 0; //Amaç olarak add draw yaparken info drawing e basýlmasýný önlemek.
$("a.draw-tools").on("click", function () {
    addDrawCount = addDrawCount + 1;
    InfoInteraction.setActive(false);
    var type = $(this).data("draw-type");
    InteractionControl(type);
})


function InteractionControl(Value) {
    if (Value == "Line") {
        pointInteraction.setActive(false);
        lineInteraction.setActive(true);
        polygonInteraction.setActive(false);
    }
    else if (Value == "Poly") {
        pointInteraction.setActive(false);
        lineInteraction.setActive(false);
        polygonInteraction.setActive(true);
    }
    else if (Value == "Point") {
        pointInteraction.setActive(true);
        lineInteraction.setActive(false);
        polygonInteraction.setActive(false);
    }
    else {
        pointInteraction.setActive(false);
        lineInteraction.setActive(false);
        polygonInteraction.setActive(false);
    }

}

function InfoDrawing() {
    if (addDrawCount == 0) {
        InfoInteraction.setActive(true);
        InfoInteraction.on("select", function (event) {
            // debugger;
            event.selected.forEach(element => {
                // var format = new ol.format.WKT()
                // wkt = format.writeGeometry(element.values_.geometry);
                features.push(element);
                // $('#infoWkt').val(wkt);
                // $('#infoName').val(element.values_.name);
                // $('#infoNumber').val(element.values_.number);
                // $('#InfoPopup').show();
            });
            openjsPanel(features);
            features = [];
        });
    }
}

function openjsPanel(features) { //info drawing icin olan jspanel.
    if (features.length >= 1 && jspanelCounter == 0) {
        jsPanel.create({
            position: 'left-top',
            content: '<table id="example2" class="display" style="width:100%"> <thead> <tr> <th>Number</th> <th>Name</th> <th>Polyline</th>  </tr> </thead>  <tbody>  </tbody>  <tfoot>   <tr>  <th>Number</th>  <th>Name</th>  <th>Polyline</th> </tr> </tfoot> </table>',
            contentSize: '700 350',
            headerTitle: 'my first panel',
            theme: 'primary',
            callback: function (panel) {
                // do something if needed ...
            }
        });

        var t = $('#example2').DataTable();
        features.forEach(element => {

            var format = new ol.format.WKT()
            wkt = format.writeGeometry(element.values_.geometry);
            t.row.add([element.values_.number, element.values_.name, wkt]).draw(false);
        });

        jspanelCounter = jspanelCounter + 1;

    }

}
function toggleAddCancel1() {
    $('#addPopup').hide();
    InfoInteraction.setActive(true);
    addDrawCount = 0;
}

function toggleAddCancel2() {
    $('#addPopup').hide();
    InfoInteraction.setActive(true);
    addDrawCount = 0;
    location.reload()
}

function QueryDrawing() { //query Drawing icin olan jspanel.
    jsPanel.create({
        position: 'left-top',
        content: '<table id="example" class="display" style="width:100%"> <thead> <tr> <th>Number</th> <th>Name</th> <th>Polyline</th>  </tr> </thead>  <tbody>  </tbody>  <tfoot>   <tr>  <th>Number</th>  <th>Name</th>  <th>Polyline</th> </tr> </tfoot> </table>',
        contentSize: '700 350',
        headerTitle: 'my first panel',
        theme: 'primary',
        callback: function (panel) {

        }
    });

    var t = $('#example').DataTable();

    t.clear().draw();
    $.get("https://localhost:7220/api/Polyline/getall",
        function (data, status) {
            data.forEach(element => {
                t.row.add([element.number, element.name, element.polyline]).draw(false);
            });
        });
    // InfoInteraction.setActive(false);     
}

function getLine() {

    $.get("https://localhost:7220/api/Polyline/getall",
        function (data, status) {

            if (data != null) {

                data.forEach(element => {
                    var format = new ol.format.WKT();
                    var wkt = element.polyline;
                    var geom = format.readGeometry(wkt);
                    const iconFeature = new ol.Feature({
                        geometry: geom,
                        name: element.name,
                        number: element.number
                    });
                    // debugger;
                    if (iconFeature.name != '' && iconFeature.number != '') {
                        iconFeatureList.push(iconFeature);
                    }
                });

                const vector = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: iconFeatureList
                    }),

                });

                map.addLayer(vector);
            }
        });
}

function saveLine() {
    // debugger;
    if ($('#addPopupNumber').val() == '' || $('#addPopupName').val() == '') {
        alert("Lutfen alanlari bos birakmayiniz!")
    }
    else {
        $.ajax({
            url: 'https://localhost:7220/api/Polyline/add',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                number: $('#addPopupNumber').val(), name: $('#addPopupName').val(), polyline: $('#geometryType').val()
            }),
            dataType: 'json'
        }).done(function (data) {
            getLine();
            toggleAddCancel1();
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getLine();
    initializeMap();
});

document.addEventListener('jspanelbeforeclose', function (event) {

    jspanelCounter = 0;
    InfoInteraction.setActive(false); //Durmadan info butonuna basmak için yazdýk. 
}, false);

