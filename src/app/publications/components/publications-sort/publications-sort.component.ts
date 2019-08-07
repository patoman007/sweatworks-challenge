import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PublicationsSortDataInterface } from './publications-sort.manager';


@Component({
  selector: 'app-publications-sort',
  templateUrl: './publications-sort.component.html',
  styleUrls: ['./publications-sort.component.scss']
})
export class PublicationsSortComponent {

  @Input()
  model: PublicationsSortDataInterface;

  @Output()
  changed = new EventEmitter<string>();

  constructor() { }

}
