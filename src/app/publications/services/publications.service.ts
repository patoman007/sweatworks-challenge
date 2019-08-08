import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PublicationInterface } from '../../shared/publications/publications.manager';
import {
  PublicationsResponseInterface,
  PublicationsResponseManager
} from '../../shared/publications/publications-response.manager';

import { environment } from '../../../environments/environment';


@Injectable()
export class PublicationsService {

  private static Endpoints = {
    publications: 'publications.json'
  };

  private publications: PublicationInterface[] = [];

  constructor(private http: HttpClient) { }

  private tapPublicationsResponse(response: PublicationsResponseInterface) {
    if (!response.succeed) { return; }
    this.publications = response.data;
  }

  private retrievePublications(): Observable<PublicationsResponseInterface> {
    const url = environment.webServices.base + PublicationsService.Endpoints.publications;
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

}
