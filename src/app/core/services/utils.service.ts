import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  contactMask (data: string) {
    const substring = data.substring(6,data.length);
    return data.substring(0,6) + "*".repeat(substring.length);
  }
}
