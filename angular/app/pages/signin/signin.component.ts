import { Component, ViewChild } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "./../../shared/auth/auth.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent {
  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new FormGroup({
    username: new FormControl([Validators.required]),
    password: new FormControl([Validators.required]),
    rememberMe: new FormControl(true),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {
    console.log("Construct");

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

    this.spinner.show(undefined, {
      type: "ball-triangle-path",
      size: "medium",
      bdColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      fullScreen: true,
    });

    this.authService
      .signinUser(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (result) => {
          console.log(result);
          this.responseHandler(result);
        },
        (error) => {
          console.log("error: " + error);
          this.isLoginFailed = true;
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
          this.loginForm.reset();
          this.router.navigate(["app/world/1/edit"]);
        }
      );
  }
  // Handle response
  responseHandler(data) {
    console.log("auth token set");
    this.authService.setToken(data.access_token);
    // this.authService.refreshToken();
  }
}
