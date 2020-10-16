import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { AppUser } from '../../../shared/models/app-user';
import { ShoppingCartItem } from '../../../shared/models/shopping-cart-item';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
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
      

  }

}
