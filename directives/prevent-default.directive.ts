import { Directive, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[preventDefaultClick]',
})
export class PreventDefaultDirective {
  @HostListener('click', ['$event'])
  onClick(event) {
    event.preventDefault();
  }
}
