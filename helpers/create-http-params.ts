import { HttpParams } from '@angular/common/http';

export function createHttpParams(params = {}): HttpParams {
  let httpParams: HttpParams = new HttpParams();

  if (!params) {
    return httpParams;
  }

  for (const [key, value] of Object.entries(params as {
    [key: string]: any;
  })) {
    if (Array.isArray(value)) {
      value.forEach(val => {
        // this filters undefined and null values
        if (val || val === 0) {
          httpParams = httpParams.append(
            // add braces if needed
            key.includes('[]') ? key : key + '[]',
            val
          );
        }
      });
    } else {
      // this filters undefined and null values
      if (value || value === 0) {
        httpParams = httpParams.set(key, value);
      }
    }
  }

  return httpParams;
}
