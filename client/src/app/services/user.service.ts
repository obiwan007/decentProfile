import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';
import { Auth, user, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth'

export type CreateUserRequest = { displayName: string, password: string, email: string, role: string }
export type UpdateUserRequest = { uid: string } & CreateUserRequest

@Injectable({
  providedIn: 'root'
})
export class UserService {

  afAuth = inject(Auth);
  userdata$: Observable<User | null>;

  constructor(
    private http: HttpClient
  ) {
    this.userdata$ = user(this.afAuth);
  }

  user$(id: string): Observable<User | null> {
    return this.userdata$;
  }



}