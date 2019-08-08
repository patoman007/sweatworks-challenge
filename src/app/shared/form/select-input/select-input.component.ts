import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SelectOptionInterface } from './select-option.interface';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent {

  @Input()
  options: SelectOptionInterface[] = [];

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
