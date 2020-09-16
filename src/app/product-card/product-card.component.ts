import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/products';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{

  @Input ('product') product: Product;
  @Input ('show-action') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService ) { }

  addtoCart(product: Product){
    this.cartService.addToCart(product);

    
  }


  getQuantity(){
    if (!this.shoppingCart.items[this.product.key]) return 0;
    console.log('a', this.shoppingCart.items[this.product.key], this.product.key);
    let item = this.shoppingCart.items[this.product.key];
    console.log(item.quantity);
    return item.quantity

  }
}
