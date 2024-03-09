import { Routes } from '@angular/router';

import { ProfilesListComponent } from './components/profiles-list/profiles-list.component';
import { ProfileListPageComponent } from './pages/profile-list-page/profile-list-page.component';
import { ProfileEditPageComponent } from './pages/profile-edit-page/profile-edit-page.component';

export const routes: Routes = [
    { path: 'profiles', component: ProfileListPageComponent },
    { path: 'profiles/edit', component: ProfileEditPageComponent },

];
