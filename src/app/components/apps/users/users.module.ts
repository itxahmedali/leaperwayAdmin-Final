import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { CountToModule } from 'angular-count-to';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { NgxPaginationModule } from "ngx-pagination";
import 'hammerjs';
import 'mousetrap';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    TeamDetailsComponent,
    UserProfileComponent,
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CountToModule,
    NgxDatatableModule,
    Ng2SearchPipeModule,
    GalleryModule.forRoot(),
  ],
})
export class UsersModule {}
