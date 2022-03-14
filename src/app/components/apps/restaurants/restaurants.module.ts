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
import { AgmCoreModule } from '@agm/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FileManagerRoutingModule,
    NgxDatatableModule,
    NgApexchartsModule,
    CountToModule,
    NgxPaginationModule,
    AgmCoreModule,
    Ng2SearchPipeModule
  ],
  declarations: [FileManagerComponent, ProfileViewComponent],
})
export class FileManagerModule {}
