import { Component } from '@angular/core';
import { ProfilesListComponent } from '../../components/profiles-list/profiles-list.component';
import { Profile } from '../../models/profile';
import { ProfileDetailsComponent } from '../../components/profile-details/profile-details.component';

import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProfileServiceService } from '../../services/profile-service.service';
import { RenderStepsComponent } from '../../components/render-steps/render-steps.component';
import { ProfileChartComponent } from '../../components/profile-chart/profile-chart.component';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatSelect, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FilterData } from '../../components/profiles-list/profiles-list-datasource';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-list-page',
  standalone: true,
  imports: [ProfilesListComponent, ProfileDetailsComponent,
    RenderStepsComponent, MatFormFieldModule, MatSelectModule, MatInputModule, MatHint,
    JsonPipe, MatButtonModule, MatCardModule, ProfileChartComponent,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './profile-list-page.component.html',
  styleUrl: './profile-list-page.component.css'
})
export class ProfileListPageComponent {

  selectedProfile: Profile | undefined;

  filter: FilterData = new FilterData();

  types: string[] = ["pressure", "flow", "advanced"];

  beverages: string[] = ["espresso", "filter", "pour-over", "tea_portafilter", "cleaning"];
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
      this._profileSrv.getProfileById(id).subscribe(p => {
        this.selectedProfile = p.data;
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
  filterForType($event: MatSelectChange) {
    console.log("event", $event)
    this.filter = structuredClone(this.filter);
    this.filter.typesFilter = [...$event.value];
  }
  filterForBeverage($event: MatSelectChange) {
    console.log("event", $event)
    this.filter = structuredClone(this.filter);
    this.filter.beverageFilter = [...$event.value];
  }
  onEdit() {

    const queryParams: Params = { id: this.selectedProfile?.id };

    const urlTree = this.router.createUrlTree(["profiles/edit"], {
      queryParams: queryParams,
      queryParamsHandling: "merge",
      preserveFragment: true
    });

    this.router.navigateByUrl(urlTree);
  }
}
