import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PinService {
  public baseUrl!: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.url;
  }

  generar_pin(data:any): Observable<any> {
    const url = this.baseUrl + "pin/generar";
    return this.http.post<any>(url, data);
  }

  validar_pin(data:any): Observable<any> {
    const url = this.baseUrl + "pin/validar";
    return this.http.post<any>(url, data);
  }
}
