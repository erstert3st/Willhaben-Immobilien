import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor() { }
  makeMarkers(map: L.Map): void {
    let coordinates = ["47.0707, 15.4397", "47.0703, 15.4399", "47.0700, 15.4390"];
    let coordinateList = coordinates.map(coord => coord.split(',').map(Number));

    for (const cordElement of coordinateList) {
      const lat = cordElement[0];
      const lon = cordElement[1];
      console.log("lat: " + lat + "lon: " + lon	)
      const marker = L.marker([lat, lon]);

      marker.addTo(map);
    }
  };
}


