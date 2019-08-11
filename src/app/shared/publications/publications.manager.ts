import { AuthorModel } from '../authors/authors.manager';
import { PublicationsResponseInterface } from './publications-response.manager';

import {
  CRUDOperation,
  OperationsManager
} from '../operations/operations.manager';

import {environment} from '../../../environments/environment';

export interface PublicationInterface {
  id?: string;
  title: string;
  body: string;
  datetime: string;
  authorId: string;
  authorDisplayedName?: string;
}

export interface PublicationDeleteBodyRequest {
  id: string;
}

export class PublicationModel implements PublicationInterface {

  id?: string;
  title: string;
  body: string;
  datetime: string;
  authorId: string;
  authorDisplayedName?: string;

  constructor(publication: PublicationInterface) {
    this.id = publication.id;
    this.title = publication.title;
    this.body = publication.body;
    this.datetime = publication.datetime;
    this.authorId = publication.authorId;
    this.authorDisplayedName = publication.authorDisplayedName;
  }

  belongsToAuthor(author: AuthorModel): boolean {
    return this.authorId === author.id;
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

  private static readonly EndpointsBase = environment.webServices
    .endpoints.publications;

  private static readonly Endpoints = [
    PublicationsManager.EndpointsBase.create,
    PublicationsManager.EndpointsBase.read,
    PublicationsManager.EndpointsBase.update,
    PublicationsManager.EndpointsBase.delete
  ];

  static PublicationFrom(title: string,
                         body: string,
                         datetime: string,
                         authorId: string,
                         id?: string): PublicationInterface {
    return { id, title, body, datetime, authorId };
  }

  static OperationURL(operation: CRUDOperation): string {
    const endpoint = PublicationsManager.Endpoints[operation];
    return OperationsManager.EndpointURL(endpoint);
  }

  static DeleteBodyRequest(publicationId: string): PublicationDeleteBodyRequest {
    return { id: publicationId };
  }

  static PublicationsFromResponse(response: PublicationsResponseInterface): PublicationModel[] {
    if (!response.succeed) { return []; }
    return response.data.map(publication => new PublicationModel(publication));
  }

}
