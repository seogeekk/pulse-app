import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // change api url
        const urlReq = req.clone(
            { url: `https://pulseapi.tk/${req.url}` }
            );
        // set headers
        const apiReq = urlReq.clone(
            {setHeaders: {
                    //Authorization: `Bearer ${localStorage.get('token')}`
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }}
        )
        return next.handle(apiReq);
    }
}