import { Component } from '@angular/core';
import { NgModule, ErrorHandler } from "@angular/core";
import { RouterOutlet } from '@angular/router';
import { MapBaseComponent} from "./map-base/map-base.component";
import {MarkerClusterService} from './services/marker_cluster.service'
import { GlobalErrorHandler } from './global-error-handler';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ServerErrorInterceptor} from './server-error.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapBaseComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MarkerClusterService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    }
  ],
})
export class AppComponent {
  title = 'map';
}
