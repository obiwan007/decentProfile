import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take, switchMap } from "rxjs";
import { Auth, idToken } from '@angular/fire/auth'

@Injectable({ providedIn: 'root' })
export class AuthTokenHttpInterceptor implements HttpInterceptor {

    constructor(
        private auth: Auth
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return idToken(this.auth).pipe(
            take(1),
            switchMap(idToken => {
                let clone = req.clone()
                if (idToken) {
                    clone = clone.clone({ headers: req.headers.set('Authorization', 'Bearer ' + idToken) });
                }
                return next.handle(clone)
            })
        )

    }
}

export const AuthTokenHttpInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenHttpInterceptor,
    multi: true
}