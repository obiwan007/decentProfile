import { Injectable } from '@angular/core';
import { Profile } from '../models/profile';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { plainToClassFromExist } from 'class-transformer';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import 'reflect-metadata';

@Injectable({
  providedIn: 'root',
  // deps: [HttpClientModule]
})
export class ProfileServiceService {

  allProfiles: string[] = [
    "Blooming espresso.json",
    "Classic Italian espresso.json",
    "Cleaning__Weber_Spring_Clean.json",
    "Cleaning_forward_flush_x5.json",
    "Cremina.json",
    "D-Flow____default.json",
    "Damian's LM Leva.json",
    "Damian's LRv2.json",
    "Damian's LRv3.json",
    "Default.json",
    "Easy_blooming_pressure_dynamic_decline.json",
    "Extractamundo_Dos.json",
    "Filter_20.json",
    "Filter_21.json",
    "Filter_3.json",
    "Flow profile for milky drinks.json",
    "Flow_profile_for_straight_espresso.json",
    "Gentle and sweet.json",
    "Gentle flat 2.5 ml per second.json",
    "Gentle preinfusion flow profile.json",
    "Gentler but still traditional 8.4 bar.json",
    "Hybrid pour over espresso.json",
    "I_got_your_back.json",
    "Innovative long preinfusion.json",
    "Italian Australian espresso.json",
    "Londinium-R-by-Damian.json",
    "Low pressure lever machine at 6 bar.json",
    "Pour over.json",
    "Preinfuse then 45ml of water.json",
    "Ramp Bloom.json",
    "Tea_portafilter__Blue_Willow_Black_Honey_Oolong.json",
    "Tea_portafilter__Blue_Willow_Tsuyuhikari_Sencha.json",
    "Tea_portafilter__Blue_Willow_black_phoenix_1.json",
    "Tea_portafilter__Blue_Willow_black_phoenix_2.json",
    "Tea_portafilter__Blue_Willow_lunar_winter.json",
    "Traditional lever machine.json",
    "Trendy 6 bar low pressure shot.json",
    "TurboBloom.json",
    "TurboTurbo.json",
    "Two spring lever machine to 9 bar.json",
    "adaptive_allonge.json",
    "adaptive_espresso.json",
    "best_practice.json",
    "cleaning_forward_flush.json",
    "cold_brew.json",
    "e61 classic at 9 bar.json",
    "e61 rocketing up to 10 bar.json",
    "e61 with fast preinfusion to 9 bar.json",
    "easy_blooming_active_pressure_decline.json",
    "flow_calibration.json",
    "kalita_20.json",
    "manual_flow.json",
    "manual_pressure.json",
    "rao_allonge.json",
    "tea_in_a_basket.json",
    "tea_portafilter.json",
    "tea_portafilter_chinese_green.json",
    "tea_portafilter_japanese_green.json",
    "tea_portafilter_no_pressure.json",
    "tea_portafilter_oolong.json",
    "tea_portafilter_oolong_dark.json",
    "tea_portafilter_tisane.json",
    "tea_portafilter_white.json",
    "v60-15g.json",
    "v60-20g.json",
    "v60-22g.json",
    "weber_spring_clean.json",
  ];


  constructor(private _http: HttpClient) { }



  getProfileById(id: string): Promise<Profile> {
    console.log("Loading Profile: ", id);

    return new Promise<Profile>(ret => {
      const p = new Profile();
      this._http.get(`assets/profiles/${id}`, { responseType: 'text' })
        .subscribe(data => {
          const raw = JSON.parse(data);

          plainToClassFromExist(p, raw);
          p.id = id;

          ret(p);
        });
    });
  }

  getProfilesCount(): number {
    return this.allProfiles.length;
  }

  getProfilesFromIndex(filter: string, direction: string, index: number, pageSize: number): Observable<Profile[]> {
    console.log("Loading Profiles");

    const value = new BehaviorSubject<Profile[]>([]);
    const observable = value.asObservable();

    const observer = async () => {
      const ret: Profile[] = [];
      const to = Math.min(this.allProfiles.length, index + pageSize);
      for (let i = index; i < to; i++) {
        console.log("Loading Id:", this.allProfiles[i]);
        ret.push(await this.getProfileById(this.allProfiles[i]));
      }
      value.next(ret);
    };
    observer();

    return observable;
  }
}
