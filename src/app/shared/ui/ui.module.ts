import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { ButtonComponent } from './button/button.component';
import { CubeSpinnerComponent } from './cube-spinner/cube-spinner.component';
import { SectionHeaderComponent } from './section-header/section-header.component';

const COMPONENTS = [
  ButtonComponent,
  CubeSpinnerComponent,
  SectionHeaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class UiModule { }
