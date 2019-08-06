import { Alignment } from '../../alignment/alignment.enum';

export type alertMessageType = 'info' | 'success' | 'warn' | 'error';

export interface AlertMessageInterface {
  type: alertMessageType;
  alignment: Alignment;
  label: string;
}

export class AlertMessageManager {

  static AlertMessage(label: string,
                      type: alertMessageType = 'info',
                      alignment: Alignment = Alignment.Center): AlertMessageInterface {
    return { type, alignment, label };
  }

}
