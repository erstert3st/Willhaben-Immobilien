import { Injectable } from '@angular/core';
import * as L from 'leaflet';


@Injectable({
  providedIn: 'root'
})
export class LayerService {

  constructor() { }
  addLayers(map: L.Map) {
    try{
    const baseLayer = this.createBaseLayer();
    const transportLayer = this.createTransportLayer();
    const thunderforestTransportDarkLayer = this.createThunderforestTransportDarkLayer();
    const thunderforestLandscapeLayer = this.createThunderforestLandscapeLayer();
    const esriWorldImageryLayer = this.createEsriWorldImageryLayer();
    const esriWorldImageryLayerWithOverlay = this.createEsriWorldWithOverlay();
    const basemapATBasemapLayer = this.createBasemapATBasemapLayer();
    const basemapATGrauLayer = this.createBasemapATGrauLayer();
    const basemapATOverlayLayer = this.createBasemapATOverlayLayer();
    const basemapATOrthofotoLayer = this.createBasemapATOrthofotoLayer();
    const basemapATHighDpiLayer = this.createBasemapATHighDpiLayer();

    baseLayer.addTo(map);

    const baseLayers = {
      "OpenStreetMap": baseLayer,
      "Transport Map": transportLayer,
      "Thunderforest Transport Dark": thunderforestTransportDarkLayer,
      "Thunderforest Landscape": thunderforestLandscapeLayer,
      "Esri World Imagery": esriWorldImageryLayer,
      "Esri World With Overlay": esriWorldImageryLayerWithOverlay,
      "Basemap AT Basemap": basemapATBasemapLayer,
      "Basemap AT Grau": basemapATGrauLayer,
      "Basemap AT Overlay": basemapATOverlayLayer,
      "Basemap AT Orthofoto": basemapATOrthofotoLayer,
      "Basemap AT High DPI": basemapATHighDpiLayer
    };

    L.control.layers(baseLayers).addTo(map);
  }catch(e){
    throw new Error("Error: Map layers could not be added to map");
   }
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
  createEsriWorldWithOverlay() {
    const baseLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
    const overlay = L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png', {

      attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
      bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
    });
    return L.layerGroup([baseLayer, overlay]);


  }

  createEsriWorldImageryLayer() {
    return L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
  }

  createBasemapATBasemapLayer() {
    return L.tileLayer('https://mapsneu.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png', {
      maxZoom: 20,
      attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
      bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
    });
  }


  createBasemapATGrauLayer() {
    return L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png', {
      maxZoom: 19,
      attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
      bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
    });
  }

  createBasemapATOverlayLayer() {
    return L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png', {
      maxZoom: 19,
      attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
      bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
    });
  }

  createBasemapATOrthofotoLayer() {
    return L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg', {
      maxZoom: 20,
      attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
      bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
    });
  }

  createBasemapATHighDpiLayer() {
    return L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg', {
      maxZoom: 19,
      attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
      bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
    });
  }
}