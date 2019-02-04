
import { Component, Input } from '@angular/core';

import { Model } from './repository.model';
import { Product } from './product.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'paProductTable',
  templateUrl: 'productTable.component.html'
})
export class ProductTableComponent {

  // tslint:disable-next-line:no-inferrable-types
  showTable: boolean = true;

  // tslint:disable-next-line:no-input-rename
  @Input('model')
  dataModel: Model;

  getProduct(key: number): Product {
    return this.dataModel.getProduct(key);
  }

  getProducts(): Product[] {
    return this.dataModel.getProducts();
  }

  deleteProduct(key: number) {
    this.dataModel.deleteProduct(key);
  }


}
