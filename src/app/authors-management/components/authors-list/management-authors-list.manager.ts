import { MatDialogConfig } from '@angular/material';

import { AuthorModel } from '../../../shared/authors/authors.manager';

import {
  SectionHeaderInterface
} from '../../../shared/ui/section-header/section-header.manager';

import { ButtonInterface } from '../../../shared/ui/button/button.manager';

import {
  AlertMessageInterface,
  AlertMessageManager
} from '../../../shared/ui/alert-message/alert-message.manager';

import {
  AuthorFormDialogDataInterface,
  ManagementAuthorFormMode
} from '../author-form/management-author-form.manager';

import Color from '../../../shared/ui/color.enum';

export interface ManagementAuthorsDataHeaderLabelsInterface {
  title: string;
  newAuthor: string;
}

export interface ManagementAuthorsDataInformationLabelsInterface {
  loadingAuthors: string;
  emptyAuthors: string;
}

export interface ManagementAuthorsDataErrorLabelsInterface {
  loadedAuthors: string;
}

export interface ManagementAuthorsDataLabelsInterface {
  header: ManagementAuthorsDataHeaderLabelsInterface;
  information: ManagementAuthorsDataInformationLabelsInterface;
  errors: ManagementAuthorsDataErrorLabelsInterface;
}

export interface ManagementAuthorsDataAuthorsInterface {
  loadingAuthors: boolean;
  loadingAuthorsFailed: boolean;
  authors: AuthorModel[];
}

export interface ManagementAuthorsDataAlertMessagesInterface {
  loadedAuthorsErrorMessage: AlertMessageInterface;
  emptyAuthorsMessage: AlertMessageInterface;
}

export interface ManagementAuthorsDataInterface {
  labels: ManagementAuthorsDataLabelsInterface;
  sectionHeader: SectionHeaderInterface;
  data: ManagementAuthorsDataAuthorsInterface;
  alertMessages: ManagementAuthorsDataAlertMessagesInterface;
}

export class ManagementAuthorsListManager {

  private static Labels: ManagementAuthorsDataLabelsInterface = {
    header: {
      title: 'Authors',
      newAuthor: 'New Author'
    },
    information: {
      loadingAuthors: 'Loading authors ...',
      emptyAuthors: 'No authors were found 😌, dare to create the first one!'
    },
    errors: {
      loadedAuthors: 'An error has occurred when trying to retrieve authors 😌'
    }
  };

  private static NewAuthorHeaderButton: ButtonInterface = {
    label: ManagementAuthorsListManager.Labels.header.newAuthor,
    type: 'raised',
    bgColor: Color.Confirm,
    fontColor: Color.White,
    onClick: () => {
    }
  };

  private static SectionHeader: SectionHeaderInterface = {
    title: ManagementAuthorsListManager.Labels.header.title,
    actionButtons: [ManagementAuthorsListManager.NewAuthorHeaderButton]
  };

  private static AuthorsData: ManagementAuthorsDataAuthorsInterface = {
    loadingAuthors: false,
    loadingAuthorsFailed: false,
    authors: []
  };

  private static LoadedAuthorsErrorMessage = AlertMessageManager
    .ErrorAlertMessage(ManagementAuthorsListManager.Labels.errors.loadedAuthors);

  private static EmptyAuthorsMessage = AlertMessageManager.InfoAlertMessage(
    ManagementAuthorsListManager.Labels.information.emptyAuthors);

  private static AlertMessages: ManagementAuthorsDataAlertMessagesInterface = {
    loadedAuthorsErrorMessage: ManagementAuthorsListManager.LoadedAuthorsErrorMessage,
    emptyAuthorsMessage: ManagementAuthorsListManager.EmptyAuthorsMessage
  };

  static Data: ManagementAuthorsDataInterface = {
    labels: ManagementAuthorsListManager.Labels,
    sectionHeader: ManagementAuthorsListManager.SectionHeader,
    data: ManagementAuthorsListManager.AuthorsData,
    alertMessages: ManagementAuthorsListManager.AlertMessages,
  };

  static AuthorById(authorId: string): AuthorModel | null {
    return ManagementAuthorsListManager.Data.data.authors
      .find(author => author.id === authorId);
  }

  static AuthorFormDialogData(mode: ManagementAuthorFormMode,
                              author?: AuthorModel): MatDialogConfig {
    const data: AuthorFormDialogDataInterface = { mode, author };
    return { data };
  }

}
