import { NonNullableFormBuilder } from "@angular/forms"
import { Exclude, Transform, Type } from "class-transformer"


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
    id!: string
    title!: string
    author!: string
    notes!: string
    beverage_type!: string
    @Type(() => Step)
    steps!: Step[]
    @Type(() => Number)
    tank_temperature!: string
    @Type(() => Number)
    target_weight: number = 0;
    @Type(() => Number)
    target_volume: number = 0;
    @Type(() => Number)
    target_volume_count_start!: string
    legacy_profile_type!: string
    type!: ProfileType
    lang!: string
    hidden!: string
    reference_file!: string
    changes_since_last_espresso!: string
    version!: string
    @Exclude({ toPlainOnly: true })
    isPublic: boolean = false
    @Type(() => Boolean)
    @Exclude({ toPlainOnly: true })
    isDefault: boolean = false
    @Exclude({ toPlainOnly: true })
    __typename!: string;

}

export class Step {
    @Exclude({ toPlainOnly: true })
    __typename!: string;
    @Exclude({ toPlainOnly: true })
    id!: number;
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
    seconds: number = 0
    @Type(() => Number)
    volume!: number
    @Type(() => Number)
    weight!: number
    @Type(() => Exit)
    exit?: Exit
    @Type(() => Limiter)
    limiter?: Limiter
    @Exclude({ toPlainOnly: true })
    isPublic: boolean = false
    @Exclude({ toPlainOnly: true })
    index!: number;
    @Exclude({ toPlainOnly: true })
    profile_id!: number;
}

export class Exit {
    type!: string
    condition!: string
    @Type(() => Number)
    value!: number
}

export class Limiter {
    @Type(() => Number)
    value!: number
    @Type(() => Number)
    range!: number
}
