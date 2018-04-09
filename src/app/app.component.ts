import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  /*   template: `
      <h1>Welcome to {{name}}</h1>
      <app-canvas></app-canvas>
    ` */
})
export class AppComponent {
  title = 'pictionary';
  randomWord: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.randomWord = db.collection('random_word').valueChanges();
  }
}
