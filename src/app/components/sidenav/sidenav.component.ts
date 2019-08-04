import { Component, Input, OnInit } from '@angular/core';

import { AuthorInterface } from '../../shared/author/author.interface';
import { SidenavManager } from './sidenav.manager';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  data = SidenavManager.Data;

  @Input()
  authors: AuthorInterface[];

  constructor() { }

  ngOnInit() {
  }

}
