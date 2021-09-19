import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  constructor(
    private router: Router,
    private sessionService: SessionService) {
    this.setSession(this.sessionService.session);
  }

  ngOnInit(): void {
  }

  setSession(user: User) {
    if (user == undefined  || user == null) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/dashboard']);
    }
    this.user = user;
  }

}
