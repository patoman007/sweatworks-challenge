import { ButtonInterface, ButtonManager } from '../../shared/ui/button/button.manager';

export interface SidenavDataActionLabelsInterface {
  publications: string;
  authorsManagement: string;
}

export interface SidenavDataLabelsInterface {
  actions: SidenavDataActionLabelsInterface;
}

export interface SidenavDataActionButtonsInterface {
  publications: ButtonInterface;
  authorsManagement: ButtonInterface;
}

export interface SidenavDataInterface {
  labels: SidenavDataLabelsInterface;
  actionButtons: SidenavDataActionButtonsInterface;
}

export class SidenavManager {

  private static Labels: SidenavDataLabelsInterface = {
    actions: {
      publications: 'Publications',
      authorsManagement: 'Authors'
    }
  };

  private static PublicationsActionButton = ButtonManager
    .Button(SidenavManager.Labels.actions.publications, 'flat');

  private static AuthorsManagementActionButton = ButtonManager
    .Button(SidenavManager.Labels.actions.authorsManagement, 'flat');

  private static ActionButtons: SidenavDataActionButtonsInterface = {
    publications: SidenavManager.PublicationsActionButton,
    authorsManagement: SidenavManager.AuthorsManagementActionButton
  };

  static Data: SidenavDataInterface = {
    labels: SidenavManager.Labels,
    actionButtons: SidenavManager.ActionButtons,
  };

}
