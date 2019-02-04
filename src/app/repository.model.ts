import { Product } from './product.model';
import { SimpleDataSource } from './datasource.model';

export class Model {
  private dataSource: SimpleDataSource;
  private products: Product[];
  private locator = (p: Product, id: number) => p.id === id;

  constructor() {
    this.dataSource = new SimpleDataSource();
    this.products = new Array<Product>();
    this.dataSource.getData().forEach(element => this.products.push(element));
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product {
    return this.products.find(p => this.locator(p, id));
  }

  saveProduct(product: Product) {
    // tslint:disable-next-line:triple-equals
    if (product.id == 0 || product.id == null) {
      product.id = this.generateID();
      this.products.push(product);
    } else {
      // tslint:disable-next-line:prefer-const
      let index = this.products.findIndex(p => this.locator(p, product.id));
      this.products.splice(index, 1, product);
    }
    // this.products.push(product);
  }

  deleteProduct(id: number) {
    // tslint:disable-next-line:prefer-const
    let index = this.products.findIndex(p => this.locator(p, id));
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

  private generateID(): number {
    let candidate = 100;
    while (this.getProduct(candidate) !== null) {
      candidate++;
    }
    return candidate;
  }
}
