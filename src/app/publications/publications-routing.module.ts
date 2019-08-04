import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicationsListComponent } from './components/publications-list/publications-list.component';

import PublicationsPaths from '../shared/paths/publications-paths.enum';

const publicationsRoutes: Routes = [
  { path: PublicationsPaths.index, component: PublicationsListComponent },
  { path: PublicationsPaths.publicationsList, component: PublicationsListComponent },
  { path: PublicationsPaths.publicationById, component: PublicationsListComponent },
  { path: '**', redirectTo: PublicationsPaths.publicationsList }
];

@NgModule({
  imports: [RouterModule.forChild(publicationsRoutes)],
  exports: [RouterModule]
})
export class PublicationsRoutingModule { }
