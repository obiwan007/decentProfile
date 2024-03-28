import { Injectable, inject } from '@angular/core';
import { Exit, Limiter, Profile, ProfileType, Step } from '../models/profile';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { instanceToPlain, plainToClassFromExist, serialize } from 'class-transformer';
import { Observable, of as observableOf, merge, BehaviorSubject, map } from 'rxjs';
import 'reflect-metadata';
import {
  DeleteProfileGQL,
  DeleteProfileMutationVariables,
  DeleteStepsForProfileGQL,
  DeleteStepsForProfileMutationVariables,
  InsertProfilesGQL, InsertStepsGQL, ProfileDetailsDocument, ProfileDetailsGQL, ProfileDetailsQuery, ProfileDetailsQueryVariables, ProfilesListQuery, UpdateProfilesGQL, UpdateStepsGQL, profilesInsertInput, profilesUpdateInput,
  stepsInsertInput, stepsUpdateInput
} from '../graphql/generated';
import { ResultData } from '../models/dataWithPageinfo';
import { cloneDeep } from '@apollo/client/utilities';

@Injectable({
  providedIn: 'root',
  // deps: [HttpClientModule]
})
export class ProfileServiceService {


  tclSample = `advanced_shot {{exit_if 1 flow 3.50 volume 100 transition fast exit_flow_under 0 temperature 92.0 name preinfusion pressure 1 sensor coffee pump flow exit_type pressure_over exit_flow_over 6 exit_pressure_over 4.0 seconds 15.00 exit_pressure_under 0} {name {rise and hold} temperature 92.0 sensor coffee pump pressure transition fast pressure 8.6 seconds 4 volume 100 exit_if 0 exit_pressure_over 11 exit_pressure_under 0 exit_flow_over 6 exit_flow_under 0} {exit_if 1 flow 3.50 volume 100 transition fast exit_flow_under 3.40 temperature 92.0 name {Scan 3.5 mL.s} pressure 6.0 sensor coffee pump flow exit_type flow_under exit_flow_over 6 exit_pressure_over 11 exit_pressure_under 0 seconds 127} {exit_if 1 flow 3.30 volume 100 transition fast exit_flow_under 3.20 temperature 92.0 name {Scan 3.3 mL.s} pressure 6.0 sensor coffee pump flow exit_type flow_under exit_flow_over 6 exit_pressure_over 11 exit_pressure_under 0 seconds 127} {exit_if 1 flow 3.10 volume 100 transition fast exit_flow_under 3.00 temperature 92.0 name {Scan 3.1 mL.s} pressure 6.0 sensor coffee pump flow exit_type flow_under exit_flow_over 6 exit_pressure_over 11 exit_pressure_under 0 seconds 127} {exit_if 1 flow 2.90 volume 100 transition fast exit_flow_under 2.80 temperature 92.0 name {Scan 2.9 mL.s} pressure 6.0 sensor coffee pump flow exit_type flow_under exit_flow_over 6 exit_pressure_over 11 exit_pressure_under 0 seconds 127} {exit_if 1 flow 2.70 volume 100 transition fast exit_flow_under 2.60 temperature 92.0 name {Scan 2.7 mL.s} pressure 6.0 sensor coffee pump flow exit_type flow_under exit_flow_over 6 exit_pressure_over 11 exit_pressure_under 0 seconds 127} {exit_if 1 flow 2.60 volume 100 transition fast exit_flow_under 2.50 temperature 92.0 name {Scan 2.6 mL.s} pressure 6.0 sensor coffee pump flow exit_type flow_under exit_flow_over 6 exit_pressure_over 11 exit_pressure_under 0 seconds 127} {exit_if 1 flow 2.50 volume 100 transition fast exit_flow_under 2.40 temperature 92.0 name {Scan 2.5 mL.s} pressure 6.0 sensor coffee pump flow exit_type flow_under exit_flow_over 6 exit_pressure_over 11 exit_pressure_under 0 seconds 127} {exit_if 1 flow 2.40 volume 100 transition fast exit_flow_under 2.30 temperature 92.0 name {Scan 2.4 mL.s} pressure 6.0 sensor coffee pump flow exit_type flow_under exit_flow_over 6 exit_pressure_over 11 exit_pressure_under 0 seconds 127} {exit_if 1 flow 2.30 volume 100 transition fast exit_flow_under 2.20 temperature 92.0 name {Scan 2.3 mL.s} pressure 6.0 sensor coffee pump flow exit_type flow_under exit_flow_over 6 exit_pressure_over 11 exit_pressure_under 0 seconds 127} {exit_if 1 flow 2.20 volume 100 transition fast exit_flow_under 2.10 temperature 92.0 name {Scan 2.2 mL.s} pressure 6.0 sensor coffee pump flow exit_type flow_under exit_flow_over 6 exit_pressure_over 11 exit_pressure_under 0 seconds 127} {exit_if 1 flow 2.10 volume 100 transition fast exit_flow_under 2.00 temperature 92.0 name {Scan 2.1 mL.s} pressure 6.0 sensor coffee pump flow exit_type flow_under exit_flow_over 6 exit_pressure_over 11 exit_pressure_under 0 seconds 127} {exit_if 1 flow 2.00 volume 100 transition fast exit_flow_under 1.90 temperature 92.0 name {Scan 2.0 mL.s} pressure 6.0 sensor coffee pump flow exit_type flow_under exit_flow_over 6 exit_pressure_over 11 exit_pressure_under 0 seconds 127} {exit_if 1 flow 1.80 volume 100 transition fast exit_flow_under 1.70 temperature 92.0 name {Scan 1.8 mL.s} pressure 6.0 sensor coffee pump flow exit_type flow_under exit_flow_over 6 exit_pressure_over 11 exit_pressure_under 0 seconds 127} {exit_if 1 flow 1.60 volume 100 transition fast exit_flow_under 1.50 temperature 92.0 name {Scan 1.6 mL.s} pressure 6.0 sensor coffee pump flow exit_type flow_under exit_flow_over 6 exit_pressure_over 11 exit_pressure_under 0 seconds 127} {exit_if 1 flow 1.40 volume 100 transition fast exit_flow_under 1.30 temperature 92.0 name {Scan 1.4 mL.s} pressure 6.0 sensor coffee pump flow exit_type flow_under exit_flow_over 6 exit_pressure_over 11 exit_pressure_under 0 seconds 127} {exit_if 1 flow 1.20 volume 100 transition fast exit_flow_under 1.10 temperature 92.0 name {Scan 1.2 mL.s} pressure 6.0 sensor coffee pump flow exit_type flow_under exit_flow_over 6 exit_pressure_over 11 exit_pressure_under 0 seconds 127} {exit_if 1 flow 1.00 volume 100 transition fast exit_flow_under 0.90 temperature 92.0 name {Scan 1.0 mL.s} pressure 6.0 sensor coffee pump flow exit_type flow_under exit_flow_over 6 exit_pressure_over 11 exit_pressure_under 0 seconds 127} {exit_if 0 flow 0.50 volume 100 transition fast exit_flow_under 1.80 temperature 92.0 name {last resort} pressure 6.0 sensor coffee pump flow exit_type flow_under exit_flow_over 6 exit_pressure_over 11 exit_pressure_under 0 seconds 127}}
author Decent
espresso_decline_time 35
espresso_hold_time 4
espresso_pressure 8.6
espresso_temperature 88.0
espresso_temperature_0 90.0
espresso_temperature_1 88.0
espresso_temperature_2 88.0
espresso_temperature_3 88.0
espresso_temperature_steps_enabled 1
final_desired_shot_volume 36
final_desired_shot_volume_advanced 0
final_desired_shot_volume_advanced_count_start 2
final_desired_shot_weight 36
final_desired_shot_weight_advanced 0
flow_profile_decline 1.2
flow_profile_decline_time 17
flow_profile_hold 2
flow_profile_hold_time 8
flow_profile_minimum_pressure 4
flow_profile_preinfusion 4
flow_profile_preinfusion_time 5
preinfusion_flow_rate 4
preinfusion_guarantee 0
preinfusion_stop_pressure 4.0
preinfusion_time 20
pressure_end 6.0
profile_hide 1
profile_language en
profile_notes {The more forgiving evolution of Scott Rao's original blooming profile. Designed to produce tasty espressos from a wide range of grind settings. Accomplished by 2 main features in the recipe: 1. The Blooming stage declines from 4 bar to 2 bar. Blooming time is dictated by the grind size (Course is shorter, finer is longer) and ensures a more consistent puck resistance.  2. An adaptive pressure phase based on the flow rate evolution. e.g. When resistance is lower (faster flowrate) pressure declines. If resistance is higher (slower flowrate) pressure increases.  Best used with a large flat burr and light roasts. If using darker roasts, reduce the temps to 84°C-86°C and increase the exit pressure to enable a shorter bloom. Note conical burrs can use higher temperatures.  20g dose with a ratio between 1 : 2 to 1 : 2.5 with total shot times ranging from 25 to 45 seconds.}
profile_title {Gagné/Adaptive Shot 92C v1.0}
settings_profile_type settings_2c
tank_desired_water_temperature 0
water_temperature 80
read_only 1`


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


