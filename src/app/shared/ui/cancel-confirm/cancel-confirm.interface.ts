import { ButtonInterface } from '../button/button.manager';

export interface CancelConfirmLabelsInterface {
  cancel: string;
  confirm: string;
}

export interface CancelConfirmButtonsInterface {
  cancel: ButtonInterface;
  confirm: ButtonInterface;
}

export interface CancelConfirmInterface {
  labels: CancelConfirmLabelsInterface;
  buttons: CancelConfirmButtonsInterface;
}
