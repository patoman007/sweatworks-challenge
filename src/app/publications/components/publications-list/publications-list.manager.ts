import { AlertMessageInterface } from '../../../shared/ui/alert-message/alert-message.manager';

import { AuthorInterface } from '../../../shared/author/author.interface';
import { PublicationInterface } from '../../../shared/publication/publication.interface';

import { Alignment } from '../../../shared/alignment/alignment.enum';

export interface PublicationsListDataLabelsInterface {
  header: string;
  loadingPublications: string;
  loadingPublicationsFailed: string;
}

export interface PublicationsListDataInterface {
  labels: PublicationsListDataLabelsInterface;
  loadingPublications: boolean;
  loadingError: boolean;
  messageError: AlertMessageInterface;
  publications: PublicationInterface[];
}

export class PublicationsListManager {

  private static Labels: PublicationsListDataLabelsInterface = {
    header: 'Author publications',
    loadingPublications: 'Loading author publications, please wait ...',
    loadingPublicationsFailed: 'Failed to retrieve publications 😣, please try again later.'
  };

  private static LoadingPublicationsError: AlertMessageInterface = {
    type: 'error',
    alignment: Alignment.Center,
    label: PublicationsListManager.Labels.loadingPublicationsFailed
  };

  static Data: PublicationsListDataInterface = {
    labels: PublicationsListManager.Labels,
    loadingPublications: false,
    loadingError: true,
    messageError: PublicationsListManager.LoadingPublicationsError,
    publications: []
  };

  private static FakePublication(title: string,
                                 body: string,
                                 date: string,
                                 author: AuthorInterface): PublicationInterface {
    return { title, body, date, author };
  }

  private static FakeAuthor(firstName: string,
                            lastName: string,
                            email: string,
                            dof: string): AuthorInterface {
    return { firstName, lastName, email, dof  };
  }

  static FakeData(): PublicationInterface[] {
    const authors: AuthorInterface[] = [
      PublicationsListManager
        .FakeAuthor('Dr.', 'Seuss', 'seuss@gmail.com', '05/04/1965'),
      PublicationsListManager
        .FakeAuthor('Marilyn', 'Monroe', 'mmonroe@yahoo.com', '12/08/1945'),
      PublicationsListManager
        .FakeAuthor('Oscar', 'Wilde', 'owilde@hotmail.com', '11/01/1937'),
      PublicationsListManager
        .FakeAuthor('Albert', 'Einstein', 'aeinstein@gmail.com', '02/03/1929'),
      PublicationsListManager
        .FakeAuthor('Frank', 'Zappa', 'fzappa@outlook.com', '05/04/1965'),
    ];

    const titles: string[] = [
      'Don\'t cry',
      'I\'m selfish',
      'Be yourself',
      'Two things',
      'So many books'
    ];

    const bodies: string[] = [
      'Don\'t cry because it\'s over, smile because it happened.',
      'I\'m selfish, impatient and a little insecure. I make mistakes, I am out of control and ' +
      'at times hard to handle. But if you can\'t handle me at my worst, then you sure as hell ' +
      'don\'t deserve me at my best.',
      'Be yourself; everyone else is already taken.',
      'Two things are infinite: the universe and human stupidity; and I\'m not sure about ' +
      'the universe.',
      'So many books, so little time.'
    ];

    const dates: string[] = [
      '02/04/2019',
      '10/03/2019',
      '05/08/2018',
      '11/11/2018',
      '08/05/2019'
    ];

    return [
      PublicationsListManager.FakePublication(titles[0], bodies[0], dates[0], authors[0]),
      PublicationsListManager.FakePublication(titles[1], bodies[1], dates[1], authors[1]),
      PublicationsListManager.FakePublication(titles[2], bodies[2], dates[2], authors[2]),
      PublicationsListManager.FakePublication(titles[3], bodies[3], dates[3], authors[3]),
      PublicationsListManager.FakePublication(titles[4], bodies[4], dates[4], authors[4])
    ];
  }

}