  constructor(private _loadProfileById: ProfileDetailsGQL,
    private _insertProfile: InsertProfilesGQL,
    private _updateProfile: UpdateProfilesGQL,
    private _insertSteps: InsertStepsGQL,
    private _updateSteps: UpdateStepsGQL,
    private _deleteSteps: DeleteStepsForProfileGQL,
    private _deleteProfile: DeleteProfileGQL,
    private _http: HttpClient) {


    this.getProfileFromTCL(this.tclSample);

  }
  getProfileFromTCL(tcl: string) {
    let p = new Profile();
    const lines = tcl.split('\n');

    const params: { [key: string]: any } = {};

    lines.forEach(l => {
      const i = l.indexOf(' ');
      params[l.substring(0, i)] = l.substring(i + 1); // "tocirah sneab"
    });
    console.log("TCL:", params)

    if (params["settings_profile_type"] == "settings_2a") {
      console.log('{"Type:":<15s} simple pressure profile')
      p.type = ProfileType.pressure;
    }
    else if (params["settings_profile_type"] == "settings_2b") {
      console.log('{"Type:":<15s} simple flow profile')
      p.type = ProfileType.flow;
    }
    else if (params["settings_profile_type"] == "settings_2c") {
      console.log('{"Type:":<15s} advanced profile')
      p.type = ProfileType.advanced;
    }
    else if (params["settings_profile_type"] == "settings_2c2") {
      console.log('Type:" advanced profile (warning! incorrect settings type 2c2)')
      params["settings_profile_type"] = "settings_2c"
      p.type = ProfileType.advanced;
    }
    else
      console.log("Error: unrecognized profile type", params["settings_profile_type"])



    p.title = params["profile_title"].replace('{', '').replace('}', '')
    console.log(`Title: ${p.title}`);

    p.author = params["author"].replace('{', '').replace('}', '')
    console.log(`Author:" ${p.author}`);

    p.notes = params["profile_notes"].replace('{', '').replace('}', '')
    console.log(`{"Notes:"} ${p.notes}`);

    p.beverage_type = params["beverage_type"];

    p.tank_temperature = params["tank_desired_water_temperature"];

    switch (p.type) {
      case ProfileType.pressure:
        p = this.pressureProfile(params, p);
        break;
      case ProfileType.flow:
        p = this.flowProfile(params, p);
        break;
      case ProfileType.advanced:
        p = this.advancedProfile(params, p);
        break;
      default:
        console.log("Error: unrecognized profile type", params["settings_profile_type"])
    }
    console.log("TCL Imported:", p);
    return p;
  }
  advancedProfile(params: { [key: string]: any; }, p: Profile) {
    const adv_shot: string = params["advanced_shot"].substring(1, params["advanced_shot"].length - 1);
    console.log("Adv:", adv_shot);
    // console.log("Adv:", adv_shot.split(/[\{\}]+/).filter((f: any) => console.log("Shot:", f)));

    // console.log("Adv3:", adv_shot.match(/[^\{\}]+/g));
    const steps = this.tokenizeSteps(adv_shot);
    p.steps = [];
    steps.forEach(sLine => {
      const step = new Step();
      p.steps.push(step);
      const step_dict: { [key: string]: any } = {};
      const s = sLine.split(' ');

      for (let i = 0; i < s.length; i += 2) {
        step_dict[s[i]] = s[i + 1];
      }
      console.log("Step: ", sLine);
      console.log("Step_Dict: ", step_dict);

      step.name = step_dict["name"].replaceAll("_", " ").replace('{', '').replace('}', '');
      // temperature
      step.temperature = +step_dict["temperature"];
      const deg = step.temperature < 110 ? "C" : "F";
      step.sensor = step_dict["sensor"]

      //# pump => flow or pressure
      const mfp = step_dict["max_flow_or_pressure"];
      const mfpr = step_dict["max_flow_or_pressure_range"];


      step.pump = step_dict["pump"];
      step.pressure = +step_dict["pressure"];
      if (step.pressure < 0) step.pressure = 0;


      // # steps page: max_flow_or_pressure is apparently flow limit(for pressure step) * or * pressure limit(for flow step)
      // if (mfp && +(mfp) > 0)
      //   // print(", flow limit", mfp, "ml/s", end = '')
      //     //# limits page: max_flow_or_pressure_range is apparently flow limiter(for pressure step) * or * pressure limiter(for flow step)
      //   if mfpr and float(mfpr) > 0: print(", flow limiter", mfpr, "ml/s", end = '')
      // print()

      step.flow = +step_dict["flow"];
      if (step.flow < 0) step.flow = 0
      //   print(f'{"flow step:":<15s} {flow:.1f} ml/s', end = '')
      // # steps page: max_flow_or_pressure is apparently flow limit(for pressure step) * or * pressure limit(for flow step)
      //     if mfp and float(mfp) > 0:
      //   print(", pressure limit", mfp, "bar", end = '')
      //     # limits page: max_flow_or_pressure_range is apparently flow limiter(for pressure step) * or * pressure limiter(for flow step)
      //     if mfpr and float(mfpr) > 0: print(", pressure limiter", mfpr, "bar", end = '')
      //   print()

      //# move on by maximum
      // # seconds, volume, weight = float( step_dict["seconds"] ), float(step_dict["volume"]), float(step_dict["weight"])
      step.seconds = +step_dict["seconds"];
      step.weight = +step_dict["weight"];
      step.volume = +step_dict["volume"];
      if (!step_dict["weight"]) {
        step.weight = step.volume;
      }

      if (step_dict["exit_if"] == "1") {
        step.exit = new Exit();

        if (step_dict["exit_type"] == "pressure_over") {
          step.exit.type = "pressure";
          step.exit.condition = "over"
          step.exit.value = +step_dict["exit_pressure_over"];
        }
        else if (step_dict["exit_type"] == "pressure_under") {
          step.exit.type = "pressure";
          step.exit.condition = "under"
          step.exit.value = +step_dict["exit_pressure_under"];
        }
        else if (step_dict["exit_type"] == "flow_over") {
          step.exit.type = "flow";
          step.exit.condition = "over"
          step.exit.value = +step_dict["exit_flow_over"];
        }
        else if (step_dict["exit_type"] == "flow_under") {
          step.exit.type = "flow";
          step.exit.condition = "under"
          step.exit.value = +step_dict["exit_flow_under"];
        }
        step.transition = step_dict["transition"];
      }
      console.log("Step: ", step);

      // seconds, volume, weight = step_dict.get("seconds"), step_dict.get("volume"), step_dict.get("weight")
      // if seconds: print( f'{"move on if:":<15s} time over {float(seconds):.0f}s', end='' )
      // if volume and float(volume) > 0: print( f', volume over {float(volume):.0f}ml', end='' )
      // if weight and float(weight) > 0: print( f', weight over {float(weight):.1f}g', end='' )

    });
    p.target_weight = +params["final_desired_shot_weight_advanced"];
    if (p.target_weight > 0)
      console.log(`desired weight: ${p.target_weight} grams`);
    else
      console.log(`desired weight: none`);

    // desired shot volume
    p.target_volume = +params["final_desired_shot_volume_advanced"];
    if (p.target_volume > 0)
      console.log(`{"desired volume:":<15s} ${p.target_volume} ml`);
    else
      console.log(`desired volume: none`);
    return p;
  }
  private tokenizeSteps(adv_shot: string) {
    let open = 0;
    const lines = [];
    let lStart = 0;
    let lEnd = 0;
    let lStartName = 0;
    let lEndName = 0;
    let name = "";
    let name2 = "";
    for (let i = 0; i < adv_shot.length; i++) {
      const c = adv_shot[i];
      // console.log(c);
      if (c === '{') {
        open++;
        if (open === 1) {
          lStart = i;
          name = "";
          name2 = "";
        }
        if (open === 2) {
          lStartName = i;
        }
        console.log("Start", open);
      }
      if (c === '}') {
        open--;
        if (open === 0) {
          lEnd = i;
          console.log(adv_shot.substring(lStart + 1, lEnd));
          lines.push(adv_shot.substring(lStart + 1, lEnd).replace(name, name2));
        }
        if (open === 1) {
          lEndName = i;
          console.log(adv_shot.substring(lStartName + 1, lEndName));
          name = adv_shot.substring(lStartName, lEndName + 1);
          console.log("Name:", name);
          name2 = name.replaceAll(" ", "_");
        }
        console.log("End", open, lStart, lEnd);
      }
    }
    return lines;
  }

