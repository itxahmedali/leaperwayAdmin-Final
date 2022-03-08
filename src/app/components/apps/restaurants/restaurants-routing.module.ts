import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileManagerComponent } from './restaurants.component';
import { ProfileViewComponent } from './profile-view/restaurants-profile.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: FileManagerComponent,
      },
      {
        path: "restaurant-profile/:id",

        component: ProfileViewComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileManagerRoutingModule { }
