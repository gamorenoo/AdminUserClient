import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  showPopupCreateUser: boolean = false;
  listUsers: User[] = [];
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  newUser() {
    this.showPopupCreateUser = true;
  }

  onResultPopupCreateUser(e: boolean) {
    this.showPopupCreateUser = false;
    if(e == true) this.getUsers();
  }

  getUsers() {
    const result = this.userService.getAll().toPromise();
    result.then((response) => {
      this.listUsers = response as User[];
    });
  }

}
