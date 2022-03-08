import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from "../../../shared/shared.module";

import { EmailRoutingModule } from './privacy-routing.module';
import { EmailComponent } from './privacy.component';

@NgModule({
  declarations: [EmailComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    CKEditorModule,
    SharedModule,
    EmailRoutingModule
  ]
})
export class EmailModule { }
