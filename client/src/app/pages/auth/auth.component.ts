import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { SupabaseService } from '../../services/supabase.service'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  loading = false

  signInForm = this.formBuilder.group({
    email: '',
    password: '',
  })

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder
  ) { }

  async onSubmit(): Promise<void> {
    try {
      this.loading = true
      const email = this.signInForm.value.email as string
      const { error } = await this.supabase.signInOtp(email)
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.signInForm.reset()
      this.loading = false
    }
  }

  async signInPassword(doSignUp: boolean): Promise<void> {
    try {
      this.loading = true
      const email = this.signInForm.value.email as string
      const password = this.signInForm.value.password as string
      if (doSignUp) {
        const { error } = await this.supabase.signUp(email, password)
        if (error) throw error

      } else {
        const { error } = await this.supabase.signInPwd(email, password)
        if (error) throw error
      }

    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.signInForm.reset()
      this.loading = false
    }
  }
}
