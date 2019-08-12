import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import AuthorsManagementPaths from '../shared/paths/authors-management-paths.enum';
import {
  ManagementAuthorsListComponent
} from './components/authors-list/management-authors-list.component';

const authorsManagementRoutes: Routes = [
  {
    path: AuthorsManagementPaths.index,
    component: ManagementAuthorsListComponent,
    pathMatch: 'full'
  },
  {
    path: AuthorsManagementPaths.authorsList,
    component: ManagementAuthorsListComponent
  },
  { path: '**', redirectTo: AuthorsManagementPaths.authorsList }
];

@NgModule({
  imports: [RouterModule.forChild(authorsManagementRoutes)],
  exports: [RouterModule]
})
export class AuthorsManagementRoutingModule { }
