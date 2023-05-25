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
  @HostListener('document:click',['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }

  constructor(private elRef: ElementRef) {}
}
