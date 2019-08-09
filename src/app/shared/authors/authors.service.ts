import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthorsResponseInterface, AuthorsResponseManager } from './authors-response.manager';

import { AuthorInterface, AuthorModel } from './authors.manager';

import { GenericResponseInterface } from '../generic-response/generic-response.interface';

import { environment } from '../../../environments/environment';

type GenericResponse = Observable<GenericResponseInterface>;

@Injectable()
export class AuthorsService {

  private static Endpoints = {
    authors: 'authors',
    create: 'authors/new',
    update: 'authors/edit',
    delete: 'authors/remove'
  };

  private authors: AuthorModel[] = [];

  constructor(private http: HttpClient) { }

  private tapAuthorsResponse(response: AuthorsResponseInterface) {
    if (!response.succeed) { return; }
    this.authors = response.data;
  }

  private retrieveAuthors(): Observable<AuthorsResponseInterface> {
    const url = environment.webServices.base + AuthorsService.Endpoints.authors;
    return this.http.get<AuthorsResponseInterface>(url)
      .pipe(
        tap(response => this.tapAuthorsResponse(response))
      );
  }

  getAuthors(force: boolean = false): Observable<AuthorsResponseInterface> {
    if (this.authors.length > 0 && !force) {
      return AuthorsResponseManager.Response(this.authors);
    }

    return this.retrieveAuthors();
  }

  createAuthor(author: AuthorInterface): GenericResponse {
    const url = environment.webServices.base + AuthorsService.Endpoints.create;
    return this.http.post<GenericResponseInterface>(url, author);
  }

  updateAuthor(author: AuthorInterface) {
    const url = environment.webServices.base + AuthorsService.Endpoints.update;
    return this.http.post<GenericResponseInterface>(url, author);
  }

  deleteAuthor(authorId: string): GenericResponse {
    const url = environment.webServices.base + AuthorsService.Endpoints.delete;
    const data = { id: authorId };
    return this.http.post<GenericResponseInterface>(url, data);
  }

}
