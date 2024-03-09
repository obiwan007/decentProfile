import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile, Step } from '../../models/profile';
import { RenderStepComponent } from '../render-step/render-step.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdvancedProfileEditComponent } from '../advanced-profile-edit/advanced-profile-edit.component';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';
import { RenderStepsComponent } from '../render-steps/render-steps.component';

@Component({
  selector: 'app-basic-profile-edit',
  standalone: true,
  imports: [RenderStepComponent, FlexLayoutModule, ProfileDetailsComponent, RenderStepComponent, RenderStepsComponent,
    AdvancedProfileEditComponent, BasicProfileEditComponent],
  templateUrl: './basic-profile-edit.component.html',
  styleUrl: './basic-profile-edit.component.scss'
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
