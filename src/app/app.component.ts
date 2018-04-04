import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  /*   template: `
      <h1>Welcome to {{name}}</h1>
      <app-canvas></app-canvas>
    ` */
})
export class AppComponent {
  title = 'pictionary';
  random_word: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.random_word = db.collection('random_word').valueChanges();
  }
}
