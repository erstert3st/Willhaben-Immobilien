import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../services/marker.service';

@Component({
  selector: 'app-map-base',
  standalone: true,
  imports: [],
  templateUrl: './map-base.component.html',
  styleUrl: './map-base.component.css'
})
export class MapBaseComponent implements AfterViewInit {
  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 47.0707, 15.4395 ],
      zoom: 11
    });

/* 
    marker.bindPopup(`
      <b>Hello world!</b><br>
      <a href="https://example.com">Visit our website</a><br>
      <img src="https://example.com/image.jpg" alt="Example Image">
    `).openPopup(); */
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeMarkers(this.map);
  }
}