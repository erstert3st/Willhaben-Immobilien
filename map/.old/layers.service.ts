import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-control-window';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  constructor() { }
  addLayers(map: L.Map) {

    const baseLayer = this.createBaseLayer();
    const transportLayer = this.createTransportLayer();

    baseLayer.addTo(map);

    const baseLayers = {
      "OpenStreetMap": baseLayer,
      "Transport Map": transportLayer
    };
    L.control.layers(baseLayers).addTo(map);
  }

  createBaseLayer() {
    return L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
  }

  createTransportLayer() {
    return L.tileLayer('https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://www.thunderforest.com/">Andy Allan</a>'
    });
  }

  createOpenRailwayMapLayer() {
    return L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  }

  createThunderforestTransportDarkLayer() {
    return L.tileLayer('https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?accessToken={accessToken}', {
      attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      accessToken: '<your accessToken>',
      maxZoom: 22
    });
  }

  createThunderforestLandscapeLayer() {
    return L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?accessToken={accessToken}', {
      attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      accessToken: '<your accessToken>',
      maxZoom: 22
    });
  }

  createEsriWorldImageryLayer() {
    return L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
  }

  createBasemapATBasemapLayer() {
    return L.tileLayer('https://mapsneu.wien.gv.at/basemap/geolandbasemap/{type}/google3857/{z}/{y}/{x}.{format}', {
      maxZoom: 20,
      attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
      //type: 'normal',
      format: 'png',
      bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
    });
  }


  createBasemapATGrauLayer() {
    return L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmapgrau/{type}/google3857/{z}/{y}/{x}.{format}', {
      maxZoom: 19,
      attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
      //type: 'normal',
      format: 'png',
      bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
    });
  }
  
  createBasemapATOverlayLayer() {
    return L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmapoverlay/{type}/google3857/{z}/{y}/{x}.{format}', {
      maxZoom: 19,
      attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
      //type: 'normal',
      format: 'png',
      bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
    });
  }
  
  createBasemapATOrthofotoLayer() {
    return L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmaporthofoto30cm/{type}/google3857/{z}/{y}/{x}.{format}', {
      maxZoom: 20,
      attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
      //type: 'normal',
      format: 'jpeg',
      bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
    });
  }
  
  createBasemapATHighDpiLayer() {
    return L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmaphidpi/{type}/google3857/{z}/{y}/{x}.{format}', {
      maxZoom: 19,
      attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
      //type: 'normal',
      format: 'jpeg',
      bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
    });
  }
}