import { AuthorInterface } from '../author/author.interface';

export interface PublicationInterface {
  id?: number;
  title: string;
  body: string;
  datetime: string;
  author: AuthorInterface;
}

