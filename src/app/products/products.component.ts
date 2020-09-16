import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { map } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import {Product} from './../models/products';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$;
  products: Product[] = [];
  filteredProducts: Product[]= [];
  category: string;
  cart: any;
  subscription: Subscription;
  

  constructor( 
    productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    route: ActivatedRoute){

    
    this.products$ = productService.getAll().snapshotChanges().pipe(
      map(res => res.map(c => ({ key: c.payload.key, ...c.payload.val() as {}   
    }))));
    this.products$.subscribe( dat => {this.filteredProducts = this.products = dat});

     route.queryParamMap.subscribe(params => {
      this.category  = params.get('category');
      this.filteredProducts = (this.category) ?
       this.products.filter(p => p.category === this.category):
                this.products;
    }); 
   }

   async ngOnInit(){
    this.subscription = (await this.shoppingCartService.getCart())
                    .valueChanges()
                    .subscribe( cart => {
                      this.cart = cart;
                      console.log('fb', this.cart)
                    });
   }

   ngOnDestroy(){
    this.subscription.unsubscribe();
   }
   

 
}
