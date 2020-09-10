import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ : Observable<firebase.User>;


  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.au
  }
  login(){
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.signOut();
  }
}
