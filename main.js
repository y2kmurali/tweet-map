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
button.events.on("hit", function() {
  chart.goHome();
});
button.icon = new am4core.Sprite();
button.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";

//click to focus on state
polygonSeries.mapPolygons.template.events.on("hit", function(ev) {
    ev.target.series.chart.zoomToMapObject(ev.target);
})

//hover stuff
var hs = polygonSeries.mapPolygons.template.states.create("hover");
hs.properties.fill = am4core.color("#367B25");