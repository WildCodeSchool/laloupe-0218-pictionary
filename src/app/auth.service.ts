import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthService {

  authId: string;
  name: string;

  constructor(private afAuth: AngularFireAuth) {
    this.authId = null;
    this.name = null;
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.authId = user.uid;
        this.name = user.displayName;
      } else {
        this.authId = null;
        this.name = null;
      }
    });
  }

  get authState() {
    return this.afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    this.authId = null;
    this.name = null;
  }
}
