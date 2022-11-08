let map, draw, source, layer;

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
}

addInteraction = () => {

    draw = new ol.interaction.Draw({
        source: source,
        type: "LineString"
    });

    map.addInteraction(draw);

    draw.setActive(false);

    draw.on("drawend",
        (event) => {
            console.log(event.feature.getGeometry().getCoordinates());
            draw.setActive(false);
            $('#polyline').val(JSON.stringify(event.feature.getGeometry().getCoordinates()));
            $('#addPopupNumber').val('')
            $('#addPopupName').val('')
            $('#addPopup').show();
            // create a default jsPanel
            // jsPanel.create({
            //     position: 'center',
            //     content: ' <form> '
            //     + ' <span class="close" onclick="toggleAddCancel()">&times;</span>'
            //     + '  <input hidden id="polyline" />'
            //     + '<div class="form-group">'
            //     + '<label for="addPopupNumber">Number</label>'
            //     + '<input type="text" class="form-control" id="addPopupNumber" ><br><br>'
            //     + '</div>'
            //     + '<div class="form-group">'
            //     + '<label for="addPopupName">Name:</label>'
            //     + '<input type="text" class="form-control" id="addPopupName" /><br><br>'
            //     + '</div>'
            //     + '<button onclick="saveLine()">Save</button>'    
            //     + '</form>',
            //     contentSize: '700 350',
            //     headerTitle: 'my first panel',
            //     theme: 'primary',
            //     callback: function (panel) {
            //         // do something if needed ...
            //     }
            // });
        });

}

function toggleAddCancel() {
    $('#addPopup').hide();
}

addDrawing = () => {
    draw.setActive(true);
}

function toggleCancel() {
    t.clear().draw();
    $('#popup').hide();
}

function toggle() {
    t.clear().draw();
    $.get("https://localhost:7220/api/Polyline/getall",
        function (data, status) {
            data.forEach(element => {
                t.row.add([element.number, element.name,element.polyline]).draw(false);
            });
        });
    $('#popup').show();
}

function getLine() {
    $.get("https://localhost:7220/api/Polyline/getall",
        function (data, status) {
            data.forEach(element => {
                const iconFeature = new ol.Feature({
                    geometry: new ol.geom.LineString(JSON.parse(element.polyline)),
                    name: 'Somewhere near Nottingham',
                });
                const vector = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: [iconFeature]
                    }),
                    type: "LineString"
                });

                map.addLayer(vector);
            });
        });
}

function saveLine() {
    $.ajax({
        url: 'https://localhost:7220/api/Polyline/add',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            number: $('#addPopupNumber').val(), name: $('#addPopupName').val(), polyline: $('#polyline').val()
        }),
        dataType: 'json'
    }).done(function (data) {
        toggleAddCancel();
    });
}