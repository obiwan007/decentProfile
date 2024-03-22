import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { Profile, Step } from '../../models/profile';
import { ProfileServiceService } from '../../services/profile-service.service';
import { ProfileChartComponent } from '../profile-chart/profile-chart.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdvancedProfileEditComponent } from '../advanced-profile-edit/advanced-profile-edit.component';
import { BasicProfileEditComponent } from '../basic-profile-edit/basic-profile-edit.component';
import { EditModeDirective } from '../editable/edit-mode.directive';
import { EditableComponent } from '../editable/editable.component';
import { FocusableDirective } from '../editable/focusable.directive';
import { ViewModeDirective } from '../editable/view-mode.directive';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';
import { RenderStepComponent } from '../render-step/render-step.component';
import { RenderStepsComponent } from '../render-steps/render-steps.component';

@Component({
  selector: 'app-d-flow-profile-edit',
  standalone: true,
  imports: [
    ProfileChartComponent,
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
  templateUrl: './d-flow-profile-edit.component.html',
  styleUrl: './d-flow-profile-edit.component.scss'
})
export class DFlowProfileEditComponent implements OnInit {
  dose = 16.0;
  extractionRatio = 2.5;
  @ViewChild('chart')
  chart!: ProfileChartComponent;

  @Input()
  profile: Profile | undefined;

  // @Input()
  // step: Step | undefined;

  @Output()
  changed: EventEmitter<Profile> = new EventEmitter();

  _profileService = inject(ProfileServiceService);

  updateExtractionRatio(){
    if (this.profile?.target_weight && this.profile?.target_weight != 0){
    this.extractionRatio = this.profile?.target_weight / this.dose;
    }
    else if (this.profile?.target_volume && this.profile?.target_volume != 0){
      this.extractionRatio = this.profile?.target_volume / this.dose;
    }
  }
  // onSelectedStep(step: Step) {
  //   this.step = step;
  // }

  save() {
    this._profileService.updateProfile(this.profile!);
  }

  stepChanged(step: Step) {
    console.log(this.chart);
    this.chart?.updateStep(step);
  }
  ngOnInit() {
    if (this.dose && (this.profile?.target_weight || this.profile?.target_volume)){
    this.updateExtractionRatio();
    }
  }
}
