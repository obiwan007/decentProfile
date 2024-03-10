import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, user, signInWithRedirect, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth'
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatInputModule],
})
export class LogicComponent {
  afAuth = inject(Auth);
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['markus.miertschink@hotmail.com', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;
  auth: Auth;
  userdata$: Observable<User | null>;;

  constructor(_auth: Auth) {
    this.auth = _auth;
    this.userdata$ = user(this.auth);
    console.log()
  }

  async onSubmit(): Promise<void> {
    try {
      const { email, password } = this.form.value
      const creds = await signInWithEmailAndPassword(this.auth, email!, password!)
      console.log(creds)
      localStorage.setItem('token', 'true');
      this.router.navigate(['profiles']);
    } catch (err) {
      console.log(err)
      localStorage.setItem('token', 'false');
    }
  }

  async login() {
    try {
      await signInWithPopup(this.auth, new GoogleAuthProvider());
      localStorage.setItem('token', 'true');
    } catch (err) {
      console.log(err)
      localStorage.setItem('token', 'false');
    }
  }

  logout() {
    this.auth.signOut();
  }
}