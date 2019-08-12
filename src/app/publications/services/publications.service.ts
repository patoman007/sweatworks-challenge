import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {
  PublicationInterface,
  PublicationsManager
} from '../../shared/publications/publications.manager';

import { CRUDOperation } from '../../shared/operations/operations.manager';

import {
  DeletePublicationResponseInterface,
  NewPublicationResponseInterface,
  PublicationsResponseInterface,
  PublicationsResponseManager
} from '../../shared/publications/publications-response.manager';
import { AuthorsService } from '../../shared/authors/authors.service';

type PublicationsResponse = Observable<PublicationsResponseInterface>;
type NewPublicationResponse = Observable<NewPublicationResponseInterface>;
type DeletePublicationResponse = Observable<DeletePublicationResponseInterface>;


@Injectable()
export class PublicationsService {

  private publications: PublicationInterface[] = [];

  publicationsHasChanged = new EventEmitter<PublicationInterface[]>();

  constructor(private http: HttpClient,
              private authorsService: AuthorsService) { }

  private tapPublicationsResponse(response: PublicationsResponseInterface) {
    if (!response.succeed) { return; }
    this.publications = response.data;
  }

  private async tapNewPublicationResponse(response: NewPublicationResponseInterface) {
    if (!response.succeed) { return; }

    const publication = response.data;
    publication.authorDisplayedName = await this.authorsService
      .getAuthorDisplayedName(publication.authorId);
    this.publications.push(publication);
    this.publicationsHasChanged.emit(this.publications);
  }

  private async tapUpdatePublicationResponse(res: NewPublicationResponseInterface) {
    if (!res.succeed) { return; }

    const publication = res.data;
    const index = this.publications
      .findIndex(pub => pub.id === publication.id);
    if (index === -1) { return; }

    await this.updatePublicationAtIndex(publication, index);
  }

  private tapDeletePublicationResponse(response: DeletePublicationResponseInterface) {
    if (!response.succeed) { return; }

    const publicationId = response.data.deletedPublicationId;
    const index = this.publications
      .findIndex(pub => pub.id === publicationId);
    if (index === -1) { return; }

    this.publications.splice(index, 1);
    this.publicationsHasChanged.emit(this.publications);
  }

  private retrievePublications(): PublicationsResponse {
    const url = PublicationsManager.OperationURL(CRUDOperation.Read);
    return this.http.get<PublicationsResponseInterface>(url)
      .pipe(
        tap(res => this.tapPublicationsResponse(res))
      );
  }

  private async updatePublicationAtIndex(publication: PublicationInterface,
                                         index: number) {
    const oldPublication = this.publications[index];
    oldPublication.title = publication.title;
    oldPublication.body = publication.body;
    oldPublication.authorId = publication.authorId;
    oldPublication.datetime = publication.datetime;
    oldPublication.authorDisplayedName = await this.authorsService
      .getAuthorDisplayedName(oldPublication.authorId);

    this.publicationsHasChanged.emit(this.publications);
  }

  getPublications(force: boolean = false): PublicationsResponse {
    if (this.publications.length > 0 && !force) {
      return PublicationsResponseManager.Response(this.publications);
    }

    return this.retrievePublications();
  }

  createPublication(newPublication: PublicationInterface): NewPublicationResponse {
    const url = PublicationsManager.OperationURL(CRUDOperation.Create);
    return this.http.post<NewPublicationResponseInterface>(url, newPublication)
      .pipe(
        tap(async (response) => await this.tapNewPublicationResponse(response))
      );
  }

  updatePublication(updatedPublication: PublicationInterface): NewPublicationResponse {
    const url = PublicationsManager.OperationURL(CRUDOperation.Update);
    return this.http.post<NewPublicationResponseInterface>(url, updatedPublication)
      .pipe(
        tap(async (response) => await this.tapUpdatePublicationResponse(response))
      );
  }

  deletePublication(publicationId: string): DeletePublicationResponse {
    const url = PublicationsManager.OperationURL(CRUDOperation.Delete);
    const data = PublicationsManager.DeleteBodyRequest(publicationId);
    return this.http.post<DeletePublicationResponseInterface>(url, data)
      .pipe(
        tap(response => this.tapDeletePublicationResponse(response))
      );
  }

}
