import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/_services/admin.service';

@Injectable()
export class JwtAdminInterceptor implements HttpInterceptor {
    public headers: HttpHeaders;
    constructor(private adminServ: AdminService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.adminServ.isLoggedIn()){
            const jwtToken = this.adminServ.getAuthorizationToken();

            request = request.clone({
                setHeaders: { Authorization: 'Bearer ' + jwtToken}
            });
        }
        return next.handle(request);
    }
}
