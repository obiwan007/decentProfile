import {Component, EventEmitter, Input, Output, ViewChild, inject} from '@angular/core';
import {RenderStepComponent} from '../render-step/render-step.component';

import {RenderStepsComponent} from '../render-steps/render-steps.component';
import {MatSliderModule} from '@angular/material/slider';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {ProfileServiceService} from '../../services/profile-service.service';
import {EditableComponent} from '../editable/editable.component';
import {EditModeDirective} from '../editable/edit-mode.directive';
import {FocusableDirective} from '../editable/focusable.directive';
import {ViewModeDirective} from '../editable/view-mode.directive';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Album} from '../../models/album';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ProfilesListComponent} from '../profiles-list/profiles-list.component';
import {Profile} from '../../models/profile';

@Component({
  selector: 'app-album-edit',
  standalone: true,
  imports: [
    MatCardModule,
    RenderStepComponent,
    RenderStepComponent, RenderStepsComponent,
    MatButtonModule, MatSliderModule, CommonModule, FormsModule,
    ReactiveFormsModule, MatInputModule,
    EditableComponent,
    ViewModeDirective,
    EditModeDirective,
    FocusableDirective,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    ProfilesListComponent,

  ],
  templateUrl: './album-edit.component.html',
  styleUrl: './album-edit.component.css'
})
export class AlbumEditComponent {

  @Input()
  album: Album | undefined;

  @Output()
  changed: EventEmitter<Album> = new EventEmitter();

  _profileService = inject(ProfileServiceService);

  _location = inject(Location);
  selectedProfile: Profile | undefined;



  async save() {
    if (this.album?.id) {
      await this._profileService.updateAlbum(this.album!);
    }
    else {
      await this._profileService.insertAlbum(this.album!);
    }
    console.log("Saved");
    this._location.back();
  }

  async cancel() {
    this._location.back();
  }

  selectProfile($event: Profile) {
    this.selectedProfile = $event;
  }

}
