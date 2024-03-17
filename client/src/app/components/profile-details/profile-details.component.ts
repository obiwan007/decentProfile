import { Component, Input } from '@angular/core';
import { Profile } from '../../models/profile';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EditableComponent } from '../editable/editable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewModeDirective } from '../editable/view-mode.directive';
import { EditModeDirective } from '../editable/edit-mode.directive';
import { MatInputModule } from '@angular/material/input';
import { FocusableDirective } from '../editable/focusable.directive';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [JsonPipe, MatCardModule, CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ViewModeDirective,
    EditModeDirective,
    FocusableDirective,
    EditableComponent],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent {

  @Input()
  profile: Profile | undefined;

  @Input()
  showButtons: boolean = true;
  /**
   *
   */
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,) {


  }

  onEdit() {

    const queryParams: Params = { id: this.profile?.id };

    const urlTree = this.router.createUrlTree(["profiles/edit"], {
      queryParams: queryParams,
      queryParamsHandling: "merge",
      preserveFragment: true
    });

    this.router.navigateByUrl(urlTree);
  }
}
