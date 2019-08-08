import { AuthorInterface, AuthorModel } from '../authors/authors.manager';
import { PublicationsResponseInterface } from './publications-response.manager';

export interface PublicationInterface {
  id?: number;
  title: string;
  body: string;
  datetime: string;
  author: AuthorInterface;
}

export class PublicationModel implements PublicationInterface {

  id: number;
  title: string;
  body: string;
  datetime: string;
  author: AuthorModel;

  constructor(publication: PublicationInterface) {
    this.id = publication.id || null;
    this.title = publication.title;
    this.body = publication.body;
    this.datetime = publication.datetime;

    this.author = new AuthorModel(publication.author);
  }

  belongsToAuthor(author: AuthorModel): boolean {
    return this.author.id === author.id;
  }

  doesTitleContains(str: string): boolean {
    const terms = str.toLowerCase().split(' ');
    return terms.reduce((result: boolean, term): boolean => {
      const match = this.title.toLocaleLowerCase().indexOf(term) !== -1;
      return result || match;
    }, false);
  }

}

export class PublicationsManager {

  static PublicationsFromResponse(response: PublicationsResponseInterface): PublicationModel[] {
    if (!response.succeed) { return []; }
    return response.data.map(publication => new PublicationModel(publication));
  }

}
