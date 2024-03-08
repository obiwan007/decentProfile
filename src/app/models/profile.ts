import { NonNullableFormBuilder } from "@angular/forms"
import { Type } from "class-transformer"

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
    type!: string
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
    pump!: string;
    transition!: string;
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
