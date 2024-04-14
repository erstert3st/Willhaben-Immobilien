import { Injectable } from '@angular/core';
import { PopupService } from './popup.service';
import { DataService } from './data.service';
import { TableData } from '../models/tableData';  // Import the interface

import * as L from 'leaflet';
import 'leaflet.markercluster';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  markerCluster = L.markerClusterGroup({
    maxClusterRadius: 50 // Increase or decrease this value as needed
  });
  customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [25, 41]
  });
  constructor(private popupService: PopupService, private dataService: DataService
  ) { }
  makeMarkers(map: L.Map, dbStatemant: string): void {
    this.getDataFromDb(dbStatemant).subscribe((tableRows: Array<TableData>) => {
      const start = window.performance.now();
      this.markerCluster.clearLayers();
      console.log(tableRows);
      console.log(dbStatemant);
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
    });
  }
    //todo make db service
    getDataFromDb(dbStatemant: string) {
      return this.dataService.executeQuery(dbStatemant);
    }
  }


