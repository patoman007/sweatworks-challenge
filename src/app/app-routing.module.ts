import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import AppPaths from './shared/paths/app-paths.enum';

const routes: Routes = [
  {
    path: AppPaths.Index,
    loadChildren: () => import('./publications/publications.module').then(m => m.PublicationsModule)
  },
  { path: '**', redirectTo: AppPaths.PublicationsList }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
