import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../models/products';


@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent{

  @Input ('product') product: Product;
  @Input ('show-action') showActions = true;
  @Input('shopping-cart') shoppingCart;

  
  constructor( private cartService: ShoppingCartService){

  }
  addtoCart(){
    this.cartService.addToCart(this.product);
  
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }

  getQuantity(){
    /* if there is no shopping cart or no id with specific id return 0 */
    if (!this.shoppingCart || !this.shoppingCart.items[this.product.key]) return 0;

    let item = this.shoppingCart.items[this.product.key];
    return item.quantity
  }
}
