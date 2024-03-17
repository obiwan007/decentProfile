import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { SupabaseService } from './services/supabase.service';

export const authGuard = async () => {
    const authService = inject(SupabaseService);
    const router = inject(Router);

    const s = await authService.loadSession();
    if (s?.data.session) {
        return true;
    }
    return router.parseUrl('/landing');
};