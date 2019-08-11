import { AuthorModel } from '../../../shared/authors/authors.manager';
import {
  AlertMessageInterface,
  AlertMessageManager
} from '../../../shared/ui/alert-message/alert-message.manager';

export interface AuthorsListDataLabelsInterface {
  header: string;
  loadingAuthors: string;
  loadingAuthorsError: string;
  emptyAuthors: string;
}

export interface AuthorsListDataMessagesInterface {
  authorsLoadedError: AlertMessageInterface;
  emptyAuthors: AlertMessageInterface;
}

export interface AuthorsListDataAuthorsInterface {
  loading: boolean;
  loadingError: boolean;
  authors: AuthorModel[];
}

export interface AuthorsListDataInterface {
  labels: AuthorsListDataLabelsInterface;
  messages: AuthorsListDataMessagesInterface;
  data: AuthorsListDataAuthorsInterface;
}

export class AuthorsListManager {

  private static Labels: AuthorsListDataLabelsInterface = {
    header: 'Authors',
    loadingAuthors: 'Loading data ...',
    loadingAuthorsError: 'An error has occurred when trying to retrieve authors 😩',
    emptyAuthors: 'Usps! No authors were found 😩, dare to create the first one!'
  };

  private static Messages: AuthorsListDataMessagesInterface = {
    authorsLoadedError: AlertMessageManager
      .ErrorAlertMessage(AuthorsListManager.Labels.loadingAuthorsError),
    emptyAuthors: AlertMessageManager
      .InfoAlertMessage(AuthorsListManager.Labels.emptyAuthors)
  };

  private static AuthorsData: AuthorsListDataAuthorsInterface = {
    loading: false,
    loadingError: false,
    authors: []
  };

  static Data: AuthorsListDataInterface = {
    labels: AuthorsListManager.Labels,
    messages: AuthorsListManager.Messages,
    data: AuthorsListManager.AuthorsData
  };

  static UpdatedLoadedAuthorsErrorLabel(errorMessages: string[]): string {
    const label = AuthorsListManager.Labels.loadingAuthorsError;
    return errorMessages.length === 0
      ? label
      : (label + ' Error: ' + errorMessages.join(' - '));
  }

}
