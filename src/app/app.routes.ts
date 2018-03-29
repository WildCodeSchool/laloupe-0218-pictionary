import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';


export const router: Routes = [
{ path: '', redirectTo: 'app', pathMatch: 'full' },
{ path: '', component: HomepageComponent },
{ path: 'canvas', component: CanvasComponent },
{ path: 'loginpage', component: LoginpageComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
