import {
  Directive,
  Input,
  Renderer2,
  ElementRef,
  HostListener,
  HostBinding,
} from '@angular/core';
@Directive({
  selector: '[appDropDown]',
})
export class DropDownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleOpen(eventData: Event) {
    this.isOpen = !this.isOpen;
  }
}
