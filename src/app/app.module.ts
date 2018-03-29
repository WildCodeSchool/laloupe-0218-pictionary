<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

=======
>>>>>>> dev
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
<<<<<<< HEAD
import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
=======
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';
>>>>>>> dev


@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    HomepageComponent,
    LoginpageComponent,
    
=======
    HomepageComponent
>>>>>>> dev
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, " pictionary "),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
<<<<<<< HEAD
=======

>>>>>>> dev
  ],
  providers: [],
  bootstrap: [AppComponent]
})
<<<<<<< HEAD
export class AppModule {
      
 }
=======
export class AppModule { }
>>>>>>> dev
