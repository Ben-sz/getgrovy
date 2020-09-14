import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product : any = {};

  constructor(
    categoryService: CategoryService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) {
    this.categories$ = categoryService.getCategories().snapshotChanges();

    let id = this.route.snapshot.paramMap.get('id');

    if (id) this.productService.get(id).snapshotChanges().subscribe(p => {
                                                                                  this.product = p;
                                                                                  console.log("ggg", id, this.product.payload.val())});
   }


  save(product){
    console.log(product)
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }

}
