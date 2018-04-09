import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
/* import * as $ from 'jquery';
 */

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {


  title = 'pictionary';
  constructor(public afAuth: AngularFireAuth) {
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit() {
    /* $(document).ready(function () {
      $('.buttonnext').click(function () {
        $('.contlogin').css({ transform: "translate(0%,0%)" });
      });
      $('.buttongohome').click(function () {
        $('.contlogin').css({ transform: 'translate(0%,-100%)' });
      });
    }); */
  }

}
