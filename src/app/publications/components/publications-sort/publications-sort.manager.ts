export interface PublicationSortInterface {
  value: string;
  label: string;
}

export interface PublicationsSortDataInterface {
  sorts: PublicationSortInterface[];
}

export class PublicationsSortManager {

  static PublicationSort(value: string, label: string): PublicationSortInterface {
    return { value, label };
  }

}
