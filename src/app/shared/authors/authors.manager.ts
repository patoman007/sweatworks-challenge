import { AuthorsResponseInterface } from './authors-response.manager';

import { CRUDOperation, OperationsManager } from '../operations/operations.manager';

import {environment} from '../../../environments/environment';

export interface AuthorInterface {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  dof: string; // date of birth
}

export interface AuthorDeleteBodyRequest {
  id: string;
}

export class AuthorModel implements AuthorInterface {

  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  dof: string;

  constructor(author: AuthorInterface) {
    this.id = author.id;
    this.firstName = author.firstName;
    this.lastName = author.lastName;
    this.email = author.lastName;
    this.dof = author.dof;
  }

  get fullName(): string {
    return `${ this.lastName || '' }, ${ this.firstName || '' }`;
  }

}

export class AuthorsManager {

  private static readonly EndpointsBase = environment.webServices.endpoints.authors;
  private static readonly Endpoints = [
    AuthorsManager.EndpointsBase.create,
    AuthorsManager.EndpointsBase.read,
    AuthorsManager.EndpointsBase.update,
    AuthorsManager.EndpointsBase.delete
  ];

  static OperationURL(operation: CRUDOperation): string {
    const endpoint = AuthorsManager.Endpoints[operation];
    return OperationsManager.EndpointURL(endpoint);
  }

  static DeleteBodyRequest(authorId: string): AuthorDeleteBodyRequest {
    return { id: authorId };
  }

  static AuthorsFromResponse(response: AuthorsResponseInterface): AuthorModel[] {
    if (!response.succeed) { return []; }
    return response.data.map(author => new AuthorModel(author));
  }

}
