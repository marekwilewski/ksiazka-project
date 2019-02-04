import { Input, Output, EventEmitter, Directive,
    HostBinding, HostListener, SimpleChange } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'input[paModel]',
    exportAs: 'paModel'
})
// tslint:disable-next-line:directive-class-suffix
export class PaModel {

    // tslint:disable-next-line:no-inferrable-types
    direction: string = 'None';

    // tslint:disable-next-line:no-input-rename
    @Input('paModel')
    modelProperty: string;

    @HostBinding('value')
    // tslint:disable-next-line:no-inferrable-types
    fieldValue: string = '';

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnChanges(changes: { [property: string]: SimpleChange }) {
        // tslint:disable-next-line:prefer-const
        let change = changes['modelProperty'];
        if (change.currentValue !== this.fieldValue) {
            this.fieldValue = changes['modelProperty'].currentValue || '';
            this.direction = 'Model';
        }
    }

    // tslint:disable-next-line:no-output-rename
    @Output('paModelChange')
    update = new EventEmitter<string>();

    @HostListener('input', ['$event.target.value'])
    updateValue(newValue: string) {
        this.fieldValue = newValue;
        this.update.emit(newValue);
        this.direction = 'Element';
    }
}
