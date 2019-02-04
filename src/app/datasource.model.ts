import { Product } from './product.model';

export class SimpleDataSource {
  private data: Product[];

  constructor() {
    this.data = new Array<Product>(
      new Product(1, 'Kajak', 'Sporty wodne', 275),
      new Product(2, 'Kamizelka ratukowa', 'Sporty wodne', 48.95),
      new Product(3, 'Piłka', 'Piłka nożna', 19.50),
      new Product(4, 'Flagi narożne', 'Piłka nożna', 34.95),
      new Product(5, 'Czapka', 'Szachy', 16));
  }
  getData() {
    return this.data;
  }
}
