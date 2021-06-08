import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substring',
})
export class SubstringPipe implements PipeTransform {
  transform(value: string, length: number = 25): any {
    if (value && value.length > length) {
      value = value.substring(0, length) + '...';
    }
    return value;
  }
}
