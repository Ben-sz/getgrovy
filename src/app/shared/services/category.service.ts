import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) {  }

/*   getCategories(){
    return this.db.list('/categories', {
      query: {
        orderByChild: 'name'
      }
    } ).valueChanges();
  }
 */

  getAll(){
    return this.db.list('/categories/');
  }
}
