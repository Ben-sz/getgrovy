import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/products';


@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent{
  @Input ('product') product: Product;
  @Input('shopping-cart') shoppingCart;

  
  constructor( private cartService: ShoppingCartService){

  }
  addtoCart(){
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }


}
