import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { map } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import {Product} from './../models/products';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$;
  products: Product[] = [];
  filteredProducts: Product[]= [];
  category: string;
  /* cart: any; */
  cart$: Observable<ShoppingCart>;
  

  constructor( 
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute){

  
   }

   async ngOnInit(){
    this.cart$ = await this.shoppingCartService.getCart();
    console.log(this.cart$);
                    
    this.populateProducts();
                    
   }


   private populateProducts(){

    this.products$ = this.productService.getAll().snapshotChanges().pipe(
      map(res => res.map(c => ({ key: c.payload.key, ...c.payload.val() as {}   
    }))));
    this.products$.subscribe( dat => {this.filteredProducts = this.products = dat});
     this.route.queryParamMap.subscribe(params => {
      this.category  = params.get('category');
      this.applyFilter();
    }); 

   }

   private applyFilter(){
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category):
             this.products;
   }

   

 
}
