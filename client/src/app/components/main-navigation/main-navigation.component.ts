import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import {filter, map, shareReplay} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../services/user.service';
import { Auth } from '@angular/fire/auth';
import { SupabaseService } from '../../services/supabase.service';
import {MatDividerModule} from '@angular/material/divider';
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
    MatDividerModule,
    RouterLink,
  ]
})
export class MainNavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  supabaseSrv = inject(SupabaseService);
  router = inject(Router);
  activated = inject(ActivatedRoute);

  user$: Observable<any>;
  currentUrl: string = '';
  /**
   *
   */
  constructor() {
    this.user$ = this.supabaseSrv.session$;

    console.log("Loading Navigation");
    this.router.events.pipe(
      filter(ev => (ev instanceof NavigationEnd))
    ).subscribe((ev) => {
      console.log((ev as NavigationEnd).url);
      this.currentUrl = (ev as NavigationEnd).url;
    });
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
