import { AuthTokenService } from './../../services/auth-token.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private authTokenService: AuthTokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
        let authRequest : any;
        if(this.authTokenService.getToken() !== undefined){
            authRequest = req.clone({
                setHeaders: {
                    'Authorization' : 'Bearer '+ this.authTokenService.getToken()
                }
            });
            return next.handle(authRequest);
        } else {
            return next.handle(req);
        }
    }
}
