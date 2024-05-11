import { Injectable } from '@angular/core';
import { PopupService } from './popup.service';

import * as L from 'leaflet';
import { DataManagerService } from './data.service';
import { TableData } from '../models/tableData';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  layerGroup = L.layerGroup();
  customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [25, 41]
  });
  constructor(private popupService: PopupService, private dataService: DataManagerService
  ) { }
  makeMarkers(map: L.Map, tableRows: Array<TableData>): void {
    try {
      this.layerGroup.clearLayers();
      console.log(tableRows);
      map.addLayer(this.layerGroup);
      const markersToAdd: L.Layer[] = [];
      let counter = 0;

      //cordList
      tableRows.forEach((rowData: TableData) => {
        let coordinateArray = rowData.coordinates.split(',').map(Number);
        const lat = coordinateArray[0];
        const lon = coordinateArray[1];
        // console.log("lat: " + lat + "lon: " + lon)
        if (lat != undefined && lon != undefined) {
          const markerToAdd = L.marker(new L.LatLng(lat, lon), {
            icon: this.customIcon
          });
          markerToAdd.bindPopup(this.popupService.makePopup(rowData));
          markerToAdd.addTo(this.layerGroup);
          counter++;
          console.log(`Added marker ${counter} `);

        } else {
          console.log("lat or lon is weird");
        }
      });
    } catch (e) {
      throw new Error("Markers non Cluster  could not be added to map");
    }
  };
}


