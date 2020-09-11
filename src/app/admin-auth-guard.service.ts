import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }


  /* todo  */
/*   canActivate(): boolean{
          
   
    return true;

  }

 */

  canActivate() : Observable<boolean>{
     return this.auth.appUser$.pipe( map( appUser => appUser.isAdmin));
  }





 
  
}
