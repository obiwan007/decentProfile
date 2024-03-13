import { Routes } from '@angular/router';

import { ProfilesListComponent } from './components/profiles-list/profiles-list.component';
import { ProfileListPageComponent } from './pages/profile-list-page/profile-list-page.component';
import { ProfileEditPageComponent } from './pages/profile-edit-page/profile-edit-page.component';
import { LogicComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AccountComponent } from './pages/account/account.component';

export const routes: Routes = [
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
    { path: '', redirectTo: '/profiles', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
