import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category;

  constructor(categoryService: CategoryService) {

    
    this.categories$ = categoryService.getAll().snapshotChanges().pipe(
      map(res => res.map(c => ({ key: c.payload.key, ...c.payload.val() as {}   
    }))));

   }

  ngOnInit(): void {
  }

}
