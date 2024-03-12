import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { BehaviorSubject, Observable, map } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { Session } from '@supabase/supabase-js';
//import { Auth, user, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth'

export type CreateUserRequest = { displayName: string, password: string, email: string, role: string }
export type UpdateUserRequest = { uid: string } & CreateUserRequest

@Injectable({
  providedIn: 'root'
})
export class UserService {
  session = this.supabase.session
  userdata$: BehaviorSubject<Session | null>;

  constructor(
    private http: HttpClient,
    private readonly supabase: SupabaseService
  ) {
    this.userdata$ = new BehaviorSubject<Session | null>(null);

    this.supabase.authChanges((_, session) => {
      this.session = session;
      this.userdata$.next(session);
      console.log("SESSION:", this.session);
    })
  }


  user$(): Observable<Session | null> {
    return this.userdata$.asObservable();
  }
  logout() {
    // this.auth.signOut();
  }


}