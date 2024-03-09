import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile, Step } from '../../models/profile';
import { RenderStepComponent } from '../render-step/render-step.component';

import { AdvancedProfileEditComponent } from '../advanced-profile-edit/advanced-profile-edit.component';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';
import { RenderStepsComponent } from '../render-steps/render-steps.component';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ProfileChartComponent } from '../profile-chart/profile-chart.component';
@Component({
  selector: 'app-basic-profile-edit',
  standalone: true,
  imports: [ProfileChartComponent, MatCardModule, RenderStepComponent, ProfileDetailsComponent, RenderStepComponent, RenderStepsComponent,
    AdvancedProfileEditComponent, BasicProfileEditComponent, MatSliderModule, CommonModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './basic-profile-edit.component.html',
  styleUrl: './basic-profile-edit.component.css'
})
export class BasicProfileEditComponent {
  @Input()
  profile: Profile | undefined;

  @Input()
  step: Step | undefined;

  @Output()
  changed: EventEmitter<Profile> = new EventEmitter();


  onSelectedStep(step: Step) {
    this.step = step;
  }
}
