import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../services/marker.service';
import { LayerService } from '../services/layers.service';
import { CommonModule } from '@angular/common';
import { MapConfigComponent } from '../map-config/map-config.component';

@Component({
  selector: 'app-map-base',
  standalone: true,
  imports: [CommonModule, MapConfigComponent],
  templateUrl: './map-base.component.html',
  styleUrl: './map-base.component.css'
})
export class MapBaseComponent implements AfterViewInit {

  private map:any;
  mapHeight = '100%';
  buttonText = 'Show config';
  sqlString:string = 'select * from test1 LIMIT 20';
  showConfigBool = false;
  constructor(private markerService: MarkerService, private layerService: LayerService) { }
  private initMap(): void {
    this.map = L.map('map', {
      center: [47.0707, 15.4395],
      zoom: 13
    });
  }
  public reciveSqlString(event: any) {
    this.sqlString = event;

    this.markerService.makeMarkers(this.map, this.sqlString);
  }

  showConfig() {
    if (this.mapHeight === '100%') {
      this.mapHeight = '70%';
      this.buttonText = 'Hide config';
      this.showConfigBool = true;
    } else {
      this.mapHeight = '100%';
      this.buttonText = 'Show config';
      this.showConfigBool = false;
    }
  }



  ngAfterViewInit(): void {
    this.initMap();
    this.layerService.addLayers(this.map);
    this.markerService.makeMarkers(this.map, this.sqlString);
  }
}