import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[viewMode]',
    standalone: true,
})
export class ViewModeDirective {

    constructor(public tpl: TemplateRef<any>) { }

}