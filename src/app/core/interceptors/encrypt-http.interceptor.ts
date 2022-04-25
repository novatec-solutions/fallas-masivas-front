import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CryptoService } from '../services/crypto.service';

@Injectable()
export class EncryptHttpInterceptor implements HttpInterceptor {

  constructor(private cryptService: CryptoService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      body: {
        data: this.cryptService.encrypt(req.body)
      },
    });
    return next.handle(request);
  }
}
