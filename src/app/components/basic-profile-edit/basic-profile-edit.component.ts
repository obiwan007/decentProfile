import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile } from '../../models/profile';

@Component({
  selector: 'app-basic-profile-edit',
  standalone: true,
  imports: [],
  templateUrl: './basic-profile-edit.component.html',
  styleUrl: './basic-profile-edit.component.scss'
})
export class BasicProfileEditComponent {
  @Input()
  profile: Profile | undefined;

  @Output()
  changed: EventEmitter<Profile> = new EventEmitter();

}
