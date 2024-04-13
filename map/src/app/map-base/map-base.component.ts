import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../services/marker.service';
import { LayerService } from '../services/layers.service';

@Component({
  selector: 'app-map-base',
  standalone: true,
  imports: [],
  templateUrl: './map-base.component.html',
  styleUrl: './map-base.component.css'
})
export class MapBaseComponent implements AfterViewInit {
  private map: any;
  constructor(private markerService: MarkerService, private layerService: LayerService) { }
  private initMap(): void {
    this.map = L.map('map', {
      center: [47.0707, 15.4395],
      zoom: 13
    });
  }


  ngAfterViewInit(): void {
    this.initMap();
    this.layerService.addLayers(this.map);
    this.markerService.makeMarkers(this.map, "select * from test1 LIMIT 20");
  }
}