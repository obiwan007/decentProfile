import { Injectable } from '@angular/core'
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Provider,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import { environment } from '../../environments/environment'
import { BehaviorSubject } from 'rxjs'

export interface UserProfile {
  id?: string
  username: string
  website: string
  avatar_url: string
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient
  _session: AuthSession | null = null

  _session$: BehaviorSubject<AuthSession | null>;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
    this._session$ = new BehaviorSubject<AuthSession | null>(null);

    this.authChanges((_, s) => {

      this._session$.next(s);
      this._session = s;
      console.log("SESSION:", this._session);
    })
  }

  get session$() {
    return this._session$.asObservable();
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  userprofile(user: User) {
    return this.supabase
      .from('userprofiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  signInOtp(email: string) {
    return this.supabase.auth.signInWithOtp({ email })
  }

  signInOAuth(provider: Provider) {
    return this.supabase.auth.signInWithOAuth({ provider: provider })
  }

  signInPwd(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password })
  }

  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password })
  }

  signOut() {
    return this.supabase.auth.signOut()
  }

  updateUserProfile(profile: UserProfile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    }

    return this.supabase.from('userprofiles').upsert(update)
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file)
  }


}