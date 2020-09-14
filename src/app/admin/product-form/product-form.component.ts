import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import 'rxjs/add/operator/take';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product : any = {};
  id;

  constructor(
    categoryService: CategoryService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) {
      /* pipe to get key and value */
      this.categories$ = categoryService.getAll().snapshotChanges().pipe(
        map(res => res.map(c => ({ key: c.payload.key, ...c.payload.val() as {}   
      }))));


    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) this.productService.get(this.id).snapshotChanges().take(1).subscribe(p => this.product = p.payload.val());
   }


  save(product){
    if (this.id) this.productService.update(this.id, product);
    else     this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if (confirm("Are you sure you want to delete this entry?")){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

  ngOnInit(): void {
  }

}
