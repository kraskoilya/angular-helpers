import { Directive, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[stopPropagationClick]',
})
export class StopPropagationDirective {
  @HostListener('click', ['$event'])
  onClick(event) {
    event.stopPropagation();
  }
}
