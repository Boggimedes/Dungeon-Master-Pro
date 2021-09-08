import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(public _firebaseAuth: AngularFireAuth, private http: HttpClient, public router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        }
        else {
          this.userDetails = null;
        }
      }
    );

  }

  signupUser(value) {
    //your code for signing up the new user
    console.log(value);
    const body =
    {
        email: value.email,
        password: value.password,
    };
    const call = this.http.post<any>('/api/auth/register', value).pipe(share());
    return  call;
  }

  signinUser(email: string, password: string) {
    //your code for checking credentials and getting tokens for for signing in user
    // return this._firebaseAuth.signInWithEmailAndPassword(email, password)
    const body =
    {
        email: email,
        password: password,
    };
    const call = this.http.post<any>('/api/auth/login', body).pipe(share());
    return  call;
  }

  logout() {
    // this._firebaseAuth.signOut();
    this.router.navigate(['/logout']);
  }

  isAuthenticated() {
    return true;
  }
}
