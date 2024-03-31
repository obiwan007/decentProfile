import { Component, OnInit } from '@angular/core';
import { BasicProfileEditComponent } from '../basic-profile-edit/basic-profile-edit.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EditModeDirective } from '../editable/edit-mode.directive';
import { EditableComponent } from '../editable/editable.component';
import { FocusableDirective } from '../editable/focusable.directive';
import { ViewModeDirective } from '../editable/view-mode.directive';
import { ProfileChartComponent } from '../profile-chart/profile-chart.component';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';
import { RenderStepComponent } from '../render-step/render-step.component';
import { RenderStepsComponent } from '../render-steps/render-steps.component';
import { Profile, ProfileType, PumpMode, SensorType, Step, TransitionMode } from '../../models/profile';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-advanced-profile-edit',
  standalone: true,
  imports: [ProfileChartComponent,
    MatCardModule,
    RenderStepComponent,
    ProfileDetailsComponent, RenderStepComponent, RenderStepsComponent,
    AdvancedProfileEditComponent, BasicProfileEditComponent, MatButtonModule, MatSliderModule, CommonModule, FormsModule,
    ReactiveFormsModule, MatInputModule,
    EditableComponent,
    ViewModeDirective,
    EditModeDirective,
    FocusableDirective,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggle,
  ],

  templateUrl: './advanced-profile-edit.component.html',
  styleUrl: './advanced-profile-edit.component.css'
})
export class AdvancedProfileEditComponent extends BasicProfileEditComponent {
  pumpMode = PumpMode;
  transitionMode = TransitionMode;
  moveOnChecked = false;
   
   override onSelectedStep(step: Step): void {
    this.step = step;
    if (this.step && this.step.exit){
      this.moveOnChecked = true;
    }
   }

}
