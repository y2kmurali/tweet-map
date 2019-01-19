// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create map instance
var chart = am4core.create("map", am4maps.MapChart);
chart.geodata = am4geodata_usaAlbersLow;
chart.projection = new am4maps.projections.Miller();
chart.homeZoomLevel = 1;

chart.fitMapToContainer = true;

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

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
polygonSeries.useGeodata = true;
polygonSeries.mapPolygons.template.fill = chart.colors.getIndex(0).lighten(0.4);
polygonSeries.mapPolygons.template.tooltipText = "{name}";

//hover stuff
var hs = polygonSeries.mapPolygons.template.states.create("hover");
hs.properties.fill = am4core.color("#367B25");

// Add line bullets
var cities = chart.series.push(new am4maps.MapImageSeries());
cities.mapImages.template.nonScaling = true;

var city = cities.mapImages.template.createChild(am4core.Circle);
city.radius = 6;
city.fill = chart.colors.getIndex(0).brighten(-0.2);
city.strokeWidth = 2;
city.stroke = am4core.color("#fff");

function addCity(coords, title) {
    var city = cities.mapImages.create();
    city.latitude = coords.latitude;
    city.longitude = coords.longitude;
    city.tooltipText = title;
    return city;
}




/*var paris = addCity({ "latitude": 48.8567, "longitude": 2.3510 }, "Paris");
var toronto = addCity({ "latitude": 43.8163, "longitude": -79.4287 }, "Toronto");
var la = addCity({ "latitude": 34.3, "longitude": -118.15 }, "Los Angeles");
var havana = addCity({ "latitude": 23, "longitude": -82 }, "Havana");*/