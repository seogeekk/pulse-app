import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // change api url
        const urlReq = req.clone(
            { url: `https://pulsydemo.tk:444${req.url}` }
            );
        // set headers
        if (req.url !== '/authenticate') {
            const apiReq = urlReq.clone(
                {setHeaders: {
                        'x-access-token': localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }}
            );

            return next.handle(apiReq)
                .catch(err => {
                    // onError
                    console.log(err);
                    if (err instanceof HttpErrorResponse) {
                        console.log(err.status);
                        console.log(err.statusText);
                        if (err.status === 403) {
                            localStorage.clear();
                            window.location.href = '#/login';
                        }
                    }
                    return Observable.throw(err);
                }) as any;
        }

        return next.handle(urlReq);

    }
}
