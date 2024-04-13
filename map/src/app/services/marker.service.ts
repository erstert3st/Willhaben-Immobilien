import { Injectable } from '@angular/core';
import { PopupService } from './popup.service';

import * as L from 'leaflet';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private popupService: PopupService, private dataService: DataService
  ) { }
  makeMarkers(map: L.Map, dbStatemant: string): void {
    this.getDataFromDb(dbStatemant).subscribe(tableRows => {

      console.log(tableRows);
      console.log(dbStatemant);
      let coordinatesList: Array<string> = [];
      tableRows.forEach(row => {
        coordinatesList.push(row.coordinates);
      });
      //let coordinates = ["47.0707, 15.4397", "47.0703, 15.4399", "47.0700, 15.4390"];
      let coordinateList = coordinatesList.map(coord => coord.split(',').map(Number));
      let markerOptions: L.MarkerOptions = {};
      for (const cordElement of coordinateList) {
        const lat = cordElement[0];
        const lon = cordElement[1];
        console.log("lat: " + lat + "lon: " + lon)
        const marker = L.marker([lat, lon], markerOptions);
        marker.bindPopup(this.popupService.makePopup());
        marker.addTo(map);
      }
    });
  };
  //todo make db service
  getDataFromDb(dbStatemant: string) {
    return this.dataService.executeQuery(dbStatemant);
  }
}


