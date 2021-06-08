import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/client/src/environments/environment';
import { Observable } from 'rxjs';

/**
 * Prefixes all requests with `environment.backend`.
 */
@Injectable()
export class PrefixInterceptor implements HttpInterceptor {
  private readonly ignoredPaths = ['/assets/i18n/'];

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.ignoredPaths.some(path => request.url.startsWith(path))) {
      return next.handle(request);
    }
    if (
      request.url.startsWith('http://') ||
      request.url.startsWith('https://')
    ) {
      // Ignore absolute URL
      return next.handle(request);
    }

    const url = environment.api;

    const changedRequest = request.clone({
      url: url + request.url,
    });

    return next.handle(changedRequest);
  }
}
