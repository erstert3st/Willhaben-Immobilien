import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapBaseComponent} from "./map-base/map-base.component";
import {MarkerClusterService} from './services/marker_cluster.service'
import { PictureViewerComponent } from './picture-viewer/picture-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapBaseComponent,PictureViewerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MarkerClusterService]
})
export class AppComponent {
  title = 'map';
}
