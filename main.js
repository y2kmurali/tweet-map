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

//heatmap stuff
polygonSeries.data = [
  { id: "US-AL", value: 60.524 },
  { id: "US-AK", value: 77.185 },
  { id: "US-AZ", value: 70.874 },
  { id: "US-AR", value: 51.498 },
  { id: "US-CA", value: 76.128 },
  { id: "US-CO", value: 74.469 },
  { id: "US-CT", value: 82.364 },
  { id: "US-DE", value: 80.965 },
  { id: "US-DC", value: 10.965 },
  { id: "US-FL", value: 70.686 },
  { id: "US-GA", value: 76.474 },
  { id: "US-HI", value: 70.258 },
  { id: "US-ID", value: 69.829 },
  { id: "US-IL", value: 80.373 },
  { id: "US-IN", value: 59.165 },
  { id: "US-IA", value: 67.888 },
  { id: "US-KS", value: 66.969 },
  { id: "US-KY", value: 76.211 },
  { id: "US-LA", value: 47.152 },
  { id: "US-ME", value: 73.667 },
  { id: "US-MD", value: 78.350 },
  { id: "US-MA", value: 73.448 },
  { id: "US-MI", value: 55.932 },
  { id: "US-MN", value: 53.637 },
  { id: "US-MS", value: 71.577 },
  { id: "US-MO", value: 54.610 },
  { id: "US-MT", value: 81.323 },
  { id: "US-NE", value: 74.771 },
  { id: "US-NV", value: 49.517 },
  { id: "US-NH", value: 50.724 },
  { id: "US-NJ", value: 79.691 },
  { id: "US-NM", value: 75.178 },
  { id: "US-NY", value: 73.835 },
  { id: "US-NC", value: 60.661 },
  { id: "US-ND", value: 49.643 },
  { id: "US-OH", value: 58.320 },
  { id: "US-OK", value: 79.712 },
  { id: "US-OR", value: 50.367 },
  { id: "US-PA", value: 76.881 },
  { id: "US-RI", value: 79.088 },
  { id: "US-SC", value: 79.674 },
  { id: "US-SD", value: 77.552 },
  { id: "US-TN", value: 79.251 },
  { id: "US-TX", value: 79.251 },
  { id: "US-UT", value: 61.319 },
  { id: "US-VA", value: 73.181 },
  { id: "US-VT", value: 69.420 },
  { id: "US-WA", value: 76.195 },
  { id: "US-WV", value: 70.933 },
  { id: "US-WI", value: 72.361 },
  { id: "US-WY", value: 52.562 },
];

//create polygon data fields
//polygonSeries.dataField.value = "value";

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

