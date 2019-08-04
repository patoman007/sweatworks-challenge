import { Component, OnInit } from '@angular/core';
import { PublicationsListManager } from './publications-list.manager';

@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.scss']
})
export class PublicationsListComponent implements OnInit {

  data = PublicationsListManager.Data;

  constructor() { }

  ngOnInit() {
  }

}
