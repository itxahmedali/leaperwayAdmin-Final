import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SharedModule } from "../../../shared/shared.module";
import { MapRoutingModule } from './map-routing.module';

import { GoogleMapComponent } from './google-map/google-map.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';

@NgModule({
  declarations: [GoogleMapComponent, LeafletMapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    LeafletModule,
    HttpClientModule,
    SharedModule
  ]
})
export class MapModule { }
