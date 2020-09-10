import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ : Observable<firebase.User>;


  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }
  login(){
    /* store url for proper redirect */
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    console.log('aaa',returnUrl);
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.signOut();
  }

}
