import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalErrorsService } from '../services/global-errors.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorGuard implements CanActivate {
  constructor(
    private globalErrorsService: GlobalErrorsService,
    private router: Router
  ) {}

  /**
   * Get a company by domain.
   * Further requsts contain's X-Company header with company id
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.globalErrorsService.isError) {
      this.router.navigate(['/']);
    }
    return this.globalErrorsService.isError;
  }
}
