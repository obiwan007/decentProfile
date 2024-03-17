import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[focusable]',
    standalone: true,
})
export class FocusableDirective {

    constructor(private host: ElementRef) { }

    ngAfterViewInit() {
        this.host.nativeElement.focus();
    }

}