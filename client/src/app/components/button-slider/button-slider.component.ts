import { Component, Input, ViewChild } from '@angular/core';
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
  @Input()
  ngModel: number | undefined;
  @Input()
  ngModelChange:( void) | undefined;

  increaseSlider() {
    if (this.ngModel && this.increment) {
      this.ngModel += this.increment;
    }
  }

  decreaseSlider() {
    if (this.ngModel && this.increment) {
      this.ngModel -= this.increment;
    }
  }
}
