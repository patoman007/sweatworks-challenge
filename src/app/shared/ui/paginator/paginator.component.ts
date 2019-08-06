import { Component, Input, OnInit } from '@angular/core';
import { PaginatorModel } from './paginator.manager';


@Component({
  selector: 'app-ui-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input()
  model: PaginatorModel;

  constructor() { }

  ngOnInit() {
  }


}
