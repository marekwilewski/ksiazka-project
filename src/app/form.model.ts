import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LimitValidator } from './limit.formvalidator';


export class ProductFormControl extends FormControl {
  label: string;
  modelProperty: string;

  constructor(label: string, property: string, value: any, validator: any) {
    super(value, validator);
    this.label = label;
    this.modelProperty = property;
  }

  getValidationMessages() {
    // tslint:disable-next-line:prefer-const
    let messages: string[] = [];
    if (this.errors) {
      // tslint:disable:forin prefer-const
      for (let errorName in this.errors) {
        switch (errorName) {
          case 'required':
            messages.push(`Proszę podać wartoć w polu ${this.label}.`);
            break;
          case 'minlength':
            messages.push(`Wymagane jest podanie przynajmniej ${this.errors['minlength'].requiredLength} znaków.`);
            break;
            case 'maxlength':
            messages.push(`Można wprowadzić maksymalnie ${this.errors['maxlength'].requiredLength} znaków.`);
            break;
          case 'limit':
            messages.push(`Wartosć maksymalna wynosi ${this.errors['limit'].limit}.`);
            break;
          case 'pattern':
            messages.push(`Wprowadzone dane zawierają niedozwolone znaki.`);
            break;
        }
      }
    }
    return messages;
  }

}

export class ProductFormGroup extends FormGroup {
  constructor() {
    super({
      name: new ProductFormControl('Produkt', 'name', '', Validators.required),

      category: new ProductFormControl('Kategoria', 'category', '', Validators.compose([Validators.required,
      Validators.pattern('^[A-Za-z ]+$'), Validators.minLength(3), Validators.maxLength(10)])),

      price: new ProductFormControl('Cena', 'price', '',
      Validators.compose([Validators.required, LimitValidator.Limit(100), Validators.pattern('^[0-9\.]+$')]))
    });
  }

  get productControls(): ProductFormControl[] {
    return Object.keys(this.controls).map(k => this.controls[k] as ProductFormControl);
  }

  getFormValidationMessages(form: any): string[] {
    let messages: string[] = [];
    this.productControls.forEach(c => c.getValidationMessages().forEach(m => messages.push(m)));
    return messages;
  }
}
