import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoogleMapComponent } from './google-map/google-map.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'google',
        component: GoogleMapComponent
      },
      {
        path: 'leaflet',
        component: LeafletMapComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
