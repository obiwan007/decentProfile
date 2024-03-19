import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
import { ProfileServiceService } from '../../services/profile-service.service';
import { EditableComponent } from '../editable/editable.component';
import { EditModeDirective } from '../editable/edit-mode.directive';
import { FocusableDirective } from '../editable/focusable.directive';
import { ViewModeDirective } from '../editable/view-mode.directive';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-basic-profile-edit',
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

  ],
  templateUrl: './basic-profile-edit.component.html',
  styleUrl: './basic-profile-edit.component.css'
})
export class BasicProfileEditComponent {

  @ViewChild('chart')
  chart!: ProfileChartComponent;

  @Input()
  profile: Profile | undefined;

  @Input()
  step: Step | undefined;

  @Output()
  changed: EventEmitter<Profile> = new EventEmitter();

  _profileService = inject(ProfileServiceService);

  onSelectedStep(step: Step) {
    this.step = step;
  }

  save() {
    this._profileService.updateProfile(this.profile!);
  }

  stepChanged(step: Step) {
    console.log(this.chart);
    this.chart?.updateStep(step);
  }
}
