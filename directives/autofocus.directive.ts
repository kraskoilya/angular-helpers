import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private elRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    const el = this.elRef.nativeElement;
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      this.focus(el);
    } else {
      const nestedEl:
        | HTMLInputElement
        | HTMLTextAreaElement
        | null = el.querySelector('input, textarea');
      if (nestedEl) {
        this.focus(nestedEl);
      }
    }
  }

  focus(el: HTMLInputElement | HTMLTextAreaElement) {
    // Without timeout not working in some cases
    setTimeout(() => {
      el.focus();
    }, 0);
  }
}
