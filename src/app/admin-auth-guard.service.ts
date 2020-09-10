import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }
 
  canActivate(): boolean{
      /* todo */
     
    let a;
    
    this.auth.user$.subscribe(dat => { 
      console.log('a', dat.uid);
      this.userService.getIsAdmin(dat.uid).subscribe( adminFlag => a = adminFlag)});
                          
    console.log(a);
    return a;

  }





 
  
}