  flowProfile(params: { [key: string]: any; }, p: Profile) {
    const temp = +params["espresso_temperature"];

    const deg = temp < 110 ? "C" : "F";
    p.steps = [new Step(), new Step(), new Step(), new Step()];
    if (params["espresso_temperature_steps_enabled"] === "1") {
      p.steps[0].temperature = params["espresso_temperature_0"];
      p.steps[1].temperature = params["espresso_temperature_1"];
      p.steps[2].temperature = params["espresso_temperature_2"];
      p.steps[3].temperature = params["espresso_temperature_3"];
      console.log(`temp steps: start ${p.steps[0].temperature}${deg}, preinfuse ${p.steps[1].temperature}${deg}, hold ${p.steps[2].temperature}${deg}, decline ${p.steps[3].temperature}${deg}`)
    } else {
      console.log(`temp ${temp}${deg}`)
    }

    // preinfusion
    p.steps[1].seconds = +params["preinfusion_time"];
    p.steps[1].flow = +params["preinfusion_flow_rate"];
    p.steps[1].pressure = +params["preinfusion_stop_pressure"];

    if (p.steps[1].seconds > 0)
      console.log(`preinfusion: ${p.steps[1].flow} ml/s for ${p.steps[1].seconds} seconds or until pressure hits ${p.steps[1].pressure} bar)`);
    else
      console.log('preinfusion: none');
    // preinfusion
    p.steps[1].seconds = +params["preinfusion_time"];
    p.steps[1].flow = +params["preinfusion_flow_rate"];
    p.steps[1].pressure = +params["preinfusion_stop_pressure"];

    if (p.steps[1].seconds > 0)
      console.log(`preinfusion: ${p.steps[1].flow} ml/s for ${p.steps[1].seconds} seconds or until pressure hits ${p.steps[1].pressure} bar)`);
    else
      console.log('preinfusion: none');
    if (params["preinfusion_guarantee"] == '1')
      console.log("note: preinfusion rise box checked");

    // rise and hold    
    p.steps[2].seconds = +params["espresso_hold_time"];
    p.steps[2].pressure = +params["maximum_pressure"];
    p.steps[1].flow = +params["flow_profile_hold"];
    console.log(`rise and hold: ${p.steps[2].flow} ml/s for ${p.steps[2].seconds} seconds`);
    console.log(`limit pressure to ${p.steps[2].pressure} bar)`)

    // decline
    p.steps[3].seconds = + params["espresso_decline_time"];
    if (p.steps[3].seconds > 0) {
      p.steps[3].flow = +params["flow_profile_decline"];
      console.log(`decline: ${p.steps[2].flow} ml/s over ${p.steps[3].seconds} seconds`);
    }
    else {
      console.log('decline: none');
    }

    // desired shot weight
    p.target_weight = +params["final_desired_shot_weight"];
    if (p.target_weight > 0)
      console.log(`{"desired weight:":<15s} ${p.target_weight} grams`);
    else
      console.log(`{"desired weight:":<15s} $none`);

    // desired shot volume
    p.target_volume = +params["final_desired_shot_volume"];
    if (p.target_volume > 0)
      console.log(`{"desired volume:":<15s} ${p.target_volume} ml`);
    else
      console.log(`desired volume: none`);

    return p;
  }
  pressureProfile(params: { [key: string]: any; }, p: Profile) {
    const temp = +params["espresso_temperature"];

    const deg = temp < 110 ? "C" : "F";
    p.steps = [new Step(), new Step(), new Step(), new Step()];
    if (params["espresso_temperature_steps_enabled"] === "1") {
      p.steps[0].temperature = +params["espresso_temperature_0"];
      p.steps[1].temperature = +params["espresso_temperature_1"];
      p.steps[2].temperature = +params["espresso_temperature_2"];
      p.steps[3].temperature = +params["espresso_temperature_3"];
      console.log(`temp steps: start ${p.steps[0].temperature}${deg}, preinfuse ${p.steps[1].temperature}${deg}, hold ${p.steps[2].temperature}${deg}, decline ${p.steps[3].temperature}${deg}`)
    } else {
      console.log(`temp ${temp}${deg}`)
      p.steps.forEach(s => s.temperature = temp);
    }

    // preinfusion
    p.steps[1].seconds = +params["preinfusion_time"];
    p.steps[1].flow = +params["preinfusion_flow_rate"];
    p.steps[1].pressure = +params["preinfusion_stop_pressure"];

    if (p.steps[1].seconds > 0)
      console.log(`preinfusion: ${p.steps[1].flow} ml/s for ${p.steps[1].seconds} seconds or until pressure hits ${p.steps[1].pressure} bar)`);
    else
      console.log('preinfusion: none');



    // rise and hold
    p.steps[2].seconds = +params["espresso_hold_time"];
    p.steps[2].pressure = +params["espresso_pressure"];
    console.log(`rise and hold: ${p.steps[2].pressure} bar for ${p.steps[2].seconds} seconds`);
    if (params["maximum_flow"]) {
      p.steps[2].limiter = new Limiter();
      p.steps[2].limiter.value = +params["maximum_flow"];
      console.log(`limit flow to ${p.steps[2].limiter.value} ml/s)`)
    }

    // decline
    p.steps[3].seconds = + params["espresso_decline_time"];
    if (p.steps[3].seconds > 0) {
      p.steps[3].pressure = +params["pressure_end"];
      console.log(`decline: ${p.steps[2].pressure} bar over ${p.steps[3].seconds} seconds`);
    }
    else {
      console.log('decline: none');
    }

    p.steps[0].name = "temp boost";
    p.steps[1].name = "preinfusion";
    p.steps[2].name = "rise and hold";
    p.steps[3].name = "decline";

    p.steps[0].index = 0;
    p.steps[1].index = 1;
    p.steps[2].index = 2;
    p.steps[3].index = 3;
    // desired shot weight
    p.target_weight = +params["final_desired_shot_weight"];
    if (p.target_weight > 0)
      console.log(`desired weight: ${p.target_weight} grams`);
    else
      console.log(`desired weight: none`);

    // desired shot volume
    p.target_volume = +params["final_desired_shot_volume"];
    if (p.target_volume > 0)
      console.log(`desired volume: ${p.target_volume} ml`);
    else
      console.log(`desired volume: none`);
    return p;
  }


