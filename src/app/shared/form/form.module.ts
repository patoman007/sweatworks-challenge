import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';

import { DateInputComponent } from './date-input/date-input.component';
import { FormInputComponent } from './form-input/form-input.component';
import { SelectInputComponent } from './select-input/select-input.component';
import { TextInputComponent } from './text-input/text-input.component';

const COMPONENTS = [
  DateInputComponent,
  FormInputComponent,
  SelectInputComponent,
  TextInputComponent
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class FormModule { }
