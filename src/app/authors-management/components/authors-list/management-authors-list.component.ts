import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs';

import {
  ManagementAuthorsListManager
} from './management-authors-list.manager';

import {
  AuthorsResponseInterface
} from '../../../shared/authors/authors-response.manager';

import {
  AuthorInterface, AuthorModel
} from '../../../shared/authors/authors.manager';

import {
  ManagementAuthorFormMode
} from '../author-form/management-author-form.manager';

import {
  AuthorsManagementService
} from '../../services/authors-management.service';

import {
  ManagementAuthorFormComponent
} from '../author-form/management-author-form.component';


@Component({
  selector: 'app-management-authors-list',
  templateUrl: './management-authors-list.component.html',
  styleUrls: ['./management-authors-list.component.scss']
})
export class ManagementAuthorsListComponent implements OnInit, OnDestroy {

  private authorsChangesSubscription: Subscription;

  model = ManagementAuthorsListManager.Data;

  get shouldShowLoadingBar(): boolean {
    return this.model.data.loadingAuthors;
  }

  get shouldShowLoadingErrorMessage(): boolean {
    return this.model.data.loadingAuthorsFailed;
  }

  get shouldShowAuthorsList(): boolean {
    return this.model.data.authors !== null
      && this.model.data.authors.length > 0;
  }

  constructor(private authorsService: AuthorsManagementService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.bindSectionHeader();
    this.initAuthors();
    this.listenToAuthorsChanges();
  }

  ngOnDestroy() {
    if (!this.authorsChangesSubscription) { return; }
    this.authorsChangesSubscription.unsubscribe();
  }

  private bindSectionHeader() {
    if (this.model.sectionHeader.actionButtons.length === 0) { return; }
    this.model.sectionHeader.actionButtons[0].onClick = this.newAuthor.bind(this);
  }

  private initAuthors() {
    this.model.data.loadingAuthors = true;
    this.authorsService.getAuthors()
      .subscribe(response => this.handleAuthorsResponse(response));
  }

  private listenToAuthorsChanges() {
    this.authorsChangesSubscription = this.authorsService.authorsHasChanged
      .subscribe(authors => this.handleAuthorsChanges(authors));
  }

  private newAuthor() {
    const mode = ManagementAuthorFormMode.Creation;
    const config = ManagementAuthorsListManager.AuthorFormDialogData(mode);
    this.dialog.open(ManagementAuthorFormComponent, config);
  }

  private handleAuthorsResponse(response: AuthorsResponseInterface) {
    if (!response.succeed) {
      this.model.data.loadingAuthors = false;
      return;
    }

    this.model.data.authors = response.data
      .map(author => new AuthorModel(author));
    this.model.data.loadingAuthors = false;
  }

  private handleAuthorsChanges(authors: AuthorInterface[]) {
    this.model.data.authors = authors.map(author => new AuthorModel(author));
  }

  editAuthorHandler(authorId: string) {
    const mode = ManagementAuthorFormMode.Edition;
    const author = ManagementAuthorsListManager.AuthorById(authorId);
    if (!author) { return; }

    const config = ManagementAuthorsListManager.AuthorFormDialogData(mode, author);
    this.dialog.open(ManagementAuthorFormComponent, config);
  }

}
