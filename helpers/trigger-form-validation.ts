import { FormControl, FormGroup } from '@angular/forms';

export function triggerFormValidation(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      triggerFormValidation(control);
    }
  });
}
