import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/products';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{

  @Input ('product') product: Product;
  @Input ('show-action') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService ) { }

  addtoCart(){
    this.cartService.addToCart(this.product);
  }


}
