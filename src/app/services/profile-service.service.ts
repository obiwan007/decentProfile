import { Injectable } from '@angular/core';
import { Profile } from '../models/profile';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { plainToClassFromExist } from 'class-transformer';
import 'reflect-metadata';

@Injectable({
  providedIn: 'root',
  // deps: [HttpClientModule]
})
export class ProfileServiceService {

  constructor(private _http: HttpClient) { }

  getProfileById(id: string): Profile {
    console.log("Loading Profile");

    const p = new Profile();
    this._http.get('assets/profiles/Default.json', { responseType: 'text' })
      .subscribe(data => {
        const raw = JSON.parse(data);
        console.log("Raw:", raw);
        plainToClassFromExist(p, raw);
        console.log(p)
      });
    return p;
  }
}
