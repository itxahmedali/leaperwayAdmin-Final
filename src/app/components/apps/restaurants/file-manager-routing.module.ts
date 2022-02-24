import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileManagerComponent } from './file-manager.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

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
