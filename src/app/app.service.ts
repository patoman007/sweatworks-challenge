import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { AuthorModel } from './shared/authors/authors.manager';


@Injectable()
export class AppService {

  authorSelected$ = new Subject<AuthorModel>();

  constructor() { }

  authorSelected(author: AuthorModel) {
    this.authorSelected$.next(author);
  }

}
