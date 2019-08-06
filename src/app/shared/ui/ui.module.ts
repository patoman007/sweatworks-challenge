import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatProgressBarModule } from '@angular/material';

import { AlertMessageComponent } from './alert-message/alert-message.component';
import { ButtonComponent } from './button/button.component';
import { CubeSpinnerComponent } from './cube-spinner/cube-spinner.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { SectionHeaderComponent } from './section-header/section-header.component';

const COMPONENTS = [
  AlertMessageComponent,
  ButtonComponent,
  CubeSpinnerComponent,
  ProgressBarComponent,
  SectionHeaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class UiModule { }
