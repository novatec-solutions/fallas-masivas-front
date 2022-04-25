import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public baseUrl!: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.url;
  }

  consultar_datos(data:any): Observable<any> {
    const url = this.baseUrl + "validar/consultar/datos";
    return this.http.post<any>(url, data);
  }
}
