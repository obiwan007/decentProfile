import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { AuthSession } from '@supabase/supabase-js'
import { UserProfile, SupabaseService } from '../../services/supabase.service'
import { CommonModule } from '@angular/common'
import { Observable, Subscription } from 'rxjs'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatInputModule, MatLabel],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit, OnDestroy {
  loading = false
  profile!: UserProfile


  session: AuthSession;

  session$: Observable<AuthSession | null>;

  updateProfileForm = this.formBuilder.group({
    username: '',
    website: '',
    avatar_url: '',
  })

  subscriptions: Subscription[] = [];

  constructor(
    private readonly supabase: SupabaseService,
    private formBuilder: FormBuilder,

  ) {

    this.session = this.supabase.session!;
    this.session$ = this.supabase.session$;

  }

  async ngOnInit(): Promise<void> {
    this.subscriptions.push(this.session$.subscribe(async s => {
      if (s) {
        this.session = s;
        await this.getProfile()

        const { username, website, avatar_url } = this.profile
        this.updateProfileForm.patchValue({
          username,
          website,
          avatar_url,
        })
      }
    }));

  }

  ngOnDestroy() {
    console.log("Destroy called");
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  async getProfile() {
    try {
      this.loading = true
      const { user } = this.session
      const { data: profile, error, status } = await this.supabase.userprofile(user)

      if (error && status !== 406) {
        throw error
      }

      if (profile) {
        this.profile = profile
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }

  async updateProfile(): Promise<void> {
    try {
      this.loading = true
      const { user } = this.session

      const username = this.updateProfileForm.value.username as string
      const website = this.updateProfileForm.value.website as string
      const avatar_url = this.updateProfileForm.value.avatar_url as string

      const { error } = await this.supabase.updateUserProfile({
        id: user.id,
        username,
        website,
        avatar_url,
      })
      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }

  async signOut() {
    await this.supabase.signOut()
  }
}