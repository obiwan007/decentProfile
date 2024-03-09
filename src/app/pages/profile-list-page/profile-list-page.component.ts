import { Component } from '@angular/core';
import { ProfilesListComponent } from '../../components/profiles-list/profiles-list.component';
import { Profile } from '../../models/profile';
import { ProfileDetailsComponent } from '../../components/profile-details/profile-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProfileServiceService } from '../../services/profile-service.service';
import { RenderStepsComponent } from '../../components/render-steps/render-steps.component';
import { ProfileChartComponent } from '../../components/profile-chart/profile-chart.component';

@Component({
  selector: 'app-profile-list-page',
  standalone: true,
  imports: [ProfilesListComponent, ProfileDetailsComponent,
    RenderStepsComponent,
    FlexLayoutModule, JsonPipe, MatButtonModule, MatCardModule, ProfileChartComponent],
  templateUrl: './profile-list-page.component.html',
  styleUrl: './profile-list-page.component.scss'
})
export class ProfileListPageComponent {
  selectedProfile: Profile | undefined;
  /**
   *
   */
  constructor(
    private _profileSrv: ProfileServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) {
    console.log("params", activatedRoute.snapshot.queryParams)
    const { id } = activatedRoute.snapshot.queryParams;
    if (id) {
      this._profileSrv.getProfileById(id).then(p => {
        this.selectedProfile = p;
      });
    }
  }
  onClick(row: Profile) {
    console.log("Row selected", row)
    this.selectedProfile = row;
    const queryParams: Params = { id: row.id };

    const urlTree = this.router.createUrlTree([], {
      queryParams: queryParams,
      queryParamsHandling: "merge",
      preserveFragment: true
    });
    this.router.navigate([], {
      queryParams
    });

    // this.router.navigateByUrl(urlTree);
    // this.router.navigate(
    //   ['.'],
    //   {
    //     relativeTo: this.activatedRoute,
    //     queryParams,
    //     queryParamsHandling: 'merge', // remove to replace all query params by provided
    //   }
    // );
  }

}
