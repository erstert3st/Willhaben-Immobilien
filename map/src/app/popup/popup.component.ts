import { Component } from '@angular/core';
import { TableData } from '../models/tableData';
import { PopupImagesComponent } from '../popup-images/popup-images.component';
@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [PopupImagesComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  customText: string = 'This is a custom text';
  tableData: TableData =  {} as TableData;
}
