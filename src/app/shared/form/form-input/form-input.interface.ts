import { FormControl } from '@angular/forms';
import { formInputType } from './form-input.type';
import { SelectOptionInterface } from '../select-input/select-option.interface';

export interface FormInputInterface {
  type: formInputType;
  name: string;
  control: FormControl;
  placeholder: string;
  inputType?: string;
  selectOptions?: SelectOptionInterface[];
  hintMessage?: string;
  errorMessage?: string;
}
