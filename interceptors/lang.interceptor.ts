import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable()
export class LangInterceptor implements HttpInterceptor {
  constructor(private translateService: TranslateService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = req.headers;
    if (!req.headers.has('hl')) {
      headers = req.headers.set(
        'hl',
        this.translateService.currentLang || 'en'
      );
    }

    headers = headers.set('Accept', 'application/json');
    const cloneReq = req.clone({ headers });
    return next.handle(cloneReq);
  }
}
