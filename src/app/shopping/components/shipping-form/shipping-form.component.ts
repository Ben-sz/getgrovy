import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { Order } from '../../../shared/models/order';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy{

  @Input('cart') cart: ShoppingCart;
  shipping: any = {};
  userSubscription: Subscription;
  userId: string;

 
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
) { }

  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)

  }

  async placeOrder(){
    let order = new Order(this.userId, this.shipping, this.cart);

    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success/', result.key]);

  }

  
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
}
