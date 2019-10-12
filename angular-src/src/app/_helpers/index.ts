import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtSuperAdminInterceptor } from './jwt-superAdminInterceptor';
import { JwtAdminInterceptor } from './jwt-adminInterceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: JwtSuperAdminInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtAdminInterceptor, multi: true }
]