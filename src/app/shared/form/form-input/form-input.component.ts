import { Component, Input } from '@angular/core';
import { FormInputInterface } from './form-input.interface';


@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent {

  @Input()
  model: FormInputInterface;

  constructor() { }

}
