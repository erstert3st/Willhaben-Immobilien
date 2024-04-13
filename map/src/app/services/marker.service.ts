import { Injectable } from '@angular/core';
import { PopupService } from './popup.service';
import { DataService } from './data.service';

import * as L from 'leaflet';
import  'leaflet.markercluster';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  markerCluster = L.markerClusterGroup();
  customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [25, 41]
  });
  constructor(private popupService: PopupService, private dataService: DataService
  ) { }
  makeMarkers(map: L.Map, dbStatemant: string): void  {
    this.getDataFromDb(dbStatemant).subscribe(tableRows => {
      const start = window.performance.now();
      this.markerCluster.clearLayers();
      console.log(tableRows);
      console.log(dbStatemant);
      let coordinatesList: Array<string> = [];
      //cordList
      tableRows.forEach(row => {
        coordinatesList.push(row.coordinates);
      });
      let coordinateList = coordinatesList.map(coord => coord.split(',').map(Number));
      let markerOptions: L.MarkerOptions = {};
      const markersToAdd = [];
      for (const cordElement of coordinateList) {
        const lat = cordElement[0];
        const lon = cordElement[1];
        console.log("lat: " + lat + "lon: " + lon)
        const markerToAdd = L.marker(new L.LatLng(lat, lon), {
        });
        markerToAdd.bindPopup(this.popupService.makePopup());
        markersToAdd.push(markerToAdd);
      }
      this.markerCluster.addLayers(markersToAdd);
      map.addLayer(this.markerCluster);

      const end = window.performance.now();
      console.log(`Time of adding markers and clusters: ${end - start}ms`);

    });
  };
  //todo make db service
  getDataFromDb(dbStatemant: string) {
    return this.dataService.executeQuery(dbStatemant);
  }
}


