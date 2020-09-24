import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Order } from '../models/order';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{
  /* shipping: {name: string, addressLine1: string, addressLine2: string, city: string}; */
  shipping: any = {};
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;

  constructor(
              private shoppingCartService: ShoppingCartService,
              private orderService: OrderService,
              private authService: AuthService
     ) { }

  async ngOnInit(){
    let cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe(cart => this.cart = cart);
    this.authService.user$.subscribe(user => this.userId = user.uid)
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  placeOrder(){
    console.log(this.shipping)
    let order = new Order(this.userId, this.shipping, this.cart);

    this.orderService.storeOrder(order);
  }
  
}
