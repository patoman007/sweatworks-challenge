import { PublicationInterface } from '../../../shared/publication/publication.interface';
import { AuthorInterface } from '../../../shared/author/author.interface';

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

export class PublicationModel implements PublicationInterface {

  id: number;
  title: string;
  body: string;
  date: string;
  author: AuthorModel;

  constructor(publication: PublicationInterface) {
    this.id = publication.id || null;
    this.title = publication.title;
    this.body = publication.body;
    this.date = publication.date;

    this.author = new AuthorModel(publication.author);
  }

  doesTitleContains(str: string): boolean {
    const terms = str.toLowerCase().split(' ');
    return terms.reduce((result: boolean, term): boolean => {
      const match = this.title.toLocaleLowerCase().indexOf(term) !== -1;
      return result || match;
    }, false);
  }

}


