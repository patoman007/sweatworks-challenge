import { SearchBarInterface, SearchBarManager } from '../../../shared/ui/search-bar/search-bar.manager';

import { PaginatorModel } from '../../../shared/ui/paginator/paginator.manager';
import { ButtonInterface } from '../../../shared/ui/button/button.manager';
import { SectionHeaderInterface } from '../../../shared/ui/section-header/section-header.manager';
import { AlertMessageInterface, AlertMessageManager } from '../../../shared/ui/alert-message/alert-message.manager';

import { PublicationModel } from '../../../shared/publications/publications.manager';
import { AuthorModel } from '../../../shared/authors/authors.manager';

import { PublicationsSortDataInterface, PublicationsSortManager } from '../publications-sort/publications-sort.manager';

import Color from '../../../shared/ui/color.enum';
import { PublicationFormDialogDataInterface, PublicationFormMode } from '../publication-form/publication-form.manager';
import { MatDialogConfig } from '@angular/material';

export enum SortPublicationsBy {
  TitleAsc = 'titleAsc',
  TitleDesc = 'titleDesc',
  DateAsc = 'dateAsc',
  DateDesc = 'dateDesc'
}

export interface PublicationsListDataLabelsInterface {
  sectionHeader: string;
  newPublication: string;
  loadingPublications: string;
  loadingPublicationsFailed: string;
  emptyPublications: string;
  emptyAuthorPublications: string;
  searchPublicationsPlaceholder: string;
  emptySearchResult: string;
  sortByTitleAsc: string;
  sortByTitleDesc: string;
  sortByDateAsc: string;
  sortByDateDesc: string;
}

export interface PublicationsListDataAlertMessagesInterface {
  loadingPublicationsErrorMessage: AlertMessageInterface;
  emptyPublicationsMessage: AlertMessageInterface;
  emptyAuthorPublicationsMessage: AlertMessageInterface;
  emptySearchResultMessage: AlertMessageInterface;
}

export interface PublicationsListDataPublicationsInterface {
  publications: PublicationModel[];
  filtered: PublicationModel[];
  displayed: PublicationModel[];
  loading: boolean;
  loadingError: boolean;
  areFiltered: boolean;
}

export interface PublicationsListDataInterface {
  labels: PublicationsListDataLabelsInterface;
  sectionHeader: SectionHeaderInterface;
  searchBar: SearchBarInterface;
  paginator: PaginatorModel;
  sorter: PublicationsSortDataInterface;
  data: PublicationsListDataPublicationsInterface;
  alertMessages: PublicationsListDataAlertMessagesInterface;
}

export class PublicationsListManager {

  private static Labels: PublicationsListDataLabelsInterface = {
    sectionHeader: 'Publications',
    newPublication: 'New Publication',
    loadingPublications: 'Loading publications data, please wait ...',
    loadingPublicationsFailed: 'An error has occurred when trying to retrieve publications 😌',
    emptyPublications: 'Usps! no publications were found 😌, dare to create the first one!',
    emptyAuthorPublications: 'No author publications were found.',
    searchPublicationsPlaceholder: 'Search by title',
    emptySearchResult: 'Usps! no results were found 😌',
    sortByTitleAsc: 'Title asc',
    sortByTitleDesc: 'Title desc',
    sortByDateAsc: 'Date asc',
    sortByDateDesc: 'Date desc'
  };

  private static NewPublicationHeaderButton: ButtonInterface = {
    label: PublicationsListManager.Labels.newPublication,
    type: 'raised',
    bgColor: Color.Confirm,
    fontColor: Color.White,
    onClick: () => {}
  };

  private static SectionHeader: SectionHeaderInterface = {
    title: PublicationsListManager.Labels.sectionHeader,
    actionButtons: [PublicationsListManager.NewPublicationHeaderButton]
  };

  private static SearchBar: SearchBarInterface = SearchBarManager
    .From(() => {}, PublicationsListManager.Labels.searchPublicationsPlaceholder);

  private static SortPublicationsByTitleAsc = PublicationsSortManager
    .PublicationSort(SortPublicationsBy.TitleAsc, PublicationsListManager.Labels.sortByTitleAsc);

  private static SortPublicationsByTitleDesc = PublicationsSortManager
    .PublicationSort(SortPublicationsBy.TitleDesc, PublicationsListManager.Labels.sortByTitleDesc);

  private static SortPublicationsByDateAsc = PublicationsSortManager
    .PublicationSort(SortPublicationsBy.DateAsc, PublicationsListManager.Labels.sortByDateAsc);

