import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule, MatDialogModule } from '@angular/material';

import { FormModule } from '../shared/form/form.module';
import { UiModule } from '../shared/ui/ui.module';
import { PublicationsRoutingModule } from './publications-routing.module';

import { PublicationsService } from './services/publications.service';

import {
  PublicationsListComponent
} from './components/publications-list/publications-list.component';
import { PublicationComponent } from './components/publication/publication.component';
import { PublicationsSortComponent } from './components/publications-sort/publications-sort.component';
import { PublicationFormComponent } from './components/publication-form/publication-form.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatDialogModule,
    FormModule,
    UiModule,
    PublicationsRoutingModule
  ],
  providers: [
    PublicationsService
  ],
  declarations: [
    PublicationsListComponent,
    PublicationComponent,
    PublicationsSortComponent,
    PublicationFormComponent
  ],
  entryComponents: [
    PublicationFormComponent
  ]
})
export class PublicationsModule { }
