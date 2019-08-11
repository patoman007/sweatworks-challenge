import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthorsResponseInterface, AuthorsResponseManager } from './authors-response.manager';

import { AuthorInterface, AuthorModel, AuthorsManager } from './authors.manager';

import { GenericResponseInterface } from '../generic-response/generic-response.interface';

import { CRUDOperation } from '../operations/operations.manager';

type GenericResponse = Observable<GenericResponseInterface>;
type AuthorsResponse = Observable<AuthorsResponseInterface>;

@Injectable()
export class AuthorsService {

  private authors: AuthorModel[] = [];

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

  createAuthor(author: AuthorInterface): GenericResponse {
    const url = AuthorsManager.OperationURL(CRUDOperation.Create);
    return this.http.post<GenericResponseInterface>(url, author);
  }

  updateAuthor(author: AuthorInterface) {
    const url = AuthorsManager.OperationURL(CRUDOperation.Update);
    return this.http.post<GenericResponseInterface>(url, author);
  }

  deleteAuthor(authorId: string): GenericResponse {
    const url = AuthorsManager.OperationURL(CRUDOperation.Delete);
    const data = AuthorsManager.DeleteBodyRequest(authorId);
    return this.http.post<GenericResponseInterface>(url, data);
  }

}
