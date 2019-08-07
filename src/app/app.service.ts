import { Injectable } from '@angular/core';
import { AuthorModel } from './publications/components/publication/publication.manger';
import { Subject } from 'rxjs';

@Injectable()
export class AppService {

  authors$ = new Subject<AuthorModel[]>();
  selectedAuthor$ = new Subject<AuthorModel>();

  constructor() { }

  updateAuthors(authors: AuthorModel[]) {
    this.authors$.next(authors);
  }

  authorSelected(author: AuthorModel) {
    this.selectedAuthor$.next(author);
  }

}
