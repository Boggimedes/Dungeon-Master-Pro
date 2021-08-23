import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorPageComponent } from "./error/error-page.component";
import {SigninComponent } from "./signin/signin.component";
import {SignupComponent } from "./signup/signup.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'error',
        component: ErrorPageComponent,
        data: {
          title: 'Error Page'
        }
      },
      {
        path: 'login',
        component: SigninComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'signup',
        component: SignupComponent,
        data: {
          title: 'Signup Page'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
