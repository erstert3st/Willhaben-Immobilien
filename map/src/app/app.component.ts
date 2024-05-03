import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapBaseComponent} from "./map-base/map-base.component";
import {MarkerClusterService} from './services/marker_cluster.service'
import { TestComponent } from './test/test.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapBaseComponent,  TestComponent, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MarkerClusterService]
})
export class AppComponent {
  title = 'map';
}
