import { Observable } from 'rxjs';

import { AuthorModel } from './authors.manager';

import { GenericResponseInterface } from '../generic-response/generic-response.interface';

export interface AuthorsResponseInterface extends GenericResponseInterface {
  data: AuthorModel[];
}

export class AuthorsResponseManager {

  static From(authors: AuthorModel[]): AuthorsResponseInterface {
    return {
      succeed: true,
      errorMessages: [],
      data: authors
    };
  }

  static Response(authors: AuthorModel[]): Observable<AuthorsResponseInterface> {
    const response = AuthorsResponseManager.From(authors);
    return new Observable<AuthorsResponseInterface>(observable => {
      observable.next(response);
      observable.complete();
    });
  }

}