  mapFromGraphQl(p: ProfilesListQuery): ResultData<Profile[]> {

    const nodes = p.profilesCollection?.edges.map(e => {
      const node: any = { ...e.node };
      node.steps = e.node.stepsCollection?.edges.map(e => e.node);

      return node;
    });
    const ret = new ResultData<Profile[]>(nodes?.map(n => this.mapFromGraphQlSingle(new Profile(), n)) ?? [],
      p.profilesCollection?.pageInfo!,
      p.profilesCollection?.totalCount!);
    console.log("Mapped", ret.data);

    return ret;


  }

  mapFromGraphQlSingle(p: Profile, n: any) {
    const n2 = structuredClone(n);
    delete n2.stepsCollection;
    (n2.steps as Step[]).forEach(s => {
      const sRaw = (s as any);
      if (sRaw.exit_type) {
        const e = new Exit();
        e.condition = sRaw.exit_condition;
        e.type = sRaw.exit_type;
        e.value = sRaw.exit_value;
        s.exit = e;
      }
      delete sRaw.exit_type;
      delete sRaw.exit_value;
      delete sRaw.exit_condition;

      if (sRaw.limiter_range) {
        const e = new Limiter();
        e.range = sRaw.limiter_range;
        e.value = sRaw.limiter_value;
        s.limiter = e;
      }
      delete sRaw.limiter_range;
      delete sRaw.limiter_value;
    });
    return plainToClassFromExist(p, n2);

  }

