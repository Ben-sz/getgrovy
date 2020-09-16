import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {Product} from './models/products';
import 'rxjs/add/operator/take';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  private create(){
   return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string){
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId(){
      
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
  
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }


  async addToCart(product: Product){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    
    item$.valueChanges().take(1).subscribe((item: any ) => {
    if (item == null) item$.set({ product: product, quantity: 1});
      else item$.update({ product: product,quantity: item.quantity + 1});

      console.log('subs', item)
    });
  }
}

