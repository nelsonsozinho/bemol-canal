import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Autentication } from 'src/app/model/autentication';
import { UserService } from 'src/app/services/user.service';
import { CurrentUser } from '../../model/current-user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  currentUser: CurrentUser;

  loading: Boolean;
  user = new Autentication();

  constructor(private userService: UserService,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar,
    private router: Router) {
  }

  ngOnInit() {
    this.createForm();
    this.loading = false;
    if(this.userService.isAuthenticated()) {
      this.redirectToHome();
    }
  }

  private redirectToHome() {
    this.router.navigate(['home']);
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(): void {
    this.loading = true;
    this.userService.login(this.user).subscribe((userAuthentication: CurrentUser) => {
      if(!userAuthentication.token) {
        this.toastr.error('Dados de acesso inválidos.');
        console.log("Falha ao logar! ")
      } else {
        this.userService.saveUserData(userAuthentication);
        this.currentUser = userAuthentication;
        // window.location.reload();
        this.redirectToHome();
      }
    }, err => {
      this.openSnackBar('Alerta: ' + err.error.error, 'OK');
      console.log('erro de autenticação=' + JSON.stringify(err));
      this.loading = false;
    });
  }

  cancelLogin() {
    this.user = new Autentication();
    window.location.href = '/login';
    window.location.reload();
  }

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
