import { Component, OnInit } from '@angular/core';

import { AuthorModel, AuthorsManager } from '../../../shared/authors/authors.manager';
import { AuthorsListManager } from './authors-list.manager';

import { AuthorsService } from '../../../shared/authors/authors.service';
import { AppService } from '../../../app.service';

import { AuthorsResponseInterface } from '../../../shared/authors/authors-response.manager';


@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss']
})
export class AuthorsListComponent implements OnInit {

  model = AuthorsListManager.Data;

  get shouldShowLoadingAuthors(): boolean {
    return this.model.data.loading;
  }

  get shouldShowLoadingErrorMessage(): boolean {
    return this.model.data.loadingError;
  }

  get shouldShowAuthorsList(): boolean {
    return this.model.data.authors !== null
      && this.model.data.authors.length > 0;
  }

  constructor(private appService: AppService, private authorsService: AuthorsService) { }

  ngOnInit() {
    this.initAuthors();
  }

  private initAuthors() {
    this.model.data.loading = true;
    this.authorsService.getAuthors()
      .subscribe(res => this.handleAuthorsResponse(res));
  }

  private handleAuthorsResponse(response: AuthorsResponseInterface) {
    if (!response.succeed) {
      this.model.messages.authorsLoadedError.label = AuthorsListManager
        .UpdatedLoadedAuthorsErrorLabel(response.errorMessages);
      this.model.data.loadingError = true;
      this.model.data.loading = false;
      return;
    }

    this.model.data.authors = AuthorsManager.AuthorsFromResponse(response);
    this.model.data.loading = false;
  }

  tapOnAuthor(author: AuthorModel) {
    this.appService.authorSelected(author);
  }

}
