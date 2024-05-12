import {NonNullableFormBuilder} from "@angular/forms"
import {Exclude, Transform, Type} from "class-transformer"
import {Profile} from "./profile";


export class Album {
    id!: string;
    title: string = "My Title";
    userprofiles!: {username: string};
    notes: string = "";
    shared: boolean = false;
    image: string | undefined = "assets/images/anastasiia-chepinska-lcfH0p6emhw-unsplash.jpg";
    // @Exclude({toPlainOnly: true})
    profiles: Profile[] = [];
    @Exclude({toPlainOnly: true})
    __typename!: string;

}
