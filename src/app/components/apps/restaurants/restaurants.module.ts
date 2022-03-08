import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../shared/shared.module";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FileManagerRoutingModule } from './restaurants-routing.module';
import { FileManagerComponent } from './restaurants.component';
import { CountToModule } from 'angular-count-to';
import { ProfileViewComponent } from './profile-view/restaurants-profile.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxPaginationModule } from "ngx-pagination";
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FileManagerRoutingModule,
    NgxDatatableModule,
    NgApexchartsModule,
    CountToModule,
    NgxPaginationModule,
  ],
  declarations: [FileManagerComponent, ProfileViewComponent],
})
export class FileManagerModule {}
