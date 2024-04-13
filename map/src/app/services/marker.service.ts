import { Injectable } from '@angular/core';
import { PopupService } from './popup.service';

import * as L from 'leaflet';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  layerGroup = L.layerGroup();

  constructor(private popupService: PopupService, private dataService: DataService
  ) { }
  makeMarkers(map: L.Map, dbStatemant: string): void {
    this.getDataFromDb(dbStatemant).subscribe(tableRows => {
      this.layerGroup.clearLayers();
      console.log(tableRows);
      console.log(dbStatemant);
      let coordinatesList: Array<string> = [];
      this.layerGroup = L.layerGroup().addTo(map);
      //cordList
      tableRows.forEach(row => {
        coordinatesList.push(row.coordinates);
      });
      let coordinateList = coordinatesList.map(coord => coord.split(',').map(Number));
      let markerOptions: L.MarkerOptions = {};

      for (const cordElement of coordinateList) {
        const lat = cordElement[0];
        const lon = cordElement[1];
        console.log("lat: " + lat + "lon: " + lon)
        const marker = L.marker([lat, lon], markerOptions);
        marker.bindPopup(this.popupService.makePopup());
        marker.addTo(this.layerGroup);
      }
    });
  };
  //todo make db service
  getDataFromDb(dbStatemant: string) {
    return this.dataService.executeQuery(dbStatemant);
  }
}


