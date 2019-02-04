import {
    Directive, ViewContainerRef, TemplateRef,
    Input, SimpleChange, IterableDiffer, IterableDiffers,
    ChangeDetectorRef, CollectionChangeRecord, DefaultIterableDiffer, ViewRef
} from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[paForOf]'
})
export class PaIteratorDirective {
    private differ: DefaultIterableDiffer<any>;
    private views: Map<any, PaIteratorContext> = new Map<any, PaIteratorContext>();

    constructor(private container: ViewContainerRef,
        private template: TemplateRef<Object>,
        private differs: IterableDiffers,
        private changeDetector: ChangeDetectorRef) {
    }

    @Input('paForOf')
    dataSource: any;

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        this.differ =
            <DefaultIterableDiffer<any>>this.differs.find(this.dataSource).create();
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngDoCheck() {
        // tslint:disable-next-line:prefer-const
        let changes = this.differ.diff(this.dataSource);
        if (changes != null) {
            changes.forEachAddedItem(addition => {
                // tslint:disable-next-line:prefer-const
                let context = new PaIteratorContext(addition.item,
                    addition.currentIndex, changes.length);
                context.view = this.container.createEmbeddedView(this.template,
                    context);
                this.views.set(addition.trackById, context);
            });
            let removals = false;
            changes.forEachRemovedItem(removal => {
                removals = true;
                // tslint:disable-next-line:prefer-const
                let context = this.views.get(removal.trackById);
                if (context != null) {
                    this.container.remove(this.container.indexOf(context.view));
                    this.views.delete(removal.trackById);
                }
            });
            if (removals) {
                let index = 0;
                this.views.forEach(context =>
                    context.setData(index++, this.views.size));
            }
        }
    }
}

class PaIteratorContext {
    index: number;
    odd: boolean; even: boolean;
    first: boolean; last: boolean;
    view: ViewRef;

    constructor(public $implicit: any,
            public position: number, total: number ) {
        this.setData(position, total);
    }

    setData(index: number, total: number) {
        this.index = index;
        // tslint:disable-next-line:triple-equals
        this.odd = index % 2 == 1;
        this.even = !this.odd;
        // tslint:disable-next-line:triple-equals
        this.first = index == 0;
        // tslint:disable-next-line:triple-equals
        this.last = index == total - 1;
    }
}

