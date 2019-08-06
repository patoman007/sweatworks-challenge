import { AuthorInterface } from '../author/author.interface';

export interface PublicationInterface {
  id?: string;
  title: string;
  body: string;
  date: string;
  author: AuthorInterface;
}
