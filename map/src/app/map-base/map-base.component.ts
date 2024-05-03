import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerClusterService } from '../services/marker_cluster.service';
import { LayerService } from '../services/layers.service';
import { CommonModule } from '@angular/common';
import { MapConfigComponent } from '../map-config/map-config.component';
import { TableData } from '../models/tableData';
import { DataService } from '../services/data.service';
import { MarkerService } from '../services/marker.service';
import { DrawManagerService } from '../services/drawManager.service';


@Component({
  selector: 'app-map-base',
  standalone: true,
  imports: [CommonModule, MapConfigComponent],
  templateUrl: './map-base.component.html',
  styleUrl: './map-base.component.css'
})
export class MapBaseComponent implements AfterViewInit {

  private map: any;
  mapHeight = '100%';
  buttonText = 'Show config';
  sqlString: string = 'select * from test2 LIMIT 20';
  showConfigBool = false;
  constructor(private markerService: MarkerService, private markerClusterService: MarkerClusterService,
    private layerService: LayerService, private dataServie: DataService,
    private drawMangerService: DrawManagerService) { }

  private initMap(): void {
    try {
      this.map = L.map('map', {
        center: [47.0707, 15.4395],
        zoom: 13,
      });
    } catch (e) {
      throw new Error("Map could not be initialized");
    }

  };


  public reciveSqlString(event: any) {
    this.sqlString = event;
    try {

      this.dataServie.getDataFromDb(this.sqlString).subscribe((tableData: TableData[]) => {
        if (tableData.length >= 50) {
          console.log("more than 50 rows, I use cluster");
          this.markerClusterService.makeMarkers(this.map, tableData);

        } else {
          console.log("less than 50 rows, I don't use cluster");
          this.markerService.makeMarkers(this.map, tableData);

        }

      });
    } catch (e) {
      throw new Error("error getting data from db");
    }
  }

  showConfig() {
    try {
      if (this.mapHeight === '100%') {
        this.mapHeight = '50%';
        this.buttonText = 'Hide config';
        this.showConfigBool = true;
      } else {
        this.mapHeight = '100%';
        this.buttonText = 'Show config';
        this.showConfigBool = false;
      }
    } catch (e) {
      throw new Error("show Config Failed");
    }
  }



  ngAfterViewInit(): void {
    try {
      this.initMap();

      this.layerService.addLayers(this.map);
      this.reciveSqlString(this.sqlString)
      this.drawMangerService.addDraw(this.map);

    } catch (e) {
      throw new Error("ngInit Failed from map-base");
    }
  }


}
//mklink  C:\Users\user\Documents\Willhaben-Immobilien\map\Todo C:\Users\user\Documents\Willhaben-Immobilien\Todo