import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order){
    let result = await this.db.list('/order').push(order);
    this.shoppingCartService.clearCart();
    return result
  }

  getOrders() {
    return this.db.list('/order');
  }

  getOrdersByUser(userId: string){
    return this.db.list('/order', ref => ref.orderByChild('userId').equalTo(userId));
  }

}
