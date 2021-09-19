import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuardService {

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const isLoggedIn = !!this.sessionService.session;

    if (!this.sessionService.session) {
      this.router.navigate(['/redirect-external']);
      return false;
    }
    return true;
  }
}
