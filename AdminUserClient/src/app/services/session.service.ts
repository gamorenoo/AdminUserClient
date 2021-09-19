import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SessionService {

  public SessionObservable: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  dataSession = 'dataSession';
  constructor() { }
  get session(): User {
    const data = localStorage.getItem(this.dataSession);
    if (data && data !== '') {
      return JSON.parse(atob(data));
    }
    return null;
  }
  set session(value: User) {
    if (value) {
      const data = btoa(JSON.stringify(value));
      localStorage.setItem(this.dataSession, data);
    }
  }

  clean() {
    localStorage.removeItem(this.dataSession);
    setTimeout(() => {
      try {
        window.parent.postMessage(
          { eventName: 'logout' },
          '*'
        );
      } catch (err) {
        console.log('Se ha cerrado la sesión');
      }
    }, 300);
  }

  validateSession() {
    if(this.session === null || this.session === undefined) {
      return this.clean();
    }
  }
}
