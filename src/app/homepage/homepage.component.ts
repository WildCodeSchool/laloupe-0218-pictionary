import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {


  title = 'pictionary';
  constructor(public authService : AuthService, public router: Router) {
  }

  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }

  ngOnInit() {

  }
}
