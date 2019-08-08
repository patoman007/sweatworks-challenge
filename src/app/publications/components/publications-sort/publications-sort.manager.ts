import { PublicationModel } from '../../../shared/publications/publications.manager';
import { SortPublicationsBy } from '../publications-list/publications-list.manager';

export interface PublicationSortInterface {
  value: string;
  label: string;
}

export interface PublicationsSortDataInterface {
  sorts: PublicationSortInterface[];
}

export class PublicationsSortManager {

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

  static PublicationSort(value: string, label: string): PublicationSortInterface {
    return { value, label };
  }

  static SortPublications(publications: PublicationModel[], by: SortPublicationsBy): PublicationModel[] {
    switch (by) {
      case SortPublicationsBy.TitleAsc:
        return publications.sort(PublicationsSortManager.PublicationsByTitleAsc);
      case SortPublicationsBy.TitleDesc:
        return publications.sort(PublicationsSortManager.PublicationsByTitleDesc);
      case SortPublicationsBy.DateAsc:
        return publications.sort(PublicationsSortManager.PublicationsByDateAsc);
      case SortPublicationsBy.DateDesc:
        return publications.sort(PublicationsSortManager.PublicationsByDateDesc);
    }
  }

}
