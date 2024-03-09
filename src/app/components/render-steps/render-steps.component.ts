import { Component, Input } from '@angular/core';
import { Profile } from '../../models/profile';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RenderStepComponent } from '../render-step/render-step.component';

@Component({
  selector: 'app-render-steps',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RenderStepComponent],
  templateUrl: './render-steps.component.html',
  styleUrl: './render-steps.component.scss'
})
export class RenderStepsComponent {
  @Input()
  profile: Profile | undefined;
}
