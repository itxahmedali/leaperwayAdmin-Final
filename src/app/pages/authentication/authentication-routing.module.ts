import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginSimpleComponent } from './login/simple/simple.component';
import { LoginImageOneComponent } from './login/image-one/image-one.component';
import { LoginImageTwoComponent } from './login/image-two/image-two.component';
import { ValidationComponent } from './login/validation/validation.component';
import { ToolTipComponent } from './login/tool-tip/tool-tip.component';
import { SweetalertComponent } from './login/sweetalert/sweetalert.component';

const routes: Routes = [
  {
    path: 'login',
    children: [
      {
        path: 'simple',
        component: LoginSimpleComponent
      },
      {
        path: 'image-one',
        component: LoginImageOneComponent
      },
      {
        path: 'image-two',
        component: LoginImageTwoComponent
      },
      {
        path: 'validation',
        component: ValidationComponent
      },
      {
        path: 'tooltip',
        component: ToolTipComponent
      },
      {
        path: 'sweetalert',
        component: SweetalertComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
