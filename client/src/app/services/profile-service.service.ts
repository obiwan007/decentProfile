import {Injectable, inject} from '@angular/core';
import {Exit, Limiter, Profile, ProfileType, PumpMode, Step, TransitionMode} from '../models/profile';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {instanceToPlain, plainToClassFromExist, serialize} from 'class-transformer';
import {Observable, of as observableOf, merge, BehaviorSubject, map} from 'rxjs';
import 'reflect-metadata';
import {
  DeleteProfileGQL,
  DeleteProfileMutationVariables,
  DeleteStepsForProfileGQL,
  DeleteStepsForProfileMutationVariables,
  InsertProfilesGQL, InsertStepsGQL, ProfileDetailsDocument, ProfileDetailsGQL, ProfileDetailsQuery, ProfileDetailsQueryVariables, ProfilesListQuery, UpdateProfilesGQL, UpdateStepsGQL, profilesInsertInput, profilesUpdateInput,
  stepsInsertInput, stepsUpdateInput
} from '../graphql/generated';
import {ResultData} from '../models/dataWithPageinfo';
import {cloneDeep} from '@apollo/client/utilities';

@Injectable({
  providedIn: 'root',
  // deps: [HttpClientModule]
})
export class ProfileServiceService {


  tclSample = `advanced_shot {}
  author Decent
  beverage_type espresso
  espresso_decline_time 35
  espresso_hold_time 4
  espresso_pressure 8.6
  espresso_temperature 90.0
  espresso_temperature_0 90.0
  espresso_temperature_1 88.0
  espresso_temperature_2 88.0
  espresso_temperature_3 88.0
  espresso_temperature_steps_enabled 1
  final_desired_shot_volume 36
  final_desired_shot_volume_advanced 0
  final_desired_shot_volume_advanced_count_start 0
  final_desired_shot_weight 36
  final_desired_shot_weight_advanced 36
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
  profile_hide 0
  profile_language en
  profile_notes {This profile is gentle on the coffee puck and not too demanding on the barista.  Produces a very acceptable espresso in a wide variety of settings.}
  profile_title Default
  profile_video_help https://www.youtube.com/watch?v=zj-Ipuu6XGU
  read_only 1
  settings_profile_type settings_2a
  tank_desired_water_temperature 0
  water_temperature 80`


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

  exportTCL(p: Profile): string[] {
    const t: string[] = [];


    t.push(`profile_title {${p.title}}`);
    t.push(`author {${p.author}}`);
    t.push(`profile_notes {${p.notes}}`);
    t.push(`beverage_type ${p.type}`);

    t.push(`tank_desired_water_temperature ${p.tank_temperature}`);
    t.push(`final_desired_shot_volume ${p.target_volume}`);
    t.push(`final_desired_shot_weight ${p.target_weight}`);

    switch (p.type) {
      case ProfileType.advanced:
        t.push('settings_profile_type settings_2c');
        this.exportAdvancedTCL(p, t);
        break;
      case ProfileType.flow:
        t.push("advanced_shot {}");
        t.push('settings_profile_type settings_2b');
        this.exportFlowTCL(p, t);
        break;
      case ProfileType.pressure:
        t.push("advanced_shot {}");
        t.push('settings_profile_type settings_2a');

        this.exportPressureTCL(p, t);

        break;
    }
    return t;
  }

