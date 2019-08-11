import { Component, EventEmitter, Output } from '@angular/core';

import { NavbarManager } from './navbar.manager';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  data = NavbarManager.Data;

  @Output()
  toggle = new EventEmitter();

  constructor() { }

}
