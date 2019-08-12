import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthorModel } from '../../../shared/authors/authors.manager';

import {
  AuthorsManagementService
} from '../../services/authors-management.service';

import { ManagementAuthorManager } from './management-author.manager';


@Component({
  selector: 'app-management-author',
  templateUrl: './management-author.component.html',
  styleUrls: ['./management-author.component.scss']
})
export class ManagementAuthorComponent {

  data = ManagementAuthorManager.Data;
  deleting = false;

  @Input()
  model: AuthorModel;

  @Output()
  edit = new EventEmitter<string>();

  get firstName(): string {
    return `${ this.data.labels.firstName }: ${ this.model.firstName } `;
  }

  get lastName(): string {
    return `${ this.data.labels.lastName }: ${ this.model.lastName } `;
  }

  get email(): string {
    return `${ this.data.labels.email }: ${ this.model.email } `;
  }

  constructor(private authorService: AuthorsManagementService) { }

  onEdit() {
    if (!this.model.id) { return; }
    this.edit.emit(this.model.id);
  }

  onDelete() {
    if (!this.model.id) { return; }

    this.deleting = true;
    this.authorService.deleteAuthor(this.model.id)
      .subscribe(() => {
        this.deleting = false;
      });
  }

}
