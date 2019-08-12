export interface ManagementAuthorDataLabelsInterface {
  firstName: string;
  lastName: string;
  email: string;
  dof: string;
  deleting: string;
}

export interface ManagementAuthorDataInterface {
  labels: ManagementAuthorDataLabelsInterface;
}

export class ManagementAuthorManager {

  private static Labels: ManagementAuthorDataLabelsInterface = {
    deleting: 'Deleting author ...',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'E-mail',
    dof: 'Date of birth'
  };

  static Data: ManagementAuthorDataInterface = {
    labels: ManagementAuthorManager.Labels
  };

}
