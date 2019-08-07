import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

import { SearchBarInterface } from './search-bar.manager';

@Component({
  selector: 'app-ui-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements AfterViewInit, OnDestroy {

  private inputSubscription: Subscription;

  @Input()
  model: SearchBarInterface;

  @ViewChild('searchInput', { static: false })
  searchInput: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    const search$ = fromEvent<any>(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        startWith(''),
        debounceTime(this.model.debounceTime),
        distinctUntilChanged(),
      );

    this.inputSubscription = search$
      .subscribe(value => {
        this.model.searchTerm(value);
      });
  }

  ngOnDestroy(): void {
    if (!this.inputSubscription) { return; }
    this.inputSubscription.unsubscribe();
  }

}