  private static SortPublicationsByDateDesc = PublicationsSortManager
    .PublicationSort(SortPublicationsBy.DateDesc, PublicationsListManager.Labels.sortByDateDesc);

  private static Sorter: PublicationsSortDataInterface = {
    sorts: [
      PublicationsListManager.SortPublicationsByTitleAsc,
      PublicationsListManager.SortPublicationsByTitleDesc,
      PublicationsListManager.SortPublicationsByDateAsc,
      PublicationsListManager.SortPublicationsByDateDesc,
    ]
  };

  private static PublicationsData: PublicationsListDataPublicationsInterface = {
    publications: [],
    filtered: [],
    displayed: [],
    loading: false,
    loadingError: false,
    areFiltered: false
  };

  private static AlertMessages: PublicationsListDataAlertMessagesInterface = {
    loadingPublicationsErrorMessage: AlertMessageManager
      .ErrorAlertMessage(PublicationsListManager.Labels.loadingPublicationsFailed),
    emptyPublicationsMessage: AlertMessageManager
      .InfoAlertMessage(PublicationsListManager.Labels.emptyPublications),
    emptyAuthorPublicationsMessage: AlertMessageManager
      .InfoAlertMessage(PublicationsListManager.Labels.emptyAuthorPublications),
    emptySearchResultMessage: AlertMessageManager
      .InfoAlertMessage(PublicationsListManager.Labels.emptySearchResult)
  };

  static Data: PublicationsListDataInterface = {
    labels: PublicationsListManager.Labels,
    sectionHeader: PublicationsListManager.SectionHeader,
    searchBar: PublicationsListManager.SearchBar,
    paginator: null,
    sorter: PublicationsListManager.Sorter,
    data: PublicationsListManager.PublicationsData,
    alertMessages: PublicationsListManager.AlertMessages
  };

  private static FilterPublicationsByTitle(publications: PublicationModel[],
                                           filter: string): PublicationModel[] {
    return publications
      .filter(publication => publication.doesTitleContains(filter));
  }

  static PublicationById(publicationId: string): PublicationModel | null {
    return PublicationsListManager.Data.data.publications
      .find(pub => pub.id === publicationId);
  }

  static UpdateSectionHeader(newPublication: () => void) {
    PublicationsListManager.Data.sectionHeader.actionButtons[0].onClick = newPublication;
  }

  static UpdateSearchBar(searchText: (value: string) => void) {
    PublicationsListManager.Data.searchBar.searchTerm = searchText;
  }

  static UpdateLoadingPublicationsError(errorMessages: string[]) {
    const errorLabel = PublicationsListManager.Labels.loadingPublicationsFailed
      + '\n\nError: ' + errorMessages.join(' - ');
    PublicationsListManager.Data.alertMessages.loadingPublicationsErrorMessage.label = errorLabel;
    PublicationsListManager.Data.data.loadingError = true;
  }

  static Paginator(publications: PublicationModel[],
                   previousPage: () => void, nextPage: () => void,
                   navigateToPage: (pageNumber: number) => void): PaginatorModel | null {
    if (publications.length === 0) { return null; }

    const totalItems = publications.length;
    return PaginatorModel.From(totalItems, previousPage, nextPage, navigateToPage);
  }

  static UpdatedAuthorHeader(author: AuthorModel): string {
    return `${author.lastName}'s ${ PublicationsListManager.Labels.sectionHeader }`;
  }

  static PublicationsFilteredByAuthor(publications: PublicationModel[],
                                      author: AuthorModel): PublicationModel[] {
    return !author
      ? publications
      : publications
        .filter(publication => publication.belongsToAuthor(author));
  }

  static PublicationsFilteredByTitle(publications: PublicationModel[],
                                     filter: string): PublicationModel[] {
    return filter !== ''
      ? PublicationsListManager.FilterPublicationsByTitle(publications, filter)
      : publications;
  }

  static DisplayedFilteredPublications(filteredPublications: PublicationModel[],
                                       paginator: PaginatorModel): PublicationModel[] {
    const start = paginator.offset;
    const end = paginator.offset + paginator.itemsPerPage;
    return filteredPublications.slice(start, end);
  }

  static PublicationFormDialogData(mode: PublicationFormMode,
                                   publication?: PublicationModel): MatDialogConfig {
    const data: PublicationFormDialogDataInterface = { mode, publication };
    return { data };
  }

}
