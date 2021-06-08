import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent } from 'rxjs';

@UntilDestroy()
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'textarea',
})
export class AutosizeTextareaDirective implements OnInit, AfterViewInit {
  @Input() autoHidden: boolean;
  @Input() scrollBlock: HTMLElement;

  get textarea(): HTMLTextAreaElement {
    return this.element.nativeElement;
  }

  constructor(private element: ElementRef, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.adjust();
  }

  ngAfterViewInit(): void {
    this.adjust();

    if (this.autoHidden) {
      let isHidden = false;
      let oldHeight = this.textarea.offsetHeight;

      fromEvent(this.scrollBlock, 'scroll')
        .pipe(untilDestroyed(this))
        .subscribe((res: Event) => {
          const el = res.target as HTMLElement;

          if (oldHeight !== this.textarea.offsetHeight && !isHidden) {
            oldHeight = this.textarea.offsetHeight;
          }

          if (el?.scrollTop > 80 && !isHidden) {
            this.textarea.style.height = '50px';
            isHidden = true;
          }

          if (!el?.scrollTop && isHidden && this.textarea.offsetHeight === 50) {
            this.textarea.style.height = oldHeight + 'px';
            isHidden = false;
          }
          this.cd.detectChanges();
        });
    }
  }

  @HostListener('input', ['$event.target'])
  onInput(): void {
    this.adjust();
  }

  public adjust(): void {
    const ta = this.element.nativeElement;
    ta.style.overflow = 'hidden';
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight ? ta.scrollHeight + 'px' : 'auto';
    this.cd.detectChanges();
  }
}
