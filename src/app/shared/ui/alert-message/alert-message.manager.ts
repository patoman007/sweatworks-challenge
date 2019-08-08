import Alignment from '../../alignment/alignment.enum';

export type alertMessageType = 'info' | 'success' | 'warn' | 'error';

export interface AlertMessageInterface {
  type: alertMessageType;
  alignment: Alignment;
  label: string;
}

export class AlertMessageManager {

  static From(label: string, type: alertMessageType, alignment: Alignment): AlertMessageInterface {
    return { label, type, alignment };
  }

  static InfoAlertMessage(label: string,
                          alignment: Alignment = Alignment.Center): AlertMessageInterface {
    return AlertMessageManager.From(label, 'info', alignment);
  }

  static SuccessAlertMessage(label: string,
                             alignment: Alignment = Alignment.Center): AlertMessageInterface {
    return AlertMessageManager.From(label, 'success', alignment);
  }

  static ErrorAlertMessage(label: string,
                           alignment: Alignment = Alignment.Center): AlertMessageInterface {
    return AlertMessageManager.From(label, 'error', alignment);
  }

}
