import { Component, inject } from '@angular/core';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { Injectable } from '@angular/core';
import { TableData } from '../models/tableData';  // Import the interface
import { PictureViewerComponent } from '../picture-viewer/picture-viewer.component';
@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor() { }
  private adList = inject(PictureViewerComponent).getAds();
  makePopup(tableData: TableData): string {
    let popup: string = `
      <b>${tableData.summary} </b><br>
      <b>Price: </b>${tableData.price} €<br>
      <b>Size: </b>${tableData.size_qm} m²<br>
      <b>Rooms: </b>${tableData.number_of_rooms}<br>
      <b>Living Area: </b>${tableData.estate_size_living_area} m²<br>
      ${tableData.floor ? `<b>Floor: </b>${tableData.floor}<br>` : ''}
      <b>Property Type Flat: </b>${tableData.property_type_flat}<br>
      <b>Free Area Type Name: </b>${tableData.free_area_type_name}<br>
      <b>Free Area Total: </b>${tableData.free_area_total}<br>
      <b>Is Private: </b>${tableData.is_private}<br>
      <details>
      <summary><b>Description: </b></summary>
      ${tableData.description}
      </details>
      <a href="${tableData.url}">Link</a><br>
    `

    return popup;
  }
}