import { Component, OnInit } from '@angular/core';
import { PublicationFormManager } from './publication-form.manager';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit {

  model = PublicationFormManager.Data;

  constructor() { }

  ngOnInit() {
  }

}
