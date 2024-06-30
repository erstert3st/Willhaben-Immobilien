import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';

import { TableData } from '../models/tableData';  // Import the interface
import { PopupComponent } from '../popup/popup.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) {
  }


  makePopup(tableData: TableData): string {
    try {
  
      let markerPopup: any = this.compilePopup(PopupComponent, 
        (c: any ) => {c.instance.tableData = tableData});

      return markerPopup;
    } catch (e) {
      throw new Error("Popup could not be created");
    }
  }

/*   makePopup_old(tableData: TableData): string {
    try {
      let popup: string = `
      <b>${tableData.summary} </b><br>
      <b>Price: </b>${tableData.price} €<br>
      <b>Size: </b>${tableData.size_qm} m²<br>
      <b>Rooms: </b>${tableData.number_of_rooms}<br>
      <b>Living Area: </b>${tableData.estate_size_living_area} m²<br>
      ${tableData.floor ? `<b>Floor: </b>${tableData.floor}<br>` : ''}
      <b>location: </b>${tableData.location}<br>
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
    } catch (e) {
      throw new Error("Popup could not be created");
    }
  } */

  private compilePopup(component: any, onAttach: any ): any {
    const compFactory: any = this.resolver.resolveComponentFactory(component);
    let compRef: any = compFactory.create(this.injector);

    // onAttach allows you to assign 
    if (onAttach)
      onAttach(compRef);

    this.appRef.attachView(compRef.hostView);
    compRef.onDestroy(() => this.appRef.detachView(compRef.hostView));
    
    let div = document.createElement('div');
    div.appendChild(compRef.location.nativeElement);
    return div;
  }
}