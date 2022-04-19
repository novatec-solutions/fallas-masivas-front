import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataOperationService {

  constructor() { }

  contactMask (data: string, max: number) {
    return data.substring(0,max) + "*".repeat(4);
  }

  emailMask (email: string) {
    let [inicial, final] = email.split("@");
    let inicio = inicial;
    let fin = "*".repeat(final.length);
    return inicio + "*" + fin;
  };
}
