import { NonNullableFormBuilder } from "@angular/forms"
import { Transform, Type } from "class-transformer"


export enum ProfileType {
    flow = "flow",
    pressure = "pressure",
    advanced = "advanced",
}

export enum PumpMode {
    flow = "flow",
    pressure = "pressure",
}
export enum TransitionMode {
    fast = "fast",
    smooth = "smooth",
}

export enum SensorType {
    coffee = "coffee",
    smooth = "water",
}

export class Profile {
    title!: string
    author!: string
    notes!: string
    beverage_type!: string
    @Type(() => Step)
    steps!: Step[]
    @Type(() => Number)
    tank_temperature!: string
    @Type(() => Number)
    target_weight!: string
    @Type(() => Number)
    target_volume!: string
    @Type(() => Number)
    target_volume_count_start!: string
    legacy_profile_type!: string
    type!: ProfileType
    lang!: string
    hidden!: string
    reference_file!: string
    changes_since_last_espresso!: string
    version!: string
}

export class Step {
    name!: string
    @Type(() => Number)
    temperature!: number;
    sensor!: string;
    pump!: PumpMode;
    transition!: TransitionMode;
    @Type(() => Number)
    pressure!: number;
    @Type(() => Number)
    flow!: number
    @Type(() => Number)
    seconds!: number
    @Type(() => Number)
    volume!: number
    @Type(() => Number)
    weight!: number
    @Type(() => Exit)
    exit?: Exit
    @Type(() => Limiter)
    limiter?: Limiter
}

export class Exit {
    type!: string
    condition!: string
    @Type(() => Number)
    value!: string
}

export class Limiter {
    @Type(() => Number)
    value!: number
    range!: string
}
