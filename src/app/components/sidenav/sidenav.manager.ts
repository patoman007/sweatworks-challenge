import { AuthorModel } from '../../publications/components/publication/publication.manger';

export interface SidenavDataLabelsInterface {
  loading: string;
  emptyAuthors: string;
  listHeader: string;
}

export interface SidenavDataInterface {
  labels: SidenavDataLabelsInterface;
  authors: AuthorModel[];
}

export class SidenavManager {

  private static Labels: SidenavDataLabelsInterface = {
    loading: 'Loading authors, please wait',
    emptyAuthors: 'No authors were found.',
    listHeader: 'Authors'
  };

  static Data: SidenavDataInterface = {
    labels: SidenavManager.Labels,
    authors: null,
  };

}
