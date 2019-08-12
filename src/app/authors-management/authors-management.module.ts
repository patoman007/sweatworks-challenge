import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule, MatDialogModule } from '@angular/material';

import { FormModule } from '../shared/form/form.module';
import { UiModule } from '../shared/ui/ui.module';
import {
  AuthorsManagementRoutingModule
} from './authors-management-routing.module';

import {
  AuthorsManagementService
} from './services/authors-management.service';

import {
  ManagementAuthorsListComponent
} from './components/authors-list/management-authors-list.component';
import {
  ManagementAuthorComponent
} from './components/author/management-author.component';
import {
  ManagementAuthorFormComponent
} from './components/author-form/management-author-form.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatDialogModule,
    FormModule,
    UiModule,
    AuthorsManagementRoutingModule
  ],
  providers: [
    AuthorsManagementService
  ],
  declarations: [
    ManagementAuthorsListComponent,
    ManagementAuthorComponent,
    ManagementAuthorFormComponent
  ],
  entryComponents: [
    ManagementAuthorFormComponent
  ]
})
export class AuthorsManagementModule { }
