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
    this.initPublications();
  }

  private initPublications() {
    this.data.loadingPublications = true;
    window.setTimeout(() => {
      this.data.publications = PublicationsListManager.FakeData(),
      this.data.loadingPublications = false;
    }, 1200);
  }

}
