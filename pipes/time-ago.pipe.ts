import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  constructor(private readonly translate: TranslateService) {}

  transform(value: string | Date | undefined, ...args: unknown[]): unknown {
    if (!value) {
      value = new Date();
    }
    if (typeof value !== 'object') {
      value = new Date(value);
    }
    const seconds = Math.floor(
      (new Date().getTime() - new Date(value).getTime()) / 1000
    );

    let interval = seconds / 31536000;

    if (interval > 1) {
      return (
        Math.floor(interval) + ' ' + this.translate.instant('COMMON.YEARS_AGO')
      );
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return (
        Math.floor(interval) + ' ' + this.translate.instant('COMMON.MONTHS_AGO')
      );
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return (
        Math.floor(interval) + ' ' + this.translate.instant('COMMON.DAYS_AGO')
      );
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return (
        Math.floor(interval) + ' ' + this.translate.instant('COMMON.HOURS_AGO')
      );
    }
    interval = seconds / 60;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        ' ' +
        this.translate.instant('COMMON.MINUTES_AGO')
      );
    }

    interval = seconds;
    if (interval < 0) {
      interval = 0;
    }
    return (
      Math.floor(interval) + ' ' + this.translate.instant('COMMON.SECONDS_AGO')
    );
  }
}
