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


  constructor(private cartService: ShoppingCartService ) { }

  addtoCart(product: Product){
    this.cartService.addToCart(product);

    
  }

}
