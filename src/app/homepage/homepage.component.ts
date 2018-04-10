import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {


  title = 'pictionary';
  constructor(public afAuth: AngularFireAuth, public router: Router) {
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.router.navigate(['loginpage']);

  }
  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit() {

  }
}
