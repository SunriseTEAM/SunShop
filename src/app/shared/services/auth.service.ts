import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

import { User } from "../models/user";
import { UserService } from "./user.service";
import {JwtHelperService} from "@auth0/angular-jwt";

export const ANONYMOUS_USER: User = new User();

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  private subject = new BehaviorSubject<User>(undefined);

  user$: Observable<User> = this.subject
    .asObservable()
    .pipe(filter((user) => !!user));



  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService,
    public jwtHelper: JwtHelperService
  ) {
    this.user = firebaseAuth.authState;

    this.user.subscribe((user) => {
      if (user) {
        this.userService
          .isAdmin(user.email)
          .snapshotChanges()
          .subscribe((data) => {
            data.forEach((el) => {
              const y: any = el.payload.toJSON();
            });
          });
      } else {
        this.subject.next(ANONYMOUS_USER);
      }
    });
  }
  public isAuthenticated(): boolean {

    const token = localStorage.getItem('token');

    // Check whether the token is expired and return
    // true or false
    return !!token;
  }

  logout() {
    this.firebaseAuth.signOut().then((res) => {
      this.subject.next(ANONYMOUS_USER);
      this.router.navigate(["/"]);
    });
  }

  createUserWithEmailAndPassword(emailID: string, password: string) {
    return this.firebaseAuth.createUserWithEmailAndPassword(emailID, password);
  }

  signInRegular(email: string, password: string) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    return this.firebaseAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }
}
