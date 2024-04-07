import { Injectable } from '@angular/core';

import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
 

  constructor() { }
 
  makePopup(){
    return`
    <b>Hello world!</b><br>
    <a href="https://example.com">Visit our website</a><br>
    <img src="https://example.com/image.jpg" alt="Example Image">
  `
  }

}


