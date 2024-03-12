import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../services/user.service';
import { Auth } from '@angular/fire/auth';
import { SupabaseService } from '../../services/supabase.service';
@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrl: './main-navigation.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    MatMenuModule,
  ]
})
export class MainNavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  user$ = inject(UserService).user$();

  userSrv = inject(UserService);
  supabaseSrv = inject(SupabaseService);
  router = inject(Router);
  /**
   *
   */
  constructor() {
    console.log("Loading Navigation");
  }
  login() {
    this.router.navigateByUrl('/login');
  }
  account() {
    this.router.navigateByUrl('/account');
  }

  logout() {
    this.supabaseSrv.signOut();
  }
}
