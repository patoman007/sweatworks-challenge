import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-ui-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {

  @Input()
  label: string;

  constructor() { }

}
