import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SidenavManager } from './sidenav.manager';

import AppPaths from '../../shared/paths/app-paths.enum';
import PublicationsPaths from '../../shared/paths/publications-paths.enum';
import AuthorsManagementPaths from '../../shared/paths/authors-management-paths.enum';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  data = SidenavManager.Data;

  constructor(private router: Router) { }

  private publications() {
    const commands = [AppPaths.PublicationsList, PublicationsPaths.index];
    this.router.navigate(commands).then();
  }

  private authorsManagement() {
    const commands = [AppPaths.AuthorsManagement, AuthorsManagementPaths.index];
    this.router.navigate(commands).then();
  }

}
