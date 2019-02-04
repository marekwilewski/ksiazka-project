import {
    Directive, SimpleChange, ViewContainerRef, TemplateRef, Input
} from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[paIf]'
})
export class PaStructureDirective {

    constructor(private container: ViewContainerRef,
        private template: TemplateRef<Object>) { }

    @Input('paIf')
    expressionResult: boolean;

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnChanges(changes: { [property: string]: SimpleChange }) {
        // tslint:disable-next-line:prefer-const
        let change = changes['expressionResult'];
        if (!change.isFirstChange() && !change.currentValue) {
            this.container.clear();
        } else if (change.currentValue) {
            this.container.createEmbeddedView(this.template);
        }
    }
}
