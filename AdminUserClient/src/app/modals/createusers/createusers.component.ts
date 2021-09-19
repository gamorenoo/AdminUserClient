import { Component, EventEmitter, Input, NgModule, OnInit, Output, ViewChild } from '@angular/core';
import { Role, User } from 'src/app/model/user';
import { DxFormComponent, DxFormModule, DxPopupModule, DxButtonModule, DxTemplateModule, DxScrollViewModule, DxTextBoxModule } from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import { RoleService } from 'src/app/services/role.service'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createusers',
  templateUrl: './createusers.component.html',
  styleUrls: ['./createusers.component.css']
})
export class CreateusersComponent implements OnInit {
  titlePopup = 'Agregar/Editar usuario';
  @ViewChild('form') form: DxFormComponent;
  @Input() showPopup = false;
  @Input() editionMode: boolean;
  @Input() listUsers: User[];
  @Input() currentUser: User;
  @Output() popupResult = new EventEmitter<boolean>(true);
  listRole: any  = [];
  viewMsg = false;
  msg = '';
  ro = false;
  toolbarPopupsCofig = {
    toolbar: 'bottom', location: 'center', widget: 'dxButton', visible: true
  };
  toolbarItemsPopup = [
    {
      ...this.toolbarPopupsCofig,
      options: {
        elementAttr: { class: 'btn btn-primary' },
        text: 'Aceptar',
        onClick: () => {
          console.log(this.currentUser)
          if ( this.validateForms() ) {
            this.saveUser();
          }
        }
      }
    },
    {
      ...this.toolbarPopupsCofig,
      options: {
        elementAttr: { class: 'btn btn-default' },
        text: 'Cancelar',
        onClick: () => {
          this.showPopup = false;
          this.popupResult.emit(false);
        }
      }
    }
  ];

  constructor(
    private roleService: RoleService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.viewMsg = false;
    this.getRole();
  }

  getRole() {
    const result = this.roleService.getAll().toPromise();
    result.then((response) => {
      this.listRole = response as Role[];
    });
  }

  validateForms(): boolean {
    if ( !this.form.instance.validate().isValid ) {
      return false;
    }

    if(this.listUsers.filter(u => u.code === this.currentUser.code).length > 0 && this.editionMode == false){
      this.msg = 'El usuario: ' + this.currentUser.code + ' ya esta registrado en la base de datos';
      this.viewMsg = true;
      return false;
    }
    this.viewMsg = true;
    return true;
  }

  saveUser(){
    try {
      const result  = this.userService.save(this.currentUser).toPromise();
      result.then((response) => {
        this.showPopup = false;
        this.popupResult.emit(true);
      });
    } catch(err) {
      this.msg = err;
      this.viewMsg = true;
    }
  }

  popupContentHeight = () => {
    return Math.round(window.innerHeight / 1.3);
  }

}

@NgModule({
  declarations: [
    CreateusersComponent
  ],
  exports: [
    CreateusersComponent
  ],
  imports: [
    CommonModule,
    DxPopupModule,
    DxFormModule,
    DxButtonModule,
    DxTemplateModule,
    DxScrollViewModule,
    DxTextBoxModule
  ]
})
export class CreateusersModule { }


