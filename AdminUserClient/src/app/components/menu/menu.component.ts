import { Component, OnInit } from '@angular/core';
import { User, Permision } from 'src/app/model/user';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: User;
  userPermisions: Permision[] = [];
  constructor(
    private sessionService: SessionService
  ) { 
    this.getuserPermisions();
  }

  ngOnInit(): void {
  }

  salir() {
    this.sessionService.clean();
  }

  getuserPermisions() {
    this.user = this.sessionService.session;
    this.user.role.permissionRoles.forEach(pr => {
      this.userPermisions.push(pr.permission);
    });
  }

  getPermisionViewUsers(): boolean {
    return this.userPermisions.filter( up => up.code == 'Asistente' || up.code == 'Editor' || up.code == 'Administrador').length > 0;
  }

}
