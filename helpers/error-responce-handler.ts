import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { throwError } from 'rxjs';
import { focusFirstInvalidField } from './focus-first-invaild-field';
import { handleFormHttpError } from './handle-form-http-error';

export function httpErrorResponceHandler(
  res: HttpErrorResponse,
  form?: FormGroup
) {
  if (form && res.status === 422) {
    handleFormHttpError(form, res);
    focusFirstInvalidField(document.getElementsByTagName('form')[0]);
  }
  // todo if form not provided show nottification
  return throwError(res);
}