  exportAdvancedTCL(p: Profile, t: string[]) {
    let step = "";
    p.steps.forEach((s, i) => {
      step += "{ ";
      step += `name {${s.name}} `;
      step += `temperature ${s.temperature} `;
      step += `sensor ${s.sensor} `;
      step += `pressure ${s.pressure} `;
      step += `pump ${s.pump} `;
      step += `flow ${s.flow} `;
      step += `seconds ${s.seconds} `;
      if (s.weight > 0)
        step += `weight ${s.weight} `;
      if (s.volume > 0)
        step += `volume ${s.volume} `;

      if (s.limiter) {
        step += `maximum_pressure ${s.limiter.value} `;
        step += `maximum_pressure_range_default ${s.limiter.range} `;
      }

      if (s.exit) {
        step += `exit_if 1 `;
        if (s.exit.type === "pressure") {
          if (s.exit.condition === "over") {
            step += `exit_type pressure_over `;
            step += `exit_pressure_over ${s.exit.value} `;
          } else {
            step += `exit_type pressure_under `;
            step += `exit_pressure_under ${s.exit.value} `;
          }
        }
        else if (s.exit.type === "flow") {
          if (s.exit.condition === "over") {
            step += `exit_type flow_over `;
            step += `exit_flow_over ${s.exit.value} `;
          } else {
            step += `exit_type flow_under `;
            step += `exit_flow_under ${s.exit.value} `;
          }
        }
        step += `transition ${s.transition} } `;
      }

    });
    t.push(`advanced {${step}}`);
    t.push(`final_desired_shot_weight_advanced ${p.target_weight}`);
    t.push(`final_desired_shot_volume_advanced ${p.target_volume}`);

  }
  exportPressureTCL(p: Profile, t: string[]) {
    p.steps.forEach(s => {

      if (s.name === "preinfusion") {
        t.push(`preinfusion_flow_rate ${s.flow}`);
        t.push(`espresso_temperature_0 ${s.temperature}`);
        t.push(`preinfusion_stop_pressure ${s.exit?.value}`);
        t.push(`preinfusion_time ${s.seconds}`);
      }
      else if (s.name === "forced rise without limits") {
        t.push(`espresso_temperature_1 ${s.temperature}`);
        t.push(`espresso_hold_time ${s.seconds + 3}`);
        t.push(`espresso_pressure ${s.pressure}`);
      }
      else if (s.name === "rise and hold") {
        t.push(`espresso_temperature_2 ${s.temperature}`);
        t.push(`espresso_hold_time ${s.seconds}`);
        t.push(`espresso_pressure ${s.pressure}`);

        if (s.limiter) t.push(`maximum_flow ${s.limiter.value}`)
      }
      else if (s.name === "decline") {
        t.push(`espresso_decline_time ${s.seconds}`);
        t.push(`pressure_end ${s.pressure}`);
        t.push(`espresso_temperature_3 ${s.temperature}`);
      }


    });

  }
  exportFlowTCL(p: Profile, t: string[]) {
    p.steps.forEach(s => {

      if (s.name === "preinfusion boost") {
        t.push(`preinfusion_flow_rate ${s.flow}`);
        t.push(`espresso_temperature_0 ${s.temperature}`);
        t.push(`preinfusion_stop_pressure ${s.exit?.value}`);
        t.push(`preinfusion_time ${s.seconds}`);
      }
      else if (s.name === "preinfusion") {
        t.push(`espresso_temperature_1 ${s.temperature}`);
        t.push(`preinfusion_flow_rate ${s.flow}`);
        t.push(`espresso_hold_time ${s.seconds + 3}`);
        t.push(`espresso_pressure ${s.pressure}`);
      }
      else if (s.name === "hold") {
        t.push(`espresso_temperature_2 ${s.temperature}`);
        t.push(`espresso_hold_time ${s.seconds}`);
        t.push(`flow_profile_hold ${s.flow}`);

        if (s.limiter) {
          t.push(`maximum_pressure ${s.limiter.value}`)
          t.push(`maximum_pressure_range_default ${s.limiter.range}`)
        }
      }
      else if (s.name === "decline") {
        t.push(`espresso_decline_time ${s.seconds}`);
        t.push(`flow_profile_decline ${s.flow}`);
        t.push(`espresso_temperature_3 ${s.temperature}`);
        if (s.limiter) {
          t.push(`maximum_pressure ${s.limiter.value}`)
          t.push(`maximum_pressure_range_default ${s.limiter.range}`)
        }
      }


    });

  }

