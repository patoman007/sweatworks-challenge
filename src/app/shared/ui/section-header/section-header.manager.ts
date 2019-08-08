import { ButtonInterface } from '../button/button.manager';

export interface SectionHeaderInterface {
  title: string;
  actionButtons: ButtonInterface[];
}

export class SectionHeaderManager {

  static SectionHeader(title: string,
                       actionButtons: ButtonInterface[] = []): SectionHeaderInterface {
    return { title, actionButtons };
  }

}
