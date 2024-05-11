import 'leaflet-draw'
import * as L from 'leaflet';

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DrawManagerService {


    public _drawDict: { [key: string]: any; } = {};

    editableLayers = new L.FeatureGroup();
    constructor() { }


    get drawDict(): { [key: string]: any; } {
        return this._drawDict;
    }

    set drawDict(value: { [key: string]: any; }) {
        this._drawDict = value;
    }

    createdDraw(e: any) {

        var type = e.layerType,
            layer = e.layer;
        this.addDrawList(layer._leaflet_id, layer.toGeoJSON());
    }

    editedDraw(e: any, map: L.Map,) {

        let layers: any = e.layers._layers;
        for (let layerId in layers) {
            this.addDrawList(layerId, layers[layerId].toGeoJSON());
        }

    }

    deletedDraw(e: any) {
        let layers: any = e.layers._layers;
        for (let layerId in layers) {
            this.deleteDrawListElement(layerId);
        }

    }

    addDrawList(leafletId: string, draw: any) {
        //overwrite existing one for now okay 
        this.drawDict[leafletId] = draw;
        console.log(`added draw with leafletId: ${leafletId}`);
    }
    deleteDrawListElement(leafletId: string) {
        if (this.drawDict.hasOwnProperty(leafletId)) {
            delete this.drawDict[leafletId];
            console.log(`deleted draw with leafletId: ${leafletId}`);
        } else {
            console.log(`draw with leafletId: ${leafletId} not found`);
        }

    }

    addDraw(map: L.Map) {

        map.addLayer(this.editableLayers);



        let MyCustomMarker = L.Icon.extend({
            options: {
                shadowUrl: null,
                iconAnchor: new L.Point(12, 12),
                iconSize: new L.Point(24, 24),
                iconUrl: 'link/to/image.png'
            }
        });

        let option: L.Control.DrawConstructorOptions = {
            position: 'topright',
            draw: {
                polyline: {
                    shapeOptions: {
                        color: '#f357a1',
                        fillColor: '#f357a1',
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
                        color: '#02ff89',
                        fillColor: 'rgb(9, 255, 0)',
                    }
                },
                rectangle: false,
                marker: {
                    icon: new MyCustomMarker()
                }
            },
            edit: {
                featureGroup: this.editableLayers, //REQUIRED!!
                remove: true
            }
        };

        var drawControl = new L.Control.Draw(option);
        map.addControl(drawControl);

        map.on(L.Draw.Event.CREATED, (e: any) => {
            var type = e.layerType,
                layer = e.layer;

            if (type === 'marker') {
                layer.bindPopup('A popup!');
            }

            this.editableLayers.addLayer(layer);

        });
        map.on('draw:created', (e: any) => {
            this.createdDraw(e);

        });

        map.on('draw:edited', (e: any) => {
            this.editedDraw(e, map);
        });
        map.on('draw:deleted', (e: any) => {
            this.deletedDraw(e);
        });
    }
}