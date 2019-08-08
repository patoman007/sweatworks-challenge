import Color from '../color.enum';

export type buttonType = 'basic' | 'raised' | 'flat' | 'stroked' | 'icon' | 'fab' | 'mini-fab';

export interface ButtonInterface {
  type: buttonType;
  label: string;
  bgColor: Color;
  fontColor: Color;
  onClick: () => void;
}

export class ButtonManager {

  static Button(label: string,
                type: buttonType = 'basic',
                bgColor: Color = Color.White,
                fontColor: Color = Color.Black,
                onClick: () => void = () => {}): ButtonInterface {
    return { type, label, bgColor, fontColor, onClick };
  }

  static ConfirmButton(label: string, onClick: () => void): ButtonInterface {
    return ButtonManager.Button(label, 'raised', Color.Confirm, Color.White, onClick);
  }

  static CancelButton(label: string, onClick: () => void): ButtonInterface {
    return ButtonManager.Button(label, 'raised', Color.Cancel, Color.White, onClick);
  }

}
