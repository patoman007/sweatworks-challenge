import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  AuthorInterface,
  AuthorsManager
} from '../../shared/authors/authors.manager';

import { CRUDOperation } from '../../shared/operations/operations.manager';
import {
  AuthorsResponseInterface,
  AuthorsResponseManager,
  DeleteAuthorResponseInterface,
  NewAuthorResponseInterface
} from '../../shared/authors/authors-response.manager';
import { AuthorsService } from '../../shared/authors/authors.service';

type AuthorsResponse = Observable<AuthorsResponseInterface>;
type NewAuthorResponse = Observable<NewAuthorResponseInterface>;
type DeleteAuthorResponse = Observable<DeleteAuthorResponseInterface>;


@Injectable()
export class AuthorsManagementService {

  private authors: AuthorInterface[] = [];

  authorsHasChanged = new EventEmitter<AuthorInterface[]>();

  constructor(private http: HttpClient,
              private authorsService: AuthorsService) { }

  private tapAuthorsResponse(response: AuthorsResponseInterface) {
    if (!response.succeed) { return; }
    this.authors = response.data;
  }

  private tapNewAuthorResponse(response: NewAuthorResponseInterface) {
    if (!response.succeed) { return; }
    this.authors.push(response.data);
    this.authorsHasChanged.emit(this.authors);
    this.authorsService.updateAuthors(this.authors);
  }

  private tapUpdateAuthorResponse(response: NewAuthorResponseInterface) {
    if (!response.succeed) { return; }

    const author = response.data;
    const index = this.authors
      .findIndex(auxAuthor => auxAuthor.id === author.id);
    if (index === -1) { return; }

    this.updateAuthorAtIndex(author, index);
    this.authorsHasChanged.emit(this.authors);
    this.authorsService.updateAuthors(this.authors);
  }

  private tapDeleteAuthorResponse(response: DeleteAuthorResponseInterface) {
    if (!response.succeed) { return; }

    const authorId = response.data.deletedAuthorId;
    const index = this.authors
      .findIndex(auxAuthor => auxAuthor.id === authorId);
    if (index === -1) { return; }

    this.authors.splice(index, 1);
    this.authorsHasChanged.emit(this.authors);
    this.authorsService.updateAuthors(this.authors);
  }

  private retrieveAuthors(): AuthorsResponse {
    const url = AuthorsManager.OperationURL(CRUDOperation.Read);
    return this.http.get<AuthorsResponseInterface>(url)
      .pipe(
        tap(response => this.tapAuthorsResponse(response))
      );
  }

  private updateAuthorAtIndex(author: AuthorInterface, index: number) {
    const oldAuthor = this.authors[index];
    oldAuthor.firstName = author.firstName;
    oldAuthor.lastName = author.lastName;
    oldAuthor.email = author.email;
    oldAuthor.dof = author.dof;
  }

  getAuthors(force: boolean = false): AuthorsResponse {
    if (this.authors.length > 0 && !force) {
      return AuthorsResponseManager.Response(this.authors);
    }

    return this.retrieveAuthors();
  }

  createAuthor(author: AuthorInterface): NewAuthorResponse {
    const url = AuthorsManager.OperationURL(CRUDOperation.Create);
    return this.http.post<NewAuthorResponseInterface>(url, author)
      .pipe(
        tap(response => this.tapNewAuthorResponse(response))
      );
  }

  updateAuthor(author: AuthorInterface): NewAuthorResponse {
    const url = AuthorsManager.OperationURL(CRUDOperation.Update);
    return this.http.post<NewAuthorResponseInterface>(url, author)
      .pipe(
        tap(response => this.tapUpdateAuthorResponse(response))
      );
  }

  deleteAuthor(authorId: string): DeleteAuthorResponse {
    const url = AuthorsManager.OperationURL(CRUDOperation.Delete);
    const data = AuthorsManager.DeleteBodyRequest(authorId);
    return this.http.post<DeleteAuthorResponseInterface>(url, data)
      .pipe(
        tap(response => this.tapDeleteAuthorResponse(response))
      );
  }

}
