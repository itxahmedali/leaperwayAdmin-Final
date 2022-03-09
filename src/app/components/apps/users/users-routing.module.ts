import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:"",
        component:TeamDetailsComponent
      },
      {
        path:"userProfile/:id",
        component:UserProfileComponent
      },
      // {
      //   path:"profile",
      //   component:ProfileComponent
      // },
      // {
      //   path:"edit-profile",
      //   component:EditProfileComponent
      // }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
