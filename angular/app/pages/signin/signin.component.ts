import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from './../../shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { TokenService } from '../../shared/services/token.service';
import { AuthStateService } from '../../shared/services/auth-state.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent {

  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new FormGroup({
    username: new FormControl([Validators.required]),
    password: new FormControl([Validators.required]),
    rememberMe: new FormControl(true)
  });


  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private token: TokenService,
    private authState: AuthStateService,
    private route: ActivatedRoute) {
  }

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

    this.authService.signinUser(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      result => {
        this.responseHandler(result);
      },
      error => {
        console.log('error: ' + error)
        this.isLoginFailed = true;
        this.spinner.hide();
     },() => {
        this.spinner.hide();
        this.authState.setAuthState(true);
        this.loginForm.reset()
        this.router.navigate(['app/page']);
      }
    );
  }
  // Handle response
  responseHandler(data){
    this.token.handleData(data.access_token);
  }

}
