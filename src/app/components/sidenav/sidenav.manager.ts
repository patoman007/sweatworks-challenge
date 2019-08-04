export interface SidenavDataLabelsInterface {
  loading: string;
}

export interface SidenavDataInterface {
  labels: SidenavDataLabelsInterface;
}

export class SidenavManager {

  private static Labels: SidenavDataLabelsInterface = {
    loading: 'Loading authors, please wait'
  };

  static Data: SidenavDataInterface = {
    labels: SidenavManager.Labels
  };

}
