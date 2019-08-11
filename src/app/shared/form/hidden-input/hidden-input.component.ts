import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-hidden-input',
  templateUrl: './hidden-input.component.html',
  styleUrls: ['./hidden-input.component.scss']
})
export class HiddenInputComponent {

  @Input()
  control: FormControl;

  constructor() { }

}
