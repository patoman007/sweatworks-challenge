import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent {

  @Input()
  title = '';

  constructor() { }

}
