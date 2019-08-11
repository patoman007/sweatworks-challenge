import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatNativeDateModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';

import { DateInputComponent } from './date-input/date-input.component';
import { FormInputComponent } from './form-input/form-input.component';
import { HiddenInputComponent } from './hidden-input/hidden-input.component';
import { SelectInputComponent } from './select-input/select-input.component';
import { TextInputComponent } from './text-input/text-input.component';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatOptionModule,
  MatSelectModule,
];

const COMPONENTS = [
  DateInputComponent,
  FormInputComponent,
  HiddenInputComponent,
  SelectInputComponent,
  TextInputComponent
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class FormModule { }
