import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile, Step } from '../../models/profile';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RenderStepComponent } from '../render-step/render-step.component';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-render-steps',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RenderStepComponent, MatListModule, MatIconModule],
  templateUrl: './render-steps.component.html',
  styleUrl: './render-steps.component.css'
})
export class RenderStepsComponent {
  @Input()
  profile: Profile | undefined;

  @Input()
  selectable: boolean = false;

  @Output()
  selected: EventEmitter<Step> = new EventEmitter();

  currentStep: Step | undefined;

  onSelected(step: any) {
    console.log("Step", step);
    this.currentStep = step;
    this.selected.emit(step);
  }

  ngOnInit() {
    this.currentStep = this.profile?.steps[0];
    this.selected.emit(this.currentStep);
  }
  addStep() {
    this.profile?.steps.push(new Step());
    this.profile?.steps.forEach((s, i) => s.index = i);
  }

  removeStep(step: Step) {
    this.profile?.steps.find((foundStep, index) => {
      if (foundStep.id === step.id) {
        this.profile?.steps.splice(index, 1);
        this.profile?.steps.forEach((s, i) => s.index = i);
        return true;
      }
      return null;
    });
  }
}
