import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  AuthorsResponseInterface, AuthorsResponseManager
} from './authors-response.manager';

import { AuthorInterface, AuthorModel, AuthorsManager } from './authors.manager';

import { CRUDOperation } from '../operations/operations.manager';

type AuthorsResponse = Observable<AuthorsResponseInterface>;

@Injectable()
export class AuthorsService {

  private authors: AuthorInterface[] = [];

  authorsHasChanged = new EventEmitter<AuthorInterface[]>();

  constructor(private http: HttpClient) { }

  private tapAuthorsResponse(response: AuthorsResponseInterface) {
    if (!response.succeed) { return; }
    this.authors = response.data;
  }

  private retrieveAuthors(): AuthorsResponse {
    const url = AuthorsManager.OperationURL(CRUDOperation.Read);
    return this.http.get<AuthorsResponseInterface>(url)
      .pipe(
        tap(response => this.tapAuthorsResponse(response))
      );
  }

  getAuthors(force: boolean = false): AuthorsResponse {
    if (this.authors.length > 0 && !force) {
      return AuthorsResponseManager.Response(this.authors);
    }

    return this.retrieveAuthors();
  }

  getAuthorDisplayedName(authorId: string): Promise<string | null> {
    return new Promise<string | null>(resolve => {
      this.getAuthors()
        .subscribe(response => {
          if (!response.succeed) { resolve(null); }

          const author = response.data
            .find(auxAuthor => auxAuthor.id === authorId);
          if (!author) { resolve(null); }

          resolve(new AuthorModel(author).displayedName);
        });
    });
  }

  updateAuthors(authors: AuthorInterface[]) {
    this.authors = authors;
    this.authorsHasChanged.emit(authors);
  }

}
