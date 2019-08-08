import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-authors-loading',
  templateUrl: './authors-loading.component.html',
  styleUrls: ['./authors-loading.component.scss']
})
export class AuthorsLoadingComponent implements OnInit {

  @Input()
  label: string;

  constructor() { }

  ngOnInit() {
  }

}
