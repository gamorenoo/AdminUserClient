import { Component, OnInit } from '@angular/core';
import { Permision, User } from 'src/app/model/user';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { SharedService } from 'src/app/services/shared.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  showPopupCreateUser: boolean = false;
  listUsers: User[] = [];
  editionMode: boolean; 
  currentUser: User;
  userPermisions: Permision[] = [];
  constructor(
    private router: Router,
    private userService: UserService,
    private sharedService: SharedService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.getuserPermisions();
    if(!this.getPermisionViewUsers()) {
      this.router.navigate(['/dashboard']);
    }
    this.getUsers();
  }

  newUser() {
    this.currentUser = new User();
    this.editionMode = false; 
    this.showPopupCreateUser = true;
  }

  editUser(e: any, row: any) {
    this.currentUser = row.data;
    this.editionMode = true; 
    this.showPopupCreateUser = true;
  }

  async deleteUser(e: any, row: any) {
    if (confirm) {
      if (! await this.sharedService.confirm('Está seguro de eliminar este usuario?')) {
        return;
      }
    }

    try {
      this.currentUser = row.data;
      const result  = this.userService.delete(this.currentUser.code).toPromise();
      result.then((response) => {
        this.getUsers();
      });
    } catch(err) {
      console.error(err);
      
    }

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

  getuserPermisions() {
    let user = this.sessionService.session;
    user.role.permissionRoles.forEach(pr => {
      this.userPermisions.push(pr.permission);
    });
  }

  getPermisionEditUsers(): boolean {
    return this.userPermisions.filter( up => up.code == 'Editor' || up.code == 'Administrador').length > 0;
  }

  getPermisionCreateUsers(): boolean {
    return this.userPermisions.filter( up =>up.code == 'Administrador').length > 0;
  }
  
  getPermisionDeleteUsers(): boolean {
    return this.userPermisions.filter( up => up.code == 'Administrador').length > 0;
  }
  getPermisionViewUsers(): boolean {
    return this.userPermisions.filter( up => up.code == 'Asistente' || up.code == 'Editor' || up.code == 'Administrador').length > 0;
  }

}
