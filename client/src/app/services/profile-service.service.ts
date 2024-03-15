import { Injectable, inject } from '@angular/core';
import { Profile } from '../models/profile';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { plainToClassFromExist } from 'class-transformer';
import { Observable, of as observableOf, merge, BehaviorSubject, map } from 'rxjs';
import 'reflect-metadata';
import { InsertProfilesGQL, InsertStepsGQL, ProfileDetailsDocument, ProfileDetailsGQL, ProfileDetailsQuery, ProfileDetailsQueryVariables, ProfilesListQuery, profilesInsertInput, stepsInsertInput } from '../graphql/generated';
import { ResultData } from '../models/dataWithPageinfo';

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


  constructor(private _loadProfileById: ProfileDetailsGQL, private _insertProfile: InsertProfilesGQL, private _insertSteps: InsertStepsGQL, private _http: HttpClient) { }


  mapFromGraphQl(p: ProfilesListQuery): ResultData<Profile[]> {

    const nodes = p.profilesCollection?.edges.map(e => {
      const node: any = { ...e.node };
      node.steps = e.node.stepsCollection?.edges.map(e => e.node);
      return node;
    });
    console.log("Mapped", nodes, p);
    return new ResultData<Profile[]>(nodes?.map(n => plainToClassFromExist(new Profile(), n)) ?? [],
      p.profilesCollection?.pageInfo!,
      p.profilesCollection?.totalCount!);

  }
  mapFromGraphQlProfile(p: ProfileDetailsQuery): ResultData<Profile> {

    const nodes = p.profilesCollection?.edges.map(e => {
      const node: any = { ...e.node };
      node.steps = e.node.stepsCollection?.edges.map(e => e.node);
      return node;
    });
    console.log("Mapped", nodes, p);
    return new ResultData<Profile>(plainToClassFromExist(new Profile(), nodes![0]) ?? [],
      p.profilesCollection?.pageInfo!,
      1);

  }
  getAssetProfileById(id: string): Promise<Profile> {
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

  getProfileById(id: string): Observable<ResultData<Profile>> {
    const vars: ProfileDetailsQueryVariables = {
      id: id,
    }
    return this._loadProfileById.fetch(vars)
      .pipe(map(result => this.mapFromGraphQlProfile(result.data)));
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
        ret.push(await this.getAssetProfileById(this.allProfiles[i]));
      }
      value.next(ret);
    };
    observer();

    return observable;
  }

  insertProfile(p: Profile): Promise<boolean> {
    p.isPublic = true;
    return new Promise<boolean>(resolver => {
      const v: profilesInsertInput = {
        author: p.author,
        beverage_type: p.beverage_type,
        isPublic: p.isPublic,
        notes: p.notes,
        target_volume: p.target_volume,
        target_weight: p.target_weight,
        title: p.title,
        type: p.type,
      };
      this._insertProfile.mutate({ ep: [v] }).subscribe(res => {
        const id = res.data?.insertIntoprofilesCollection?.records[0].id;
        console.log("ID:", id);
        p.id = id!;
        this.insertStepsForProfile(p).then(() => resolver(true));
      });
    });

  }

  insertStepsForProfile(p: Profile): Promise<boolean> {
    return new Promise<boolean>(resolver => {
      const v: stepsInsertInput[] = p.steps.map((s, i) => ({
        profile_id: p.id,
        exit_condition: s.exit?.condition,
        exit_type: s.exit?.type,
        exit_value: s.exit?.value,
        flow: s.flow,
        pressure: s.pressure,
        index: i,
        limiter_range: s.limiter?.range,
        limiter_value: s.limiter?.value,
        name: s.name,
        pump: s.pump,
        seconds: s.seconds,
        sensor: s.sensor,
        temperature: s.temperature,
        transition: s.transition,
        volume: s.volume,
        weight: s.weight,
        isPublic: p.isPublic,
      }));

      this._insertSteps.mutate({ ep: v }).subscribe(res => {
        const id = res.data?.insertIntostepsCollection?.records[0].id;
        console.log("Steps: ID:", id);
        resolver(true);
      });
    });
  }
}
