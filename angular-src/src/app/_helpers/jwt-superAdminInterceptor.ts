import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuperAdminService } from 'src/app/_services/super-admin.service';

@Injectable()
export class JwtSuperAdminInterceptor implements HttpInterceptor {
    public headers: HttpHeaders;
    constructor(private superAdminServ: SuperAdminService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.superAdminServ.isLoggedIn()){
            const jwtToken = this.superAdminServ.getAuthorizationToken();

            request = request.clone({
                setHeaders: { Authorization: 'Bearer ' + jwtToken}
            });
        }
        return next.handle(request);
    }
}