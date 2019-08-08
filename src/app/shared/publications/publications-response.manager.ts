import { Observable } from 'rxjs';
import { GenericResponseInterface } from '../generic-response/generic-response.interface';
import { PublicationInterface } from './publications.manager';

export interface PublicationsResponseInterface extends GenericResponseInterface {
  data: PublicationInterface[];
}

export class PublicationsResponseManager {

  static From(publications: PublicationInterface[]): PublicationsResponseInterface {
    return {
      succeed: true,
      errorMessages: [],
      data: publications
    };
  }

  static Response(publications: PublicationInterface[]): Observable<PublicationsResponseInterface> {
    const response = PublicationsResponseManager.From(publications);
    return new Observable<PublicationsResponseInterface>(observable => {
      observable.next(response);
      observable.complete();
    });
  }

}
