import { Routes } from '@angular/router';

import { ProfilesListComponent } from './components/profiles-list/profiles-list.component';
import { ProfileListPageComponent } from './pages/profile-list-page/profile-list-page.component';
import { ProfileEditPageComponent } from './pages/profile-edit-page/profile-edit-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AccountComponent } from './pages/account/account.component';
import { LandingComponent } from './pages/landing/landing.component';
import { authGuard } from './authguard';
import {MyAlbumsPageComponent} from './pages/my-albums/my-albums.component';
import {AlbumsEditPageComponent} from './pages/albums-edit-page/albums-edit-page.component';

export const routes: Routes = [
    {
        path: '', component: ProfileListPageComponent,
        canActivate: [authGuard],
    },
    {
        path: 'profiles', component: ProfileListPageComponent,
        canActivate: [authGuard],
    },
    {
        path: 'myalbums', component: MyAlbumsPageComponent,
        canActivate: [authGuard],
    },
    {
        path: 'myalbums/edit', component: AlbumsEditPageComponent,
        canActivate: [authGuard],
    },
    { path: 'landing', component: LandingComponent },

    {
        path: 'profiles/edit', component: ProfileEditPageComponent,
        canActivate: [authGuard],
    },
    {
        path: 'login',
        component: AuthComponent,
    },
    {
        path: 'account',
        component: AccountComponent,
        canActivate: [authGuard],
    },
    // {
    //     path: '', redirectTo: '/profiles', pathMatch: 'full',
    //     canActivate: [authGuard],
    // },
    { path: '**', component: PageNotFoundComponent }
];
