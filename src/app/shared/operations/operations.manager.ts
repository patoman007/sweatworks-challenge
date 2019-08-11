import {environment} from '../../../environments/environment';

export enum CRUDOperation {
  Create,
  Read,
  Update,
  Delete
}

export class OperationsManager {

  private static readonly  BaseURL = environment.webServices.base;

  static EndpointURL(endpoint: string): string {
    return OperationsManager.BaseURL + endpoint;
  }

}
