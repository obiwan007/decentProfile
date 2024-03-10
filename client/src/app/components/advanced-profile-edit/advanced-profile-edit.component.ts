import { Component } from '@angular/core';
import { BasicProfileEditComponent } from '../basic-profile-edit/basic-profile-edit.component';

@Component({
  selector: 'app-advanced-profile-edit',
  standalone: true,
  imports: [],
  templateUrl: './advanced-profile-edit.component.html',
  styleUrl: './advanced-profile-edit.component.css'
})
export class AdvancedProfileEditComponent extends BasicProfileEditComponent {

}
