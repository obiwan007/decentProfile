import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[editMode]',
    standalone: true,
})
export class EditModeDirective {
    constructor(public tpl: TemplateRef<any>) { }
}