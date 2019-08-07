import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppService } from '../../app.service';

import { SidenavManager } from './sidenav.manager';
import { Subscription } from 'rxjs';
import { AuthorModel } from '../../publications/components/publication/publication.manger';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  private authorsSubscriptions: Subscription;

  model = SidenavManager.Data;

  get shouldShowLoadingAuthors(): boolean {
    return this.model.authors === null;
  }

  get shouldShowEmptyAuthorsMessage(): boolean {
    return this.model.authors !== null && this.model.authors.length === 0;
  }

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.listenToAuthorsChanges();
  }

  ngOnDestroy(): void {
    if (!this.authorsSubscriptions) { return; }
    this.authorsSubscriptions.unsubscribe();
  }

  private listenToAuthorsChanges() {
    this.authorsSubscriptions = this.appService.authors$
      .subscribe(authors => {
        this.model.authors = authors;
      });
  }

  tapOnAuthor(author: AuthorModel) {
    this.appService.authorSelected(author);
  }

}
