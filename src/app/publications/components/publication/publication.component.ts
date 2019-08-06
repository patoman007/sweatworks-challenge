import { Component, Input, OnInit } from '@angular/core';
import { PublicationInterface } from '../../../shared/publication/publication.interface';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  @Input()
  model: PublicationInterface;

  constructor() { }

  ngOnInit() {
  }

}
