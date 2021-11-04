import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { share, map } from "rxjs/operators";

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private userSource = new BehaviorSubject<any>([]);
  public user$ = this.userSource.asObservable();

  private issuer = {
    login: "http://127.0.0.1:8000/api/auth/login",
    register: "http://127.0.0.1:8000/api/auth/register",
    refresh: "http://127.0.0.1:8000/api/auth/refresh",
  };
  constructor(
    public _firebaseAuth: AngularFireAuth,
    private http: HttpClient,
    public router: Router
  ) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe((user) => {
      if (user) {
        this.userDetails = user;
      } else {
        this.userDetails = null;
      }
    });
  }
  setToken(token) {
    localStorage.setItem("auth_token", token);
  }

  getToken() {
    return localStorage.getItem("auth_token");
  }

  // Verify the token
  isValidToken() {
    const token = this.getToken();

    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1
          ? true
          : false;
      }
    } else {
      return false;
    }
  }

  payload(token) {
    const jwtPayload = token.split(".")[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  removeToken() {
    localStorage.removeItem("auth_token");
  }

  public refreshToken = () => {
    console.log("refresh");
    return this.http
      .post<any>(`/api/auth/refresh`, {}, { withCredentials: true })
      .pipe(
        map((data) => {
          this.setToken(data.access_token);
          this.startRefreshTokenTimer(data.access_token);
          this.userSource.next(data.user);
          return data;
        })
      );
  };

  // helper methods

  private refreshTokenTimeout;

  private startRefreshTokenTimer(token) {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(token.split(".")[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 120 * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
  signupUser(value) {
    //your code for signing up the new user
    console.log(value);
    const body = {
      email: value.email,
      password: value.password,
    };
    const call = this.http.post<any>("/api/auth/register", value).pipe(share());
    return call;
  }

  signinUser(email: string, password: string) {
    //your code for checking credentials and getting tokens for for signing in user
    // return this._firebaseAuth.signInWithEmailAndPassword(email, password)
    const body = {
      email: email,
      password: password,
    };
    const call = this.http.post<any>("/api/auth/login", body).pipe(share());
    call.subscribe((data) => this.userSource.next(data.user));

    return call;
  }

  logout() {
    // this._firebaseAuth.signOut();
    this.router.navigate(["/logout"]);
  }

  isAuthenticated() {
    return true;
  }
}
