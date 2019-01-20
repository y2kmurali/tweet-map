// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create map instance
var chart = am4core.create("map", am4maps.MapChart);
chart.geodata = am4geodata_usaAlbersHigh;
chart.projection = new am4maps.projections.Miller();
chart.homeZoomLevel = 1;
chart.fitMapToContainer = true;

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
polygonSeries.useGeodata = true;
polygonSeries.mapPolygons.template.fill = chart.colors.getIndex(0).lighten(0.4);
polygonSeries.mapPolygons.template.tooltipText = "{name}";

//zoom bar
chart.zoomControl = new am4maps.ZoomControl();
chart.zoomControl.slider.height = 100;

//home button
var button = chart.chartContainer.createChild(am4core.Button);
button.padding(5, 5, 5, 5);
button.width = 20;
button.align = "right";
button.marginRight = 15;
button.events.on("hit", function () {
    chart.goHome();
});
button.icon = new am4core.Sprite();
button.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";

//click to focus on state
polygonSeries.mapPolygons.template.events.on("hit", function (ev) {
    ev.target.series.chart.zoomToMapObject(ev.target);
});

//hover stuff
// var hs = polygonSeries.mapPolygons.template.states.create("hover");
// hs.properties.fill = am4core.color("#367B25");
// hs.properties.stroke = am4core.color("#222");
// hs.properties.scale = 1.01;

//function to convert input to polygon series data


//heatmap stuff
polygonSeries.data = [];

//create polygon data fields
//polygonSeries.dataField.value = "value";

function redoData() {
    fetch('http://localhost:3000/api').then(response => {
        return response.json();
    }).then(data => {
        // Work with JSON data here
        //chart.invalidateRawData();
        // console.log(data);
        //polygonSeries.data.length = 0;
        var dd = [];
        Object.keys(data).forEach(function (key) {
            dd.push({ "id": key, "value": data[key] });
        });
        polygonSeries.data = dd;

        // data.forEach( function (pair) {
        //     polygonSeries.data.push({ "id": pair["id"], "value" : pair["value"]});                        
        // });
        //chart.validateData();
        // console.log(polygonSeries.data)
        
    }).catch(err => {
        console.log(err);
    });
    setTimeout(redoData, 500);
}

redoData();

polygonSeries.heatRules.push({
    "property": "fill",
    "target": polygonSeries.mapPolygons.template,
    "min": am4core.color("#fc6c6c"),
    "max": am4core.color("#6ec980"),
    "minValue": 0,
    "maxValue": 100,
    "dataField": "value"
});

polygonSeries.mapPolygons.template.propertyFields.value = "value";
polygonSeries.mapPolygons.template.tooltipText = "{name}: {value}";