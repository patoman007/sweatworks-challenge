import {
  AbstractControlOptions,
  FormControl,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { formInputType } from './form-input.type';

import { FormInputInterface } from './form-input.interface';
import { SelectOptionInterface } from '../select-input/select-option.interface';

export class FormInputManager {

  static From(type: formInputType,
              name: string,
              control: FormControl,
              placeholder: string = '',
              errorMessage: string = '',
              hintMessage: string = '',
              inputType?: string,
              selectOptions?: SelectOptionInterface[]): FormInputInterface {
    return {
      type,
      name,
      control,
      placeholder,
      errorMessage,
      hintMessage,
      inputType,
      selectOptions
    };
  }

  static Control(validators: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
                 formState: any = ''): FormControl {
    return new FormControl(formState, validators);
  }

  static RequiredControl(formState: any = ''): FormControl {
    return FormInputManager.Control([Validators.required], formState);
  }

}
