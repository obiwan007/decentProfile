import { Component, Input } from '@angular/core';
import { Profile } from '../../models/profile';
import { JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [JsonPipe, MatCardModule, MatButtonModule],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss'
})
export class ProfileDetailsComponent {
  @Input()
  profile: Profile | undefined;

}
