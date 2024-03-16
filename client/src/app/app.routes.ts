import { Routes } from '@angular/router';

import { ProfilesListComponent } from './components/profiles-list/profiles-list.component';
import { ProfileListPageComponent } from './pages/profile-list-page/profile-list-page.component';
import { ProfileEditPageComponent } from './pages/profile-edit-page/profile-edit-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AccountComponent } from './pages/account/account.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
    { path: 'landing', component: LandingComponent },
    { path: 'profiles', component: ProfileListPageComponent },
    { path: 'profiles/edit', component: ProfileEditPageComponent },
    {
        path: 'login',
        component: AuthComponent,
    },
    {
        path: 'account',
        component: AccountComponent,
    },
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
