import { AlertMessageInterface } from '../../../shared/ui/alert-message/alert-message.manager';

import { SectionHeaderInterface } from '../../../shared/ui/section-header/section-header.manager';
import { ButtonInterface } from '../../../shared/ui/button/button.manager';
import { AuthorModel, PublicationModel } from '../publication/publication.manger';
import { SearchBarInterface, SearchBarManager } from '../../../shared/ui/search-bar/search-bar.manager';
import { PaginatorModel } from '../../../shared/ui/paginator/paginator.manager';

import { Alignment } from '../../../shared/alignment/alignment.enum';
import Color from '../../../shared/ui/color.enum';
import { PublicationsResponseInterface } from '../../../shared/publication/publications-response.manager';
import {
  PublicationsSortDataInterface,
  PublicationsSortManager
} from '../publications-sort/publications-sort.manager';

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
  publications: PublicationsListDataPublicationsInterface;
  alertMessages: PublicationsListDataAlertMessagesInterface;
}

export class PublicationsListManager {

  private static Labels: PublicationsListDataLabelsInterface = {
    sectionHeader: 'Publications',
    newPublication: 'New Publication',
    loadingPublications: 'Loading author publications, please wait ...',
    loadingPublicationsFailed: 'Failed to retrieve publications 😌.',
    emptyPublications: 'Usps! no publications were found 😌, dare to create the first one!',
    searchPublicationsPlaceholder: 'Search by title.',
    emptySearchResult: 'Usps! no results were found 😌.',
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

  private static LoadingPublicationsErrorMessage: AlertMessageInterface = {
    type: 'error',
    alignment: Alignment.Center,
    label: PublicationsListManager.Labels.loadingPublicationsFailed
  };

  private static EmptyPublicationsMessage: AlertMessageInterface = {
    type: 'info',
    alignment: Alignment.Center,
    label: PublicationsListManager.Labels.emptyPublications
  };

  private static EmptySearchResultMessage: AlertMessageInterface = {
    type: 'info',
    alignment: Alignment.Center,
    label: PublicationsListManager.Labels.emptySearchResult
  };

  private static AlertMessages: PublicationsListDataAlertMessagesInterface = {
    loadingPublicationsErrorMessage: PublicationsListManager.LoadingPublicationsErrorMessage,
    emptyPublicationsMessage: PublicationsListManager.EmptyPublicationsMessage,
    emptySearchResultMessage: PublicationsListManager.EmptySearchResultMessage
  };

  static Data: PublicationsListDataInterface = {
    labels: PublicationsListManager.Labels,
    sectionHeader: PublicationsListManager.SectionHeader,
    searchBar: PublicationsListManager.SearchBar,
    paginator: null,
    sorter: PublicationsListManager.Sorter,
    publications: PublicationsListManager.PublicationsData,
    alertMessages: PublicationsListManager.AlertMessages
  };

  private static FilterPublicationsByTitle(publications: PublicationModel[], filter: string): PublicationModel[] {
    return publications
      .filter(publication => publication.doesTitleContains(filter));
  }

  private static PublicationsByTitleAsc(a: PublicationModel, b: PublicationModel): number {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
  }

  private static PublicationsByTitleDesc(a: PublicationModel, b: PublicationModel): number {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    return titleA < titleB ? 1 : titleA > titleB ? -1 : 0;
  }

  private static PublicationsByDateAsc(a: PublicationModel, b: PublicationModel): number {
    const dateA = new Date(a.datetime);
    const dateB = new Date(b.datetime);
    return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
  }

  private static PublicationsByDateDesc(a: PublicationModel, b: PublicationModel): number {
    const dateA = new Date(a.datetime);
    const dateB = new Date(b.datetime);
    return dateA < dateB ? 1 : dateA > dateB ? -1 : 0;
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
    PublicationsListManager.Data.publications.loadingError = true;
  }

  static PublicationFromResponse(response: PublicationsResponseInterface): PublicationModel[] {
    if (!response.succeed) { return []; }
    return response.data.map(publication => new PublicationModel(publication));
  }

  static AuthorsFromResponse(response: PublicationsResponseInterface): AuthorModel[] {
    if (!response.succeed) { return []; }
    return response.data
      .map(publication => new AuthorModel(publication.author));
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
    return publications
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

  static SortPublications(publications: PublicationModel[], by: SortPublicationsBy): PublicationModel[] {
    switch (by) {
      case SortPublicationsBy.TitleAsc:
        return publications.sort(PublicationsListManager.PublicationsByTitleAsc);
      case SortPublicationsBy.TitleDesc:
        return publications.sort(PublicationsListManager.PublicationsByTitleDesc);
      case SortPublicationsBy.DateAsc:
        return publications.sort(PublicationsListManager.PublicationsByDateAsc);
      case SortPublicationsBy.DateDesc:
        return publications.sort(PublicationsListManager.PublicationsByDateDesc);
    }
  }

}
