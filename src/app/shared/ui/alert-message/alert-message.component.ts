import { Component, Input, OnInit } from '@angular/core';
import { AlertMessageInterface } from './alert-message.manager';

@Component({
  selector: 'app-ui-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {

  @Input()
  model: AlertMessageInterface;

  constructor() { }

  ngOnInit() {
  }

}
