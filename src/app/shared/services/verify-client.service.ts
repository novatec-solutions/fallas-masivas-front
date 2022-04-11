import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyClientService {
  public baseUrl!: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.url;
  }

  validar_cuenta(data:any): Observable<any> {
    const url = this.baseUrl + "validar/cuenta";
    return this.http.post<any>(url, data);
  }

  generar_pin(data:any): Observable<any> {
    const url = this.baseUrl + "validar/generar/pin";
    return this.http.post<any>(url, data);
  }

  validar_pin(data:any): Observable<any> {
    const url = this.baseUrl + "validar/pin";
    return this.http.post<any>(url, data);
  }

  consultar_datos(data:any): Observable<any> {
    const url = this.baseUrl + "validar/consultar/datos";
    return this.http.post<any>(url, data);
  }
}