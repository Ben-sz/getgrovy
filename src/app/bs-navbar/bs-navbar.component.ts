import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser: AppUser;
 /*  shoppingCartItemCount: number; */
  cart$: Observable<ShoppingCart>;
 
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
    
   }


  logout() {
    this.auth.logout();
  }

  async ngOnInit(){
      /* to avoid infinite loop */
      this.auth.appUser$.subscribe(appUser => this.appUser = appUser );
      this.cart$ = await (await this.shoppingCartService.getCart());
      this.cart$.subscribe(a => console.log(a));

  }

}
