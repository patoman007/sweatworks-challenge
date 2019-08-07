import { Component, OnDestroy, OnInit } from '@angular/core';
import { PublicationsListManager, SortPublicationsBy } from './publications-list.manager';

import { AuthorModel, PublicationModel } from '../publication/publication.manger';
import { PaginatorModel } from '../../../shared/ui/paginator/paginator.manager';
import { PublicationsService } from '../../services/publications.service';
import { PublicationsResponseInterface } from '../../../shared/publication/publications-response.manager';
import { AppService } from '../../../app.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.scss']
})
export class PublicationsListComponent implements OnInit, OnDestroy {

  private authorSelectionSubscription: Subscription;

  model = PublicationsListManager.Data;

  get shouldShowLoadingBar(): boolean {
    return this.model.publications.loading;
  }

  get shouldShowLoadingErrorMessage(): boolean {
    return this.model.publications.loadingError;
  }

  get shouldShowPublicationsList(): boolean {
    return this.model.publications.publications !== null
      && this.model.publications.publications.length > 0;
  }

  get shouldShowEmptyResultMessage(): boolean {
    return this.model.publications.areFiltered
      && this.model.publications.filtered.length === 0;
  }

  get shouldShowPaginator(): boolean {
    return this.model.publications.areFiltered && this.model.paginator !== null;
  }

  constructor(private appService: AppService, private publicationsService: PublicationsService) { }

  ngOnInit() {
    this.listenToAuthorSelection();
    this.bindSectionHeader();
    this.bindSearchBar();
    this.initPublications();
  }

  ngOnDestroy() {
    if (!this.authorSelectionSubscription) { return; }
    this.authorSelectionSubscription.unsubscribe();
  }

  private listenToAuthorSelection() {
    this.authorSelectionSubscription = this.appService.selectedAuthor$
      .subscribe(author => this.handleAuthorSelection(author));
  }

  private bindSectionHeader() {
    PublicationsListManager.UpdateSectionHeader(this.newPublication.bind(this));
  }

  private bindSearchBar() {
    PublicationsListManager.UpdateSearchBar(this.handleSearchChange.bind(this));
  }

  private initPublications() {
    this.model.publications.loading = true;
    this.publicationsService.getPublications()
      .subscribe(res => this.handlePublicationsResponse(res));
  }

  private handleAuthorSelection(author: AuthorModel) {
    const publications = this.model.publications.publications;
    this.model.sectionHeader.title = PublicationsListManager.UpdatedAuthorHeader(author);
    this.model.publications.displayed = PublicationsListManager
      .PublicationsFilteredByAuthor(publications, author);
  }

  private handleSearchChange(value: string) {
    this.model.publications.areFiltered = value !== '';
    this.updateFilteredPublications(this.model.publications.publications, value);
  }

  private handlePublicationsResponse(response: PublicationsResponseInterface) {
    if (!response.succeed) {
      PublicationsListManager.UpdateLoadingPublicationsError(response.errorMessages);
      this.model.publications.loading = false;
      return;
    }

    const publications = PublicationsListManager.PublicationFromResponse(response);
    const authors = PublicationsListManager.AuthorsFromResponse(response);
    this.model.publications.publications = publications;
    this.model.publications.displayed = publications;
    this.appService.updateAuthors(authors);
    this.model.publications.loading = false;
  }

  private updateFilteredPublications(publications: PublicationModel[], filter: string) {
    if (!this.model.publications.areFiltered) {
      this.model.publications.filtered = [];
      this.model.publications.displayed = publications;
      return;
    }

    const filteredPublications = PublicationsListManager.PublicationsFilteredByTitle(publications, filter);
    if (filteredPublications.length === 0) {
      this.model.publications.filtered = [];
      this.model.publications.displayed = [];
      return;
    }

    this.model.publications.filtered = filteredPublications;
    this.model.paginator = this.getPaginator(filteredPublications);
    this.updatePaginatedPublications();
  }

  private canUpdatePaginatedPublications() {
    return this.model.paginator
      && this.model.publications.filtered
      && this.model.publications.filtered.length > 0;
  }

  private updatePaginatedPublications() {
    this.model.publications.displayed = PublicationsListManager
      .DisplayedFilteredPublications(this.model.publications.filtered, this.model.paginator);
  }

  private getPaginator(filteredPublications: PublicationModel[]): PaginatorModel {
    const previousPage = this.previousPage.bind(this);
    const nextPage = this.nextPage.bind(this);
    const navigateToPage = this.navigateToPage.bind(this);
    return PublicationsListManager
      .Paginator(filteredPublications, previousPage, nextPage, navigateToPage);
  }

  private newPublication() {

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

  private handleSort(sortBy: string) {
    const publications = this.model.publications.displayed;
    this.model.publications.displayed = PublicationsListManager
      .SortPublications(publications, sortBy as SortPublicationsBy);
  }

}
