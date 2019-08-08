import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {

  @Input()
  type: string;

  @Input()
  name: string;

  @Input()
  placeholder: string;

  @Input()
  errorMessage: string;

  @Input()
  hintMessage: string;

  @Input()
  control: FormControl;

  constructor() { }

}
