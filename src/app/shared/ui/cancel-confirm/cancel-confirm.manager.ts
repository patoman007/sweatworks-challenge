import { CancelConfirmInterface } from './cancel-confirm.interface';
import { ButtonManager } from '../button/button.manager';

export class CancelConfirmManager {

  static From(onConfirm: () => void, onCancel: () => void,
              confirmLabel: string = 'Ok', cancelLabel: string = 'Cancel'): CancelConfirmInterface {
    const confirmButton = ButtonManager.ConfirmButton(confirmLabel, onConfirm);
    const cancelButton = ButtonManager.CancelButton(cancelLabel, onCancel);

    return {
      labels: {
        confirm: confirmLabel,
        cancel: cancelLabel
      },
      buttons: {
        confirm: confirmButton,
        cancel: cancelButton
      }
    };
  }

}
