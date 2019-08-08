import { AuthorsResponseInterface } from './authors-response.manager';

export interface AuthorInterface {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  dof: string; // date of birth
}

export class AuthorModel implements AuthorInterface {

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dof: string;

  constructor(author: AuthorInterface) {
    this.id = author.id || null;
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

  static AuthorsFromResponse(response: AuthorsResponseInterface): AuthorModel[] {
    if (!response.succeed) { return []; }
    return response.data.map(author => new AuthorModel(author));
  }

}
