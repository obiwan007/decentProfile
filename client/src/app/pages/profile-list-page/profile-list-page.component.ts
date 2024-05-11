import {Component, ViewChild} from '@angular/core';
import {ProfilesListComponent} from '../../components/profiles-list/profiles-list.component';
import {Profile} from '../../models/profile';
import {ProfileDetailsComponent} from '../../components/profile-details/profile-details.component';

import {JsonPipe} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProfileServiceService} from '../../services/profile-service.service';
import {RenderStepsComponent} from '../../components/render-steps/render-steps.component';
import {ProfileChartComponent} from '../../components/profile-chart/profile-chart.component';
import {MatFormFieldModule, MatHint} from '@angular/material/form-field';
import {MatSelect, MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FilterData} from '../../components/profiles-list/profiles-list-datasource';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {FavoritesService} from '../../services/favorites.service';
import {Subscription, filter, map} from 'rxjs';
import {Favorite} from '../../models/favorite';
import {where} from 'firebase/firestore';

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


  @ViewChild('profileList')
  profileList: ProfilesListComponent | undefined;

  selectedProfile: Profile | undefined;

  filter: FilterData = new FilterData();

  types: string[] = ["pressure", "flow", "advanced"];

  beverages: string[] = ["espresso", "filter", "pour-over", "tea_portafilter", "cleaning"];

  subs: Subscription[] = [];
  favorites: Favorite[] = [];
  isFavorite: boolean = false;
  _favorites: Favorite[] = [];
  favorite: Favorite | undefined;
  /**
   *
   */
  constructor(
    private _favoritesSrv: FavoritesService,
    private _profileSrv: ProfileServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) {
    console.log("params", activatedRoute.snapshot.queryParams)
    const {id} = activatedRoute.snapshot.queryParams;
    if (id) {
      this._profileSrv.getProfileById(id).subscribe(p => {
        this.selectedProfile = p.data;
        this._selectedFavorite();
      });
    }

    this.subs.push(
      _favoritesSrv.favorites()
        .pipe(
        // map((data) => data.filter(x => x.profile_id == id))
      ).subscribe(f => {
        this._favorites = f;
        this._selectedFavorite();

      }));
  }




  private _selectedFavorite() {
    this.favorite = this._favorites.find(fav => fav.profile_id === this.selectedProfile?.id);
    this.isFavorite = !!this.favorite;
  }

  ngOnDestroy() {this.subs.forEach(s => s.unsubscribe());}

  /**
 * Toggles the current profile's favorite status.
 * If the selected profile is already marked as a favorite, it removes it from the favorites.
 * Otherwise, it adds the selected profile to the favorites.
 * This method relies on the current state of `this.selectedProfile` and `this.isFavorite`.
 * It uses `_favoritesSrv` to interact with the favorites storage, either inserting or deleting a favorite.
 * 
 * Note: This method does not return any value and will exit early if `this.selectedProfile` is not set.
 */
  setFavorite() {
    if (!this.selectedProfile) return; // Exit if no profile is selected
    if (this.isFavorite) {
      // If the profile is already a favorite, delete it from favorites
      this._favoritesSrv.deleteFavorite(this._favorites[0]?.id);
    } else {
      // If the profile is not a favorite, add it to favorites
      const p: Favorite = new Favorite();
      p.profile_id = this.selectedProfile.id; // Set the profile ID
      p.label = this.selectedProfile.title; // Set the profile title as label
      this._favoritesSrv.insertFavorite(p); // Insert the new favorite
    }
  }

  onClick(row: Profile) {
    console.log("Row selected", row)
    this.selectedProfile = row;
    this.favorite = this._favorites.find(fav => fav.profile_id === this.selectedProfile!.id);
    this.isFavorite = this.favorite ? true : false;
    const queryParams: Params = {id: row.id};

    const urlTree = this.router.createUrlTree([], {
      queryParams: queryParams,
      queryParamsHandling: "merge",
      preserveFragment: true
    });
    this.router.navigate([], {
      queryParams
    });

  }

  onEdit() {

    this.navigateToProfile(this.selectedProfile?.id!);
  }
  async onDelete() {
    if (this.selectedProfile) {
      await this._profileSrv.deleteProfile(this.selectedProfile.id);
      this.selectedProfile = undefined;
      if (this.profileList) {
        this.profileList.selectedProfile = undefined;
        this.profileList.dataSource.loadProfiles();
      }
    }
  }
  private navigateToProfile(id: string) {
    const queryParams: Params = {id};

    const urlTree = this.router.createUrlTree(["profiles/edit"], {
      queryParams: queryParams,
      queryParamsHandling: "merge",
      preserveFragment: true
    });

    this.router.navigateByUrl(urlTree);
  }

  onSave() {
    this._profileSrv.saveProfile(this.selectedProfile);
  }

  onSaveTCL() {
    this._profileSrv.saveProfileTCL(this.selectedProfile);
  }

  async onCopy() {
    const id = await this._profileSrv.copyProfile(this.selectedProfile!);
    this.navigateToProfile(id);
  }
}
