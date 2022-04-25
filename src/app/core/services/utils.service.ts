import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  contactMask (data: string, num: number) {
    return "*".repeat(num) + data.substring(num,data.length);
  }
}
