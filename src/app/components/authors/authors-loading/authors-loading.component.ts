import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-authors-loading',
  templateUrl: './authors-loading.component.html',
  styleUrls: ['./authors-loading.component.scss']
})
export class AuthorsLoadingComponent {

  @Input()
  label: string;

  constructor() { }

}
