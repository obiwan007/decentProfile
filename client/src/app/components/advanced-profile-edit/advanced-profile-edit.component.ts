import { Component } from '@angular/core';
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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Exit, Limiter } from '../../models/profile';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-advanced-profile-edit',
  standalone: true,
  imports: [ProfileChartComponent,
    MatCardModule,
    RenderStepComponent,
    ProfileDetailsComponent, RenderStepComponent, RenderStepsComponent,
    AdvancedProfileEditComponent, BasicProfileEditComponent, MatButtonModule, MatSliderModule, CommonModule, FormsModule,
    ReactiveFormsModule,
    EditableComponent,
    ViewModeDirective,
    EditModeDirective,
    FocusableDirective,
    MatToolbarModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './advanced-profile-edit.component.html',
  styleUrl: './advanced-profile-edit.component.css'
})
export class AdvancedProfileEditComponent extends BasicProfileEditComponent {
  label1ForCondition() {
    return `${this.step?.exit?.type === 'pressure' ? 'Pressure' : 'Flow'} ${this.step?.exit?.condition === 'over' ? 'over' : 'below'}`
  }
  label2ForCondition() {
    return `${this.step?.exit?.type === 'pressure' ? 'bar' : 'ml/s'}`
  }
  enableExit($event: any) {
    console.log("Event:",
      $event);
    if ($event) {
      this.step!.exit = new Exit();
      this.step!.exit.condition = "under";
      this.step!.exit.type = "flow";
      this.step!.exit.value = 0;
    } else {
      this.step!.exit = undefined;
    }
    this.stepChanged(this.step!);
  }
  enableLimit($event: any) {
    console.log("Event:",
      $event);
    if ($event) {
      this.step!.limiter = new Limiter();
    } else {
      this.step!.limiter = undefined;
    }
    this.stepChanged(this.step!);
  }

  targetVolumeCountStart($event: any) {
    console.log("Ev:", $event);
  }

}
