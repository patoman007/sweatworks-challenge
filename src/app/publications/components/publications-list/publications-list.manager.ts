export interface PublicationsListDataLabelsInterface {
  header: string;
}

export interface PublicationsListDataInterface {
  labels: PublicationsListDataLabelsInterface;
}

export class PublicationsListManager {

  private static Labels: PublicationsListDataLabelsInterface = {
    header: 'Author publications'
  };

  static Data: PublicationsListDataInterface = {
    labels: PublicationsListManager.Labels
  };

}
