import { Component, Input } from '@angular/core';
import { CancelConfirmInterface } from './cancel-confirm.interface';

@Component({
  selector: 'app-ui-cancel-confirm',
  templateUrl: './cancel-confirm.component.html',
  styleUrls: ['./cancel-confirm.component.scss']
})
export class CancelConfirmComponent {

  @Input()
  model: CancelConfirmInterface;

  constructor() { }

}
