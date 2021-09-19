import { Component, EventEmitter, Input, NgModule, OnInit, Output, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user';
import { DxFormComponent, DxFormModule, DxPopupModule, DxButtonModule, DxTemplateModule, DxScrollViewModule, DxTextBoxModule } from 'devextreme-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createusers',
  templateUrl: './createusers.component.html',
  styleUrls: ['./createusers.component.css']
})
export class CreateusersComponent implements OnInit {
  titlePopup = 'Agregar/Editar usuario';
  @ViewChild('form') form: DxFormComponent;
  @Input() showPopup = false;
  @Output() popupResult = new EventEmitter<boolean>(true);
  currentUser: User = new User();
  listRole: any  = [];

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
            this.showPopup = false;
            this.popupResult.emit(true);
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

  constructor() { }

  ngOnInit(): void {
    this.getRole();
  }

  getRole() {

  }

  validateForms(): boolean {
    if ( !this.form.instance.validate().isValid ) {
      return false;
    }

    return true;
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


