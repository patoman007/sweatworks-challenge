import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent {

  minDate = new Date(1900, 0, 1);
  maxDate = new Date();

  shouldShowFullDatePicker = true;

  @Input()
  name: string;

  @Input()
  placeholder: string;

  @Input()
  hintMessage: string;

  @Input()
  errorMessage: string;

  @Input()
  control: FormControl;

  constructor() { }

}
