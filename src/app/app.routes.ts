import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { MatchMakingComponent } from './match-making/match-making.component';


export const router: Routes = [
<<<<<<< HEAD
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: '', component: HomepageComponent },
  { path: 'canvas', component: CanvasComponent },
  { path: 'loginpage', component: LoginpageComponent },
  { path: 'match-making', component: MatchMakingComponent },
=======
    { path: '', redirectTo: 'app', pathMatch: 'full' },
    { path: '', component: HomepageComponent },
    { path: 'canvas/:id', component: CanvasComponent },
    { path: 'loginpage', component: LoginpageComponent },
    { path: 'match-making', component: MatchMakingComponent },
>>>>>>> random_word
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
