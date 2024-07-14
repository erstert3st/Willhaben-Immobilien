import { Injectable } from '@angular/core';
import { PopupService } from './popup.service';
import { DataManagerService } from './data.service';
import { TableData } from '../models/tableData';  // Import the interface

import * as L from 'leaflet';
import 'leaflet.markercluster';

@Injectable({
  providedIn: 'root'
})
export class MarkerClusterService {
  markerCluster = L.markerClusterGroup({
    maxClusterRadius: 50 // Increase or decrease this value as needed
  });
  customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [25, 41]
  });
  constructor(private popupService: PopupService, private dataService: DataManagerService
  ) { }
  makeMarkers(map: L.Map, tableRows: Array<TableData>, popUpOptions: L.PopupOptions): void {
    try {


      const start = window.performance.now();
      this.markerCluster.clearLayers();
      console.log(tableRows);
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
          markerToAdd.bindPopup(this.popupService.makePopup(rowData), popUpOptions); // Fix the syntax for bindPopup options
          markersToAdd.push(markerToAdd);
          counter++;
          console.log(`Added marker ${counter} `);

        } else {
          console.log("lat or lon is weird");
        }

        this.markerCluster.addLayers(markersToAdd);
        map.addLayer(this.markerCluster);

        const end = window.performance.now();
        console.log(`Time of adding markers and clusters: ${end - start}ms`);

      });
    } catch (e) {
      throw new Error("MarkersCluster could not be added to map");
    }
  }
}



