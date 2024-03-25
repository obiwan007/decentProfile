import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { Profile, ProfileType, PumpMode, SensorType, Step, TransitionMode } from '../../models/profile';
import { ProfileServiceService } from '../../services/profile-service.service';
import { ProfileChartComponent } from '../profile-chart/profile-chart.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdvancedProfileEditComponent } from '../advanced-profile-edit/advanced-profile-edit.component';
import { BasicProfileEditComponent } from '../basic-profile-edit/basic-profile-edit.component';
import { EditModeDirective } from '../editable/edit-mode.directive';
import { EditableComponent } from '../editable/editable.component';
import { FocusableDirective } from '../editable/focusable.directive';
import { ViewModeDirective } from '../editable/view-mode.directive';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';
import { RenderStepComponent } from '../render-step/render-step.component';
import { RenderStepsComponent } from '../render-steps/render-steps.component';


@Component({
  selector: 'app-d-flow-profile-edit',
  standalone: true,
  imports: [
    ProfileChartComponent,
    MatCardModule,
    RenderStepComponent,
    ProfileDetailsComponent, RenderStepComponent, RenderStepsComponent,
    AdvancedProfileEditComponent, BasicProfileEditComponent, MatButtonModule, MatSliderModule, CommonModule, FormsModule,
    ReactiveFormsModule, MatInputModule,
    EditableComponent,
    ViewModeDirective,
    EditModeDirective,
    FocusableDirective,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './d-flow-profile-edit.component.html',
  styleUrl: './d-flow-profile-edit.component.scss'
})
export class DFlowProfileEditComponent implements OnInit {
  dose = 16.0;
  extractionRatio = 2.5;

  tooltips: any = {
    info_dose: 'Dose - means the weight of the beans or the weight of the coffee puck.\n\n The dose weight is used in calcultating the extraction ratio.\n See pour stop setting for information of extraction ratio. \n\n Being consistant with your grind, dose and puck prep will greatly help you repeatedly extract great espresso.',
    info_infuse_temp: 'Infuse temperature allows you to emulate various machine where the group temperature may start cooler than the water being added. \n See pour temperature for information on how temperature effects extraction and taste.',
    info_infuse_pressure: 'A higher infusion pressure will increase puck resistance\n\n The default is 3 bar, the same as used by LRv2, LRv3 profiles and others, it is tyipcally the upper level used by machines that use preinfusion. \n\n Some manual lever machines like a LA Pavoni have a boiler pressure of 0.8 to 1 bar, infusing is done by raising, fill the group with water at boiler pressure. to emulater this you would set a 1 bar infuse pressure. \n\n Some machines use pressures anywhere in between. \n   Other machines may not hold an infusion presure at all, like a common E61 pump machines   where it apply water straight to extraction pressure, typically 8 or 9 bar.',
    info_infuse_stop: 'Infuse will move on to the pour stage when any one of these settings are reached. \n For best consistancy Damian recommends using weight. In cases where a scale is not available,      you could use volume, however for those situations and where you you may want to end infuse before first drops in the cup, using time is likely the better option. \n\nA longer infusion increases body, but it also reduces puck resistance during the pour. Which means we would need to grind finer to maintain the same pour pressure/flow rates. Finer grinds also reduce body and can increase bitterness, so the aim is to find a ballence for your prefered taste. \n\n A longer infusion also means we have a higher pecentage of the shot being at 3 bar.\n 0.2g to 4g is a good starting range to experiment with.',
    info_pour_temp: 'Higher temperature helps extract the soluble compounds, however it also increases harsher tasts that may exist too. \n\n Higher temperatures usually results in lower body with more pronounced acidity, wine, fruity, vegetal flavours. \nLower temperatures often work better with slower extraction rates.',
    info_pour_limits: 'D-Flow uses flow with pressure limits, allows for a greater grind range, giving better control and resulting in less wasted shots. \n Increasing pressure will shift taste from wine like to a more syrupy texture, it also shifts tastes from clear delicate flavours to more muddled flavours.\n\nFaster flows can increase clarity in ligher roasts and may help reduce channeling. \n Slower flow can help increase intensity and body in darker than light roasts.',
    info_pour_stop: 'The extraction ratio (Dose : Extraction) is shown above the setting dial.\n Increasing the extraction ratio will shift the taste from \n\n Sour  >  Sweet  >  Bitter \n\nThe ideal extraction ratio can vary between beans, water alkalinity, puck prep methods and how evenly the pack is extracted.\n You should adjusted this setting for your taste.',
    info_d_flow: 'The D-Flow editor was developed by Damian. It is available as a plug-in for the de1app. The original code can be found on Github: https://github.com/Damian-AU/D_Flow_Espresso_Profile'
  };

  @ViewChild('chart')
  chart!: ProfileChartComponent;

  @Input()
  profile: Profile | undefined;

  @Output()
  changed: EventEmitter<Profile> = new EventEmitter();

  _profileService = inject(ProfileServiceService);

  updateExtractionRatio() {
    if (this.profile?.target_weight && this.profile?.target_weight != 0) {
      this.extractionRatio = this.profile?.target_weight / this.dose;
    }
    else if (this.profile?.target_volume && this.profile?.target_volume != 0) {
      this.extractionRatio = this.profile?.target_volume / this.dose;
    }
  }

  save() {
    this._profileService.updateProfile(this.profile!);
  }

  resetToDefaults() {
    if (this.profile) {
      this.profile.author = 'Damian';
      this.profile.title = 'D-Flow \/ default';
      this.profile.notes = 'Damians D-Flow profile. A simple to use advanced profile\n        By Damian Brakel https:\/\/www.diy.brakel.com.au\/';
      this.profile.beverage_type = 'espresso';
      this.profile.id = 'D-Flow \/ default';
      this.profile.steps[0].name = 'Filling';
      this.profile.steps[0].temperature = 92.0;
      this.profile.steps[0].sensor = SensorType.coffee;
      this.profile.steps[0].pump = PumpMode.pressure;
      this.profile.steps[0].transition = TransitionMode.fast;
      this.profile.steps[0].pressure = 2.00;
      this.profile.steps[0].flow = 8;
      this.profile.steps[0].seconds = 25.00;
      this.profile.steps[0].volume = 100;
      this.profile.steps[0].weight = 5.00;
      this.profile.steps[0].exit = {
        type: 'pressure',
        condition: 'over',
        value: 1.50
      },
        this.profile.steps[0].limiter = {
          value: 0,
          range: 0.2
        }
      this.profile.steps[1].name = 'Infusing';
      this.profile.steps[1].temperature = 92.0;;
      this.profile.steps[1].sensor = SensorType.coffee;
      this.profile.steps[1].pump = PumpMode.pressure;
      this.profile.steps[1].transition = TransitionMode.fast;
      this.profile.steps[1].pressure = 3.0;
      this.profile.steps[1].flow = 8;
      this.profile.steps[1].seconds = 60.0;
      this.profile.steps[1].volume = 100.00;
      this.profile.steps[1].weight = 4.00;
      this.profile.steps[1].limiter = {
        value: 0,
        range: 0.2
      };
      this.profile.steps[2].name = 'Pouring';
      this.profile.steps[2].temperature = 92.0;
      this.profile.steps[2].sensor = SensorType.coffee;
      this.profile.steps[2].pump = PumpMode.flow;
      this.profile.steps[2].transition = TransitionMode.fast;
      this.profile.steps[2].pressure = 4.8;
      this.profile.steps[2].flow = 2.0;
      this.profile.steps[2].seconds = 127;
      this.profile.steps[2].volume = 0;
      this.profile.steps[2].weight = 0.00;
      this.profile.steps[2].limiter = {
        value: 7.5,
        range: 0.2
      }
      this.profile.tank_temperature = '0';
      this.profile.target_weight = 40;
      this.profile.target_volume = 0;
      this.profile.target_volume_count_start = '2';
      this.profile.legacy_profile_type = ''
      this.profile.type = ProfileType.advanced;
      this.profile.hidden = '0';
      this.profile.changes_since_last_espresso = ''
      this.profile.version = '2'
    }
  }

  stepChanged(step: Step) {
    console.log(this.chart);
    this.chart?.updateStep(step);
  }
  ngOnInit() {
    if (this.dose && (this.profile?.target_weight || this.profile?.target_volume)) {
      this.updateExtractionRatio();
    }
  }
}
