import { Component, Output, EventEmitter } from '@angular/core';
import { ProductFormGroup } from './form.model';
import { Product } from './product.model';

@Component({
// tslint:disable-next-line:component-selector
selector: 'paProductForm',
templateUrl: 'productForm.component.html',
styleUrls: ['productForm.component.css']
})

export class ProductFormComponent {
form: ProductFormGroup = new ProductFormGroup();
newProduct: Product = new Product();
// tslint:disable-next-line:no-inferrable-types
formSubmitted: boolean = false;

// tslint:disable-next-line:no-output-rename
@Output('paNewProduct')
newProductEvent = new EventEmitter<Product>();

submitForm(form: any) {
  this.formSubmitted = true;
  if (form.valid) {
    this.newProductEvent.emit(this.newProduct);
    console.log(this.newProduct);
    this.newProduct = new Product();
    this.form.reset();
    this.formSubmitted = false;
  }
}

}
