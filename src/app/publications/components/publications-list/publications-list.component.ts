import { Component, OnInit } from '@angular/core';
import { PublicationsListManager } from './publications-list.manager';

import { PublicationModel } from '../publication/publication.manger';
import { PaginatorModel } from '../../../shared/ui/paginator/paginator.manager';


@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.scss']
})
export class PublicationsListComponent implements OnInit {

  data = PublicationsListManager.Data;

  get emptySearchResult(): boolean {
    return this.data.publicationsAreFiltered && this.data.filteredPublications.length === 0;
  }

  constructor() { }

  ngOnInit() {
    this.initSearch();
    this.initPublications();
  }

  private initSearch() {
    const searchText = this.handleSearchChange.bind(this);
    this.data.searchBar = PublicationsListManager.SearchBar(searchText);
  }

  private initPublications() {
    this.data.loadingPublications = true;
    window.setTimeout(() => {
      this.handlePublicationsResponse();
    }, 1200);
  }

  private handleSearchChange(value: string) {
    this.data.publicationsAreFiltered = value !== '';
    this.updateFilteredPublications(this.data.publications, value);
  }

  private handlePublicationsResponse() {
    const publicationsResponse = PublicationsListManager.FakeData();
    const publications = PublicationsListManager.PublicationFromResponse(publicationsResponse);

    this.data.publications = publications;
    this.data.displayedPublications = publications;
    this.data.loadingPublications = false;
  }

  private updateFilteredPublications(publications: PublicationModel[], filter: string) {
    if (!this.data.publicationsAreFiltered) {
      this.data.displayedPublications = publications;
      this.data.filteredPublications = [];
      return;
    }

    const filteredPublications = PublicationsListManager.FilteredPublications(publications, filter);
    if (filteredPublications.length === 0) {
      this.data.displayedPublications = [];
      return;
    }

    this.data.filteredPublications = filteredPublications;
    this.data.paginator = this.getPaginator(filteredPublications);
    this.updatePaginatedPublications();
  }

  private canUpdatePaginatedPublications() {
    return this.data.paginator && this.data.filteredPublications && this.data.filteredPublications.length > 0;
  }

  private updatePaginatedPublications() {
    this.data.displayedPublications = PublicationsListManager
      .DisplayedFilteredPublications(this.data.filteredPublications, this.data.paginator);
  }

  private getPaginator(filteredPublications: PublicationModel[]): PaginatorModel {
    const previousPage = this.previousPage.bind(this);
    const nextPage = this.nextPage.bind(this);
    const navigateToPage = this.navigateToPage.bind(this);
    return PublicationsListManager
      .Paginator(filteredPublications, previousPage, nextPage, navigateToPage);
  }

  private previousPage() {
    if (!this.canUpdatePaginatedPublications()) { return; }
    this.data.paginator.decrementCurrentPage();
    this.updatePaginatedPublications();
  }

  private nextPage() {
    if (!this.canUpdatePaginatedPublications()) { return; }
    this.data.paginator.incrementCurrentPage();
    this.updatePaginatedPublications();
  }

  private navigateToPage(pageNumber: number) {
    if (!this.canUpdatePaginatedPublications()) { return; }
    this.data.paginator.setCurrentPage(pageNumber);
    this.updatePaginatedPublications();
  }

}
