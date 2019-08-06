import { Directive, ElementRef, HostListener } from '@angular/core';
import Color from '../color.enum';

@Directive({
  selector: '[appUiHoverable]'
})
export class UiHoverableDirective {

  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight(Color.Hover);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlight();
  }

  constructor(private element: ElementRef) { }

  private highlight(color: Color = null) {
    this.element.nativeElement.style.backgroundColor = color;
  }

}
