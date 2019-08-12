import { Observable } from 'rxjs';

import { AuthorInterface } from './authors.manager';

import {
  GenericResponseInterface
} from '../generic-response/generic-response.interface';

export interface AuthorsResponseInterface extends GenericResponseInterface {
  data: AuthorInterface[];
}

export interface NewAuthorResponseInterface extends GenericResponseInterface {
  data: AuthorInterface;
}

export interface DeleteAuthorResponseInterface extends GenericResponseInterface {
  data: {
    deletedAuthorId: string;
  };
}

export class AuthorsResponseManager {

  static From(authors: AuthorInterface[]): AuthorsResponseInterface {
    return {
      succeed: true,
      errorMessages: [],
      data: authors
    };
  }

  static Response(authors: AuthorInterface[]): Observable<AuthorsResponseInterface> {
    const response = AuthorsResponseManager.From(authors);
    return new Observable<AuthorsResponseInterface>(observable => {
      observable.next(response);
      observable.complete();
    });
  }

}
