import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material';

import { UiModule } from '../shared/ui/ui.module';
import { PublicationsRoutingModule } from './publications-routing.module';

import { PublicationsService } from './services/publications.service';

import {
  PublicationsListComponent
} from './components/publications-list/publications-list.component';
import { PublicationComponent } from './components/publication/publication.component';
import { PublicationsSortComponent } from './components/publications-sort/publications-sort.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonToggleModule,
    UiModule,
    PublicationsRoutingModule
  ],
  providers: [
    PublicationsService
  ],
  declarations: [
    PublicationsListComponent,
    PublicationComponent,
    PublicationsSortComponent
  ],
})
export class PublicationsModule { }
