import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatToolbarModule
];

@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule { }
