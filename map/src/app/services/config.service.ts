import { Injectable } from '@angular/core';
import { DataManagerService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor( private dataService: DataManagerService) { }

  public currentTable: string = ""; 
  public currentOverlay: string = ""; 
  public allMapTables: string[] = [""];
  public allOverlayTables: string[] = [""];
   LoadAllMapTables() {
    /**
     * 
     * 
     * 
     */
  }
  LoadAllOverlayTables(){

  }

}
