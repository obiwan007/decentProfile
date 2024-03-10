import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileServiceService } from '../../services/profile-service.service';
import { Profile, ProfileType, Step } from '../../models/profile';
import { ProfileDetailsComponent } from '../../components/profile-details/profile-details.component';
import { RenderStepsComponent } from '../../components/render-steps/render-steps.component';
import { AdvancedProfileEditComponent } from '../../components/advanced-profile-edit/advanced-profile-edit.component';
import { BasicProfileEditComponent } from '../../components/basic-profile-edit/basic-profile-edit.component';

@Component({
  selector: 'app-profile-edit-page',
  standalone: true,
  imports: [ProfileDetailsComponent, RenderStepsComponent,
    AdvancedProfileEditComponent, BasicProfileEditComponent],
  templateUrl: './profile-edit-page.component.html',
  styleUrl: './profile-edit-page.component.css'
})
export class ProfileEditPageComponent {
  profile: Profile | undefined;

  flow = ProfileType.flow;
  advanced = ProfileType.advanced;
  pressure = ProfileType.pressure;
  currentStep: Step | undefined;
  /**
   *
   */
  constructor(private _profileSrv: ProfileServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) {

    const { id } = activatedRoute.snapshot.queryParams;
    if (id) {
      this._profileSrv.getProfileById(id).then(p => {
        this.profile = p;
      });
    }
  }

  onSelectedStep(step: Step) {
    this.currentStep = step;
  }
}
