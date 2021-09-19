import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  form: FormGroup;
  loading = false;
  submitted = false;
  msg = '';
  viewMsg = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sesionService: SessionService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.msg = 'Usuario o contraseña invalidos';
  }

  onSubmit() {
    this.submitted = true;
    this.viewMsg = false;

    // stop here if form is invalid
    if (this.form.invalid) {
      this.viewMsg = true;
      return;
    }

    const result: any = this.userService.login( this.form.value.code, this.form.value.password ).toPromise()
    result.then((response) => {
      console.log(response);
      this.user = response.user as User;
      this.user.token = response.token as string;
      if(this.user == null){
        this.viewMsg = true;
      } else {
        this.sesionService.session = this.user;
        this.viewMsg = false;
        this.router.navigate(['/dashboard']);
      }
      
    });
    result.catch((error) => console.error(error));
}

}
