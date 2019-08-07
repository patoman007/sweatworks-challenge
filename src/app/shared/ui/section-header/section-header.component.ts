import { Component, Input } from '@angular/core';
import { SectionHeaderInterface } from './section-header.manager';

@Component({
  selector: 'app-ui-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent {

  @Input()
  model: SectionHeaderInterface;

  constructor() { }

}
