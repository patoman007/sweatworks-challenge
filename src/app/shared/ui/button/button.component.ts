import { Component, Input, OnInit } from '@angular/core';
import { ButtonInterface } from './button.manager';

@Component({
  selector: 'app-ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  model: ButtonInterface;

  constructor() { }

  ngOnInit() { }

}
