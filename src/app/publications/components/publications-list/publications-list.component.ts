import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs';

import {
  PublicationInterface,
  PublicationModel,
  PublicationsManager
} from '../../../shared/publications/publications.manager';

import {
  PublicationsListManager,
  SortPublicationsBy
} from './publications-list.manager';

import {
  PublicationsSortManager
} from '../publications-sort/publications-sort.manager';

import { AppService } from '../../../app.service';
import { PublicationsService } from '../../services/publications.service';

import {
  PublicationFormComponent
} from '../publication-form/publication-form.component';

import {
  PublicationsResponseInterface
} from '../../../shared/publications/publications-response.manager';

import { AuthorModel } from '../../../shared/authors/authors.manager';

import {
  PaginatorModel
} from '../../../shared/ui/paginator/paginator.manager';

import {
  PublicationFormMode
} from '../publication-form/publication-form.manager';


@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.scss']
})
export class PublicationsListComponent implements OnInit, OnDestroy {

  private authorSelectionSubscription: Subscription;
  private publicationsChangesSubscription: Subscription;

  model = PublicationsListManager.Data;

  get shouldShowLoadingBar(): boolean {
    return this.model.data.loading;
  }

  get shouldShowLoadingErrorMessage(): boolean {
    return this.model.data.loadingError;
  }

  get shouldShowPublicationsList(): boolean {
    return this.model.data.publications !== null
      && this.model.data.publications.length > 0;
  }

  get shouldShowEmptyResultMessage(): boolean {
    return this.model.data.areFiltered
      && this.model.data.filtered.length === 0;
  }

  get shouldShowPaginator(): boolean {
    return this.model.data.areFiltered && this.model.paginator !== null;
  }

  constructor(private appService: AppService,
              private publicationsService: PublicationsService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.listenToAuthorSelection();
    this.bindSectionHeader();
    this.bindSearchBar();
    this.initPublications();
    this.listenToPublicationsChanges();
  }

  ngOnDestroy() {
    if (!this.authorSelectionSubscription) { return; }
    this.authorSelectionSubscription.unsubscribe();

    if (!this.publicationsChangesSubscription) { return; }
    this.publicationsChangesSubscription.unsubscribe();
  }

  private listenToAuthorSelection() {
    this.authorSelectionSubscription = this.appService.authorSelected$
      .subscribe(author => this.handleAuthorSelection(author));
  }

  private bindSectionHeader() {
    PublicationsListManager.UpdateSectionHeader(this.newPublication.bind(this));
  }

  private bindSearchBar() {
    PublicationsListManager.UpdateSearchBar(this.handleSearchChange.bind(this));
  }

  private initPublications() {
    this.model.data.loading = true;
    this.publicationsService.getPublications()
      .subscribe(res => this.handlePublicationsResponse(res));
  }

  private listenToPublicationsChanges() {
    this.publicationsChangesSubscription = this.publicationsService
      .publicationsHasChanged
      .subscribe(publications => {
        this.handlePublicationsChanges(publications);
      });
  }

  private handleAuthorSelection(author: AuthorModel) {
    const publications = this.model.data.publications;
    const title = author
      ? PublicationsListManager.UpdatedAuthorHeader(author)
      : this.model.labels.sectionHeader;

    this.model.sectionHeader.title = title;
    this.model.data.displayed = PublicationsListManager
      .PublicationsFilteredByAuthor(publications, author);
  }

  private handleSearchChange(value: string) {
    this.model.data.areFiltered = value !== '';
    this.updateFilteredPublications(this.model.data.publications, value);
  }

  private handlePublicationsResponse(response: PublicationsResponseInterface) {
    if (!response.succeed) {
      PublicationsListManager.UpdateLoadingPublicationsError(response.errorMessages);
      this.model.data.loading = false;
      return;
    }

    const publications = PublicationsManager.PublicationsFromResponse(response);
    this.model.data.publications = publications;
    this.model.data.displayed = publications;
    this.model.data.loading = false;
  }

  private handlePublicationsChanges(publications: PublicationInterface[]) {
    const updatedPublications = publications
      .map(updatedPublication => new PublicationModel(updatedPublication));

    this.model.data.publications = updatedPublications;
    this.model.data.filtered = [];
    this.model.data.displayed = updatedPublications;
  }

  private updateFilteredPublications(publications: PublicationModel[], filter: string) {
    if (!this.model.data.areFiltered) {
      this.model.data.filtered = [];
      this.model.data.displayed = publications;
      return;
    }

    const filteredPublications = PublicationsListManager
      .PublicationsFilteredByTitle(publications, filter);
    if (filteredPublications.length === 0) {
      this.model.data.filtered = [];
      this.model.data.displayed = [];
      return;
    }

    this.model.data.filtered = filteredPublications;
    this.model.paginator = this.getPaginator(filteredPublications);
    this.updatePaginatedPublications();
  }

  private canUpdatePaginatedPublications() {
    return this.model.paginator
      && this.model.data.filtered
      && this.model.data.filtered.length > 0;
  }

  private updatePaginatedPublications() {
    this.model.data.displayed = PublicationsListManager
      .DisplayedFilteredPublications(this.model.data.filtered, this.model.paginator);
  }

  private getPaginator(filteredPublications: PublicationModel[]): PaginatorModel {
    const previousPage = this.previousPage.bind(this);
    const nextPage = this.nextPage.bind(this);
    const navigateToPage = this.navigateToPage.bind(this);
    return PublicationsListManager
      .Paginator(filteredPublications, previousPage, nextPage, navigateToPage);
  }

  private newPublication() {
    const mode = PublicationFormMode.Creation;
    const config = PublicationsListManager.PublicationFormDialogData(mode);
    this.dialog.open(PublicationFormComponent, config);
  }

  private previousPage() {
    if (!this.canUpdatePaginatedPublications()) { return; }
    this.model.paginator.decrementCurrentPage();
    this.updatePaginatedPublications();
  }

  private nextPage() {
    if (!this.canUpdatePaginatedPublications()) { return; }
    this.model.paginator.incrementCurrentPage();
    this.updatePaginatedPublications();
  }

  private navigateToPage(pageNumber: number) {
    if (!this.canUpdatePaginatedPublications()) { return; }
    this.model.paginator.setCurrentPage(pageNumber);
    this.updatePaginatedPublications();
  }

  handleSort(sortBy: string) {
    const publications = this.model.data.displayed;
    this.model.data.displayed = PublicationsSortManager
      .SortPublications(publications, sortBy as SortPublicationsBy);
  }

  editPublicationHandler(publicationId: string) {
    const mode = PublicationFormMode.Edition;
    const publication = PublicationsListManager.PublicationById(publicationId);
    if (!publication) { return; }

    const config = PublicationsListManager
      .PublicationFormDialogData(mode, publication);
    this.dialog.open(PublicationFormComponent, config);
  }

}
