import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }
 
  canActivate(): boolean{
      /* todo */
   /*  this.auth.user$.pipe(map(user  =>  this.userService.get(user.uid)).subscribe(a => console.log('gggg', a)); */
  /*   this.auth.user$.pipe(map(user  =>  console.log('aaaa', user)));  */
/*     this.userService.get('4zmNR9Z3qVOctWcMyPnFVu4nFRz1').subscribe( a => console.log(a)) */
    return true;

    
 

   
  }
 




 
  
}
