import { NonNullableFormBuilder } from "@angular/forms"
import { Exclude, Transform, Type } from "class-transformer"

export class Favorite {
    id!: string
    label: string = "label";
    group_id: string | undefined;
    profile_id: string | undefined;
    @Type(() => Boolean)
    isGroup: boolean = false
    @Type(() => Boolean)
    isSeperator: boolean = false
    @Exclude({ toPlainOnly: true })
    __typename!: string;

}
