import   'leaflet-draw'
import * as L from 'leaflet';

//import * as B from  'leaflet-trace'; // Import the 'leaflet-trace' module
 export  function addDraw(map: L.Map) {

    let editableLayers = new L.FeatureGroup();
    map.addLayer(editableLayers);
    
    let MyCustomMarker = L.Icon.extend({
        options: {
            shadowUrl: null,
            iconAnchor: new L.Point(12, 12),
            iconSize: new L.Point(24, 24),
            iconUrl: 'link/to/image.png'
        }
    });



    

    let option: L.Control.DrawConstructorOptions = { position: 'topright',
    draw: {
        polyline: {
            shapeOptions: {
                color: '#f357a1',
                weight: 10
            }
        },
        polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
                color: '#e1e100', // Color the shape will turn when intersects
                message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
            },
            shapeOptions: {
                color: '#bada55'
            }
        },
        circle: false, // Turns off this drawing tool
        rectangle: {
            shapeOptions: {
              fillColor: "red",
            }
        },
        marker: {
            icon: new MyCustomMarker()
        }
    },
    edit: {
        featureGroup: editableLayers, //REQUIRED!!
        remove: false
    }
};
    
  var drawControl = new L.Control.Draw(option);
  map.addControl(drawControl);

  map.on(L.Draw.Event.CREATED, function (e:any) {
      var type = e.layerType,
          layer = e.layer;

      if (type === 'marker') {
          layer.bindPopup('A popup!');
      }

      editableLayers.addLayer(layer);
    
  });
}