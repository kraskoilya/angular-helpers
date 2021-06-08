import {
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';

@Directive({
  selector: '[appDeferLoad]',
})
export class DeferLoadDirective implements AfterViewInit, OnDestroy {
  @Input() self: boolean;
  /** root `Element`, parent container of elements */
  @Input() root: Element = null;
  @Output() appDeferLoad: EventEmitter<any> = new EventEmitter();
  @Output() appDeferLoadAlt: EventEmitter<any> = new EventEmitter();
  @ContentChildren('element') elements: QueryList<ElementRef>;
  private intersectionObserver: IntersectionObserver;
  private lastElement: Element;
  private firstElement: Element;

  /**
   * Construct a new directive for infinite scroll pagination.
   */
  constructor(private elRef: ElementRef) {}

  /**
   * A lifecycle hook in which `IntersectionObserver` is created.
   */
  ngAfterViewInit(): void {
    this.intersectionObserver = new IntersectionObserver(
      entries => {
        this.checkForIntersection(entries);
      },
      {
        root: this.root,
      }
    );
    if (this.self) {
      this.resubElement(this.elRef, this.elRef);
    } else {
      this.resubElement(this.elements.last, this.elements.first);
      this.elements.changes.subscribe((res: QueryList<ElementRef>) => {
        this.resubElement(res.last, res.first);
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }
  /**
   * Construct a private function that checking the element and resubscribe to the `IntersectionObserver`.
   *
   * @param element `ElementRef`
   */
  private resubElement(last: ElementRef, first: ElementRef) {
    if (!last || !first) {
      return;
    }

    if (this.lastElement) {
      this.intersectionObserver.unobserve(this.lastElement);
    }

    if (this.firstElement) {
      this.intersectionObserver.unobserve(this.firstElement);
    }

    this.lastElement = last.nativeElement;
    this.firstElement = first.nativeElement;
    this.intersectionObserver.observe(this.lastElement);
    this.intersectionObserver.observe(this.firstElement);
  }

  /**
   * Construct a private function that checking entries and emitting output event for load new elements.
   *
   * @param entries `Array<IntersectionObserverEntry>`.
   */
  private checkForIntersection(entries: Array<IntersectionObserverEntry>) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (this.checkIfIntersecting(entry, false)) {
        this.appDeferLoad.emit();
        if (this.self) {
          this.destroy();
        }
      }
      if (this.checkIfIntersecting(entry, true)) {
        this.appDeferLoadAlt.emit();
        if (this.self) {
          this.destroy();
        }
      }
    });
  }

  /**
   * Construct a private function that checking if the entry is the last element.
   *
   * @param entry `IntersectionObserverEntry`.
   *
   * @return `Boolean`.
   */
  private checkIfIntersecting(
    entry: IntersectionObserverEntry,
    first: boolean
  ) {
    return (
      entry.isIntersecting &&
      entry.target === (first ? this.firstElement : this.lastElement)
    );
  }

  /**
   * Construct a private function that stop observer from observing any mutation.
   */
  private destroy() {
    if (this.intersectionObserver) {
      if (this.lastElement) {
        this.intersectionObserver.unobserve(this.lastElement);
      }
      if (this.firstElement) {
        this.intersectionObserver.unobserve(this.firstElement);
      }
      this.intersectionObserver.disconnect();
    }
  }
}
