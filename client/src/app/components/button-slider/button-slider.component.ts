import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-button-slider',
  standalone: true,
  imports: [MatSliderModule, FormsModule, MatIconModule],
  templateUrl: './button-slider.component.html',
  styleUrl: './button-slider.component.scss'
})
export class ButtonSliderComponent extends MatSliderModule {
  @Input()
  min: number | undefined;
  @Input()
  max: number | undefined;
  @Input()
  increment: number | undefined;
  @Input()
  title: String | undefined;
  @Input()
  unit: String | undefined;
  @Input('model')
  model: number | undefined;
  @Output()
  modelChange: EventEmitter<number> = new EventEmitter<number>();

  increaseSlider() {
    if (this.model && this.increment) {
      this.model = parseFloat((this.model + this.increment).toFixed(10));
      this.modelChange.emit(this.model);
    }
  }

  decreaseSlider() {
    if (this.model && this.increment) {
      this.model = parseFloat((this.model - this.increment).toFixed(10));
      this.modelChange.emit(this.model);
    }
  }
  modelChanging() {
    this.modelChange.emit(this.model);
  }
}
