import { Component, ContentChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { ViewModeDirective } from './view-mode.directive';
import { EditModeDirective } from './edit-mode.directive';
import { Subject, filter, fromEvent, switchMapTo, take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editable',
  standalone: true,
  imports: [CommonModule, ViewModeDirective, EditModeDirective],
  templateUrl: './editable.component.html',
  styleUrl: './editable.component.scss'
})
export class EditableComponent {
  @ContentChild(ViewModeDirective) viewModeTpl!: ViewModeDirective;
  @ContentChild(EditModeDirective) editModeTpl!: EditModeDirective;
  @Output() update = new EventEmitter();

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  mode: 'view' | 'edit' = 'view';


  constructor(private host: ElementRef) {
  }

  ngOnInit() {
    this.viewModeHandler();
    this.editModeHandler();
  }

  toViewMode() {
    this.update.next(undefined);
    this.mode = 'view';
  }

  private get element() {
    return this.host.nativeElement;
  }

  private viewModeHandler() {
    fromEvent(this.element, 'click').pipe(
    ).subscribe(() => {
      this.mode = 'edit';
      this.editMode.next(true);
    });
  }

  private editModeHandler() {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }) => this.element.contains(target) === false),
      take(1)
    )

    this.editMode$.pipe(
      switchMapTo(clickOutside$),
    ).subscribe(event => this.toViewMode());
  }

  get currentView() {
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }

  ngOnDestroy() {
  }

}


