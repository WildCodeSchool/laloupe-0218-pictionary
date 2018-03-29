import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import{ Observable } from 'rxjs/Observable';

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
  title = "pictionary";
  constructor() {
}
}

