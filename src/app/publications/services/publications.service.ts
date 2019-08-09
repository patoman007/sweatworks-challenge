import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PublicationInterface } from '../../shared/publications/publications.manager';
import {
  PublicationsResponseInterface,
  PublicationsResponseManager
} from '../../shared/publications/publications-response.manager';

import { GenericResponseInterface } from '../../shared/generic-response/generic-response.interface';

import { environment } from '../../../environments/environment';

type GenericResponse = Observable<GenericResponseInterface>;

@Injectable()
export class PublicationsService {

  private static Endpoints = {
    get: 'publications',
    create: 'publications/new',
    update: 'publications/edit',
    delete: 'publications/remove'
  };

  private publications: PublicationInterface[] = [];

  constructor(private http: HttpClient) { }

  private tapPublicationsResponse(response: PublicationsResponseInterface) {
    if (!response.succeed) { return; }
    this.publications = response.data;
  }

  private retrievePublications(): Observable<PublicationsResponseInterface> {
    const url = environment.webServices.base + PublicationsService.Endpoints.get;
    return this.http.get<PublicationsResponseInterface>(url)
      .pipe(
        tap(res => this.tapPublicationsResponse(res))
      );
  }

  getPublications(force: boolean = false): Observable<PublicationsResponseInterface> {
    if (this.publications.length > 0 && !force) {
      return PublicationsResponseManager.Response(this.publications);
    }

    return this.retrievePublications();
  }

  createPublication(newPublication: PublicationInterface): GenericResponse {
    const url = environment.webServices.base + PublicationsService.Endpoints.create;
    return this.http.post<GenericResponseInterface>(url, newPublication);
  }

  updatePublication(updatedPublication: PublicationInterface): GenericResponse {
    const url = environment.webServices.base + PublicationsService.Endpoints.update;
    return this.http.post<GenericResponseInterface>(url, updatedPublication);
  }

  deletePublication(publicationId: string): GenericResponse {
    const url = environment.webServices.base + PublicationsService.Endpoints.delete;
    const data = { id: publicationId };
    return this.http.post<GenericResponseInterface>(url, data);
  }

}
