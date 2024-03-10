import { Component, Input } from '@angular/core';
import { PumpMode, Step } from '../../models/profile';

@Component({
  selector: 'app-render-step',
  standalone: true,
  imports: [],
  templateUrl: './render-step.component.html',
  styleUrl: './render-step.component.css'
})
export class RenderStepComponent {
  @Input()
  step: Step | undefined;

  getGoal() {
    let str = "";



    if (this.step && this.step?.exit) {

      const { type, condition, value } = this.step?.exit;

      if (type == "pressure") {
        str += value > 0 ? `Move on if pressure is ${condition} ${value} bar`
          : "";
      } else if (type == "pressure" && condition == "over") {
        str += value > 0 ? `Move on if pressure si under ${value} bar`
          : "";

      } else if (type == "flow") {
        str += value > 0
          ? `Move on if flow is ${condition} ${value} ml/s`
          : "";
      }
    }
    return str;

  }

  getTemp() {
    let str = "*";



    if (this.step) {
      str = `Set ${this.step.sensor} temperature to ${this.step.temperature} °C`;
    }
    return str;

  }

  getPour() {
    let str = "";
    const value = this.step?.exit?.value ?? 0;
    const limitFlow = value > 0
      ? `with a pressure limit of ${value} bar`
      : "";
    const limitPressure = value > 0
      ? `with a flow limit of ${value} ml/s`
      : "";

    if (this.step) {
      if (this.step.pump === PumpMode.flow)
        str += `Pour ${this.step.transition} at rate of ${this.step.flow} ml/s ${limitFlow}`;
      else if (this.step.pump === PumpMode.pressure)
        str += `Pressurize ${this.step.transition} to ${this.step.pressure} bar ${limitPressure}`;
    }
    return str;

  }

  getTime() {
    let str = "";

    const vol = this.step?.volume ?? 0 > 0 ? ` or ${this.step?.volume} ml` : "";

    if (this.step) {

      str = `For a maximum of ${this.step.seconds} seconds ${vol}`;

    }
    return str;

  }


}
