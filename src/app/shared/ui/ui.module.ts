import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatProgressBarModule } from '@angular/material';

import { AlertMessageComponent } from './alert-message/alert-message.component';
import { ButtonComponent } from './button/button.component';
import { CubeSpinnerComponent } from './cube-spinner/cube-spinner.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SectionHeaderComponent } from './section-header/section-header.component';

import { UiHoverableDirective } from './hoverable/ui-hoverable.directive';

const COMPONENTS = [
  AlertMessageComponent,
  ButtonComponent,
  CubeSpinnerComponent,
  PaginatorComponent,
  ProgressBarComponent,
  SearchBarComponent,
  SectionHeaderComponent
];

const DIRECTIVES = [
  UiHoverableDirective
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  declarations: [...COMPONENTS, ...DIRECTIVES],
  exports: [...COMPONENTS, ...DIRECTIVES]
})
export class UiModule { }
