import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        // change api url
        const urlReq = req.clone(
            { url: `https://pulseapi.tk${req.url}` }
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

            return next.handle(apiReq);
        }

        return next.handle(urlReq);

    }
}
