import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  encrypt(value : string) : string {
    if(typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    var key = CryptoJS.enc.Hex.parse(environment.secretKey);
    var iv  = CryptoJS.enc.Hex.parse(environment.iv)
    return CryptoJS.AES.encrypt(value, key, {
        iv:iv,
        padding: CryptoJS.pad.ZeroPadding
    }).toString();
  }
}