  getProfileFromTCL(tcl: string) {
    let p = new Profile();
    const lines = tcl.split('\n');

    const params: {[key: string]: any} = {};

    lines.forEach(l => {
      l = l.trim();
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
  advancedProfile(params: {[key: string]: any;}, p: Profile) {
    const adv_shot: string = params["advanced_shot"].substring(1, params["advanced_shot"].length - 1);
    console.log("Adv:", adv_shot);
    // console.log("Adv:", adv_shot.split(/[\{\}]+/).filter((f: any) => console.log("Shot:", f)));

    // console.log("Adv3:", adv_shot.match(/[^\{\}]+/g));
    const steps = this.tokenizeSteps(adv_shot);
    p.steps = [];
    steps.forEach(sLine => {
      const step = new Step();
      p.steps.push(step);
      const step_dict: {[key: string]: any} = {};
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

  flowProfile(params: {[key: string]: any;}, p: Profile) {
    const temp = +params["espresso_temperature"];

    const deg = temp < 110 ? "C" : "F";
    p.steps = [];
    let temp_bump_time_seconds = 0;
    let first_frame_len = 0;
    let second_frame_len = 0;
    if (params["espresso_temperature_steps_enabled"] === "1") {
      temp_bump_time_seconds = +2;
      first_frame_len = temp_bump_time_seconds;
      second_frame_len = Math.max(0, +params["preinfusion_time"] - temp_bump_time_seconds);
    } else {
      console.log(`temp ${temp}${deg}`)
      second_frame_len = +params["preinfusion_time"]
      params["espresso_temperature_0"] = temp;
      params["espresso_temperature_1"] = temp;
      params["espresso_temperature_2"] = temp;
      params["espresso_temperature_3"] = temp;
    }

    p.steps.forEach(s => s.sensor = "coffee");

    // Pre Boost
    if (first_frame_len > 0) {
      const preBoost = new Step();
      preBoost.pressure = 1;
      preBoost.sensor = "coffee"
      preBoost.flow = +params["preinfusion_flow_rate"];;
      preBoost.name = "preinfusion boost";
      preBoost.temperature = +params["espresso_temperature_0"];
      preBoost.exit = new Exit();
      preBoost.exit.condition = "over";
      preBoost.exit.type = "pressure";
      preBoost.exit.value = +params["preinfusion_stop_pressure"];
      preBoost.seconds = first_frame_len;
      p.steps.push(preBoost);
    }

    // preinfusion
    if (second_frame_len > 0) {
      const pre = new Step();
      pre.seconds = +second_frame_len;
      pre.temperature = +params["espresso_temperature_1"];
      pre.flow = +params["preinfusion_flow_rate"];
      pre.pressure = 1;
      pre.name = "preinfusion";
      pre.transition = TransitionMode.fast;
      pre.pump = PumpMode.flow;
      pre.sensor = "coffee";
      p.steps.push(pre);
    }

    // rise and hold    
    if (+params["espresso_hold_time"] > 0) {
      const hold = new Step();
      hold.name = "hold";
      hold.seconds = +params["espresso_hold_time"];
      hold.transition = TransitionMode.fast;;
      hold.flow = +params["flow_profile_hold"];
      hold.temperature = +params["espresso_temperature_2"];
      hold.pump = PumpMode.flow;
      hold.sensor = "coffee";
      hold.pressure = 0;
      hold.volume = 0;
      hold.weight = 0;
      hold.limiter = new Limiter();
      hold.limiter.value = +params["maximum_pressure"];
      hold.limiter.range = +params["maximum_pressure_range_default"];
      p.steps.push(hold);
    }

    // decline
    if (+params["espresso_hold_time"] > 0) {
      const dec = new Step();
      dec.seconds = +params["espresso_decline_time"];
      dec.name = "decline";
      dec.temperature = +params["espresso_temperature_3"];
      dec.sensor = "coffee";
      dec.pump = PumpMode.flow;
      dec.transition = TransitionMode.smooth;
      dec.flow = +params["flow_profile_decline"];
      dec.pressure = 0;
      dec.volume = 0;
      dec.weight = 0;
      dec.limiter = new Limiter();
      dec.limiter.value = +params["maximum_pressure"];
      dec.limiter.range = +params["maximum_pressure_range_default"];
      p.steps.push(dec);
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
  pressureProfile(params: {[key: string]: any;}, p: Profile) {
    const temp = +params["espresso_temperature"];

    const deg = temp < 110 ? "C" : "F";


    const sPreTemp = new Step();
    const sPre = new Step();
    const sRiseWithoutLimit = new Step();
    const sRiseHold = new Step();
    const sDecline = new Step();

    p.steps = [];

    if (params["espresso_temperature_steps_enabled"] === "1") {
      sPreTemp.temperature = +params["espresso_temperature_0"];
      sPre.temperature = +params["espresso_temperature_0"];
      sRiseWithoutLimit.temperature = +params["espresso_temperature_1"];
      sRiseHold.temperature = +params["espresso_temperature_2"];
      sDecline.temperature = +params["espresso_temperature_3"];
    } else {

    }

    sPreTemp.name = "preinfusion temp boost";
    sPreTemp.pump = PumpMode.flow;
    sPreTemp.transition = TransitionMode.fast;
    sPreTemp.sensor = "coffee";
    sPreTemp.pressure = 1;
    sPreTemp.flow = +params["preinfusion_flow_rate"];
    sPreTemp.exit = new Exit();
    sPreTemp.exit.condition = "over";
    sPreTemp.exit.type = "pressure";
    sPreTemp.exit.value = +params["preinfusion_stop_pressure"];
    sPreTemp.seconds = 2;
    p.steps.push(sPreTemp);

    // preinfusion
    sPre.seconds = +params["preinfusion_time"];
    sPre.flow = +params["preinfusion_flow_rate"];
    sPre.name = "preinfusion";
    sPre.pump = PumpMode.flow;
    sPre.pressure = 1;
    sPre.exit = new Exit();
    sPre.exit.condition = "over";
    sPre.exit.type = "pressure";
    sPre.exit.value = +params["preinfusion_stop_pressure"];
    p.steps.push(sPre);

    // forced rise without limits

    if (params["espresso_hold_time"]) {
      if (+params["espresso_hold_time"] > 3) {
        sRiseWithoutLimit.name = "forced rise without limits";
        sRiseWithoutLimit.pump = PumpMode.pressure;
        sRiseWithoutLimit.temperature = +params["espresso_temperature_2"];
        sRiseWithoutLimit.transition = TransitionMode.fast;
        sRiseWithoutLimit.sensor = "coffee";
        sRiseWithoutLimit.pressure = +params["espresso_pressure"];;
        sRiseWithoutLimit.flow = 0;
        sRiseWithoutLimit.seconds = +params["espresso_hold_time"] - 3;

        p.steps.push(sRiseWithoutLimit);
      }
    }

    // rise and hold
    sRiseHold.seconds = +params["espresso_hold_time"];
    sRiseHold.pressure = +params["espresso_pressure"];
    sRiseHold.name = "rise and hold";
    sRiseHold.pump = PumpMode.pressure;
    console.log(`rise and hold: ${sRiseHold.pressure} bar for ${sRiseHold.seconds} seconds`);
    if (params["maximum_flow"]) {
      sRiseHold.limiter = new Limiter();
      sRiseHold.limiter.value = +params["maximum_flow"];
      console.log(`limit flow to ${sRiseHold.limiter.value} ml/s)`)
    }
    sRiseHold.flow = 0;
    p.steps.push(sRiseHold);


    // Second forced rise without limit
    if (+params["espresso_decline_time"] > 0) {
      if (+params["espresso_hold_time"] < 3 && +params["espresso_decline_time"] > 3) {
        const s = new Step();
        s.name = "forced rise without limits";
        s.pump = PumpMode.pressure;
        s.temperature = +params["espresso_temperature_3"];
        s.transition = TransitionMode.fast;
        s.sensor = "coffee";
        s.pressure = +params["espresso_pressure"];;
        s.flow = 0;
        s.seconds = +params["espresso_decline_time"] - 3;

        p.steps.push(s);
      }
    }


    // decline
    sDecline.seconds = + params["espresso_decline_time"];
    sDecline.name = "decline";
    sDecline.pump = PumpMode.pressure;
    if (sDecline.seconds > 0) {
      sDecline.pressure = +params["pressure_end"];
      console.log(`decline: ${sDecline.pressure} bar over ${sDecline.seconds} seconds`);
    }
    else {
      console.log('decline: none');
    }
    sDecline.transition = TransitionMode.smooth;
    sDecline.pump = PumpMode.pressure;
    sDecline.sensor = "coffee";
    sDecline.flow = 0;
    p.steps.push(sDecline);





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
      const node: any = {...e.node};
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
      const node: any = {...e.node};
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
      this._http.get(`assets/profiles/${id}`, {responseType: 'text'})
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
        target_volume_count_start: p.target_volume_count_start,
        tank_temperature: p.tank_temperature,
        title: p.title,
        type: p.type,
      };
      this._insertProfile.mutate({ep: [v]}).subscribe(res => {
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

      this._deleteSteps.mutate({...v}).subscribe(res => {
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
        target_volume_count_start: p.target_volume_count_start,
        tank_temperature: p.tank_temperature,
        title: p.title,
        type: p.type,
      };
      this._updateProfile.mutate({id: p.id, set: v}).subscribe(async res => {
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

      this._updateSteps.mutate({id: p.id, set: v}).subscribe(res => {
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

      this._insertSteps.mutate({ep: v}).subscribe(res => {
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

      this._insertSteps.mutate({ep: v}).subscribe(res => {
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

  async saveProfileTCL(selectedProfile: Profile | undefined) {

    if (selectedProfile) {
      const lines = this.exportTCL(selectedProfile);
      const s = lines.join('\n');
      console.log("TCL", s);
      this.writeContents(s, selectedProfile?.title + '.tcl', 'application/text');
    }
  }

  async loadProfile(selectedProfile: Profile | undefined) {
    const s = this.convertToJson(selectedProfile!);

    this.writeContents(s, selectedProfile?.title + '.json', 'application/json');
    // const s = serialize(selectedProfile);    

  }

  writeContents(content: any, fileName: string, contentType: string) {
    var a = document.createElement('a');
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }
}
