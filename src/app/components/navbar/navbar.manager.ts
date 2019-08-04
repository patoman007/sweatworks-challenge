export interface NavbarDataLabelsInterface {
  title: string;
}

export interface NavbarDataInterface {
  labels: NavbarDataLabelsInterface;
}

export class NavbarManager {

  private static Labels: NavbarDataLabelsInterface = {
    title: 'Sweatworks Challenge'
  };

  static Data: NavbarDataInterface = {
    labels: NavbarManager.Labels
  };

}
