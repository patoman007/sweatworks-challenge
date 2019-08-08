import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthorsResponseInterface, AuthorsResponseManager } from './authors-response.manager';

import { AuthorModel } from './authors.manager';

import { environment } from '../../../environments/environment';


@Injectable()
export class AuthorsService {

  private static Endpoints = {
    authors: 'authors.json'
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
        tap(res => this.tapAuthorsResponse(res))
      );
  }

  getAuthors(force: boolean = false): Observable<AuthorsResponseInterface> {
    if (this.authors.length > 0 && !force) {
      return AuthorsResponseManager.Response(this.authors);
    }

    return this.retrieveAuthors();
  }

}
