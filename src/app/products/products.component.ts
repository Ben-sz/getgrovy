import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { map } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import {Product} from './../models/products';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;
  products: Product[] = [];
  filteredProducts: Product[]= [];
  category: string;

  constructor( 
    productService: ProductService,
    
    route: ActivatedRoute) {

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

   

 
}
