import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service'
import { User } from 'src/app//model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Administracion de usuarios';
  user: User;
  constructor(
    private router: Router,
    private sessionService: SessionService) {
    this.setSession(this.sessionService.session);
  }

  setSession(user: User) {
    if (user == undefined  || user == null) {
      this.router.navigate(['/login']);
    } /* else {
      this.router.navigate(['/dashboard']);
    } */
    this.user = user;
  }
}
