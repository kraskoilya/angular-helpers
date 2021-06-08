export function focusFirstInvalidField(
  el: HTMLElement | Document = document
): void {
  setTimeout(() => {
    const invalidElements: NodeListOf<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    > = el.querySelectorAll(
      'input.ng-invalid, textarea.ng-invalid, select.ng-invalid'
    );

    if (invalidElements.length > 0) {
      const firstEl = invalidElements[0];
      firstEl.focus();
    }
  }, 0);
}