  mapFromGraphQlProfile(p: ProfileDetailsQuery): ResultData<Profile> {

    const nodes = p.profilesCollection?.edges.map(e => {
      const node: any = { ...e.node };
      node.steps = e.node.stepsCollection?.edges.map(e => e.node);

      return node;
    });
    console.log("Mapped", nodes, p);

    return new ResultData<Profile>(this.mapFromGraphQlSingle(new Profile(), nodes![0]) ?? [],
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

  getProfileFromJson(json: object): Profile {
    const p = plainToClassFromExist(new Profile(), json);
    p.isPublic = false;
    p.isDefault = false;
    p.id = "";
    p.steps.forEach((s, i) => {
      s.id = 0;
      s.index = i;
    });
    return p;
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

  copyProfile(p: Profile): Promise<string> {
    const pNew = cloneDeep(p);
    pNew.title += " copy";
    return this.insertProfile(pNew);
  }

  insertProfile(p: Profile): Promise<string> {
    return new Promise<string>(resolver => {
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
        this.insertStepsForProfile(p).then(() => resolver(p.id));
      });
    });

  }
  deleteStepForProfileId(id: string): Promise<string[] | undefined> {
    return new Promise<string[] | undefined>(resolver => {
      const v: DeleteStepsForProfileMutationVariables = {
        id: id,

      };

      this._deleteSteps.mutate({ ...v }).subscribe(res => {
        const id = res.data?.deleteFromstepsCollection?.records.map(m => m.id);
        console.log("ID:", id);
        resolver(id);
      });
    });

  }

  deleteProfile(id: string): Promise<string | undefined> {
    return new Promise<string | undefined>(async resolver => {
      const v: DeleteProfileMutationVariables = {
        id: id,
      };
      const stepIds = await this.deleteStepForProfileId(id);
      console.log("Steps deleted ", stepIds);
      this._deleteProfile.mutate(v).subscribe(res => {
        const id = res.data?.deleteFromprofilesCollection?.records[0].id;
        console.log("Deleted Profile ID:", id);
        resolver(id);
      });
    });

  }


  updateProfile(p: Profile): Promise<boolean> {
    return new Promise<boolean>(resolver => {
      const v: profilesUpdateInput = {
        author: p.author,
        beverage_type: p.beverage_type,
        isPublic: p.isPublic,
        notes: p.notes,
        target_volume: p.target_volume,
        target_weight: p.target_weight,
        title: p.title,
        type: p.type,
      };
      this._updateProfile.mutate({ id: p.id, set: v }).subscribe(async res => {
        const id = res.data?.updateprofilesCollection?.records[0].id;
        console.log("ID:", id);
        p.id = id!;
        let i = 0;
        for (const s of p.steps) {
          s.index = i;
          i++;
          if (s.id > 0) {
            await this.updateStep(p, s);
          } else {
            await this.insertStep(p, s);
          }
        }

      });
    });

  }

  updateStep(p: Profile, s: Step): Promise<boolean> {
    return new Promise<boolean>(resolver => {
      const v: stepsUpdateInput = {
        profile_id: p.id,
        exit_condition: s.exit?.condition,
        exit_type: s.exit?.type,
        exit_value: s.exit?.value,
        flow: s.flow,
        pressure: s.pressure,
        index: s.index,
        limiter_range: s.limiter?.range?.toString(),
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
      };

      this._updateSteps.mutate({ id: p.id, set: v }).subscribe(res => {
        const id = res.data?.updatestepsCollection?.records[0].id;
        console.log("ID:", id);
        p.id = id!;
      });
    });

  }

  insertStep(p: Profile, s: Step): Promise<boolean> {
    return new Promise<boolean>(resolver => {
      const v: stepsInsertInput = {
        profile_id: p.id,
        exit_condition: s.exit?.condition,
        exit_type: s.exit?.type,
        exit_value: s.exit?.value,
        flow: s.flow,
        pressure: s.pressure,
        index: s.index,
        limiter_range: s.limiter?.range?.toString(),
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
      };

      this._insertSteps.mutate({ ep: v }).subscribe(res => {
        const id = res.data?.insertIntostepsCollection?.records[0].id;
        console.log("Steps: ID:", id);
        resolver(true);
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
        limiter_range: s.limiter?.range?.toString(),
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

  convertToJson(selectedProfile: Profile) {
    return JSON.stringify(instanceToPlain(selectedProfile), null, 2);
  }

  async saveProfile(selectedProfile: Profile | undefined) {
    const s = this.convertToJson(selectedProfile!);

    this.writeContents(s, selectedProfile?.title + '.json', 'application/json');
    // const s = serialize(selectedProfile);    

  }

  async loadProfile(selectedProfile: Profile | undefined) {
    const s = this.convertToJson(selectedProfile!);

    this.writeContents(s, selectedProfile?.title + '.json', 'application/json');
    // const s = serialize(selectedProfile);    

  }

  writeContents(content: any, fileName: string, contentType: string) {
    var a = document.createElement('a');
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }
}
