import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import{ Observable } from 'rxjs/Observable';
import * as jQuery from 'jquery';

>>>>>>> dev

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

<<<<<<< HEAD
  constructor() { }

  ngOnInit() {
  }

}
=======
  title = "pictionary";
  constructor(public afAuth: AngularFireAuth) {
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit() {
    $(document).ready(function(){
      $('.buttonnext').click(function(){
        $('.contlogin').css({"transform" : "translate(0%,0%)"});
      });
      $('.buttongohome').click(function(){
        $('.contlogin').css({"transform" : "translate(0%,-100%)"});
      });
    })
  }

}
>>>>>>> dev
