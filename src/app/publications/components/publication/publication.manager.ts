export interface PublicationDataLabelsInterface {
  deleting: string;
}

export interface PublicationDataInterface {
  labels: PublicationDataLabelsInterface;
}

export class PublicationManager {

  private static Labels: PublicationDataLabelsInterface = {
    deleting: 'Deleting publication ...'
  };

  static Data: PublicationDataInterface = {
    labels: PublicationManager.Labels,
  };

}
