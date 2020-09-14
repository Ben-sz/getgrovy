import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {Product} from '../../models/products';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy{
  products$;
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll().snapshotChanges().pipe(
      map(res => res.map(c => ({ key: c.payload.key, ...c.payload.val() as {}   
    }))));

    this.products$.subscribe( dat => {this.filteredProducts = this.products = dat; console.log('gg',typeof(this.products), typeof(this.products$))});
   }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  filter(query: string){
    console.log(query);
    this.filteredProducts = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
  }

}
