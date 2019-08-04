import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiModule } from '../shared/ui/ui.module';
import { PublicationsRoutingModule } from './publications-routing.module';

import {
  PublicationsListComponent
} from './components/publications-list/publications-list.component';
import { PublicationComponent } from './components/publication/publication.component';


@NgModule({
  imports: [
    CommonModule,
    UiModule,
    PublicationsRoutingModule
  ],
  declarations: [
    PublicationsListComponent,
    PublicationComponent
  ],
})
export class PublicationsModule { }
