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

  get_address_list(data:any): Observable<any> {
    const url = this.baseUrl + "cliente/cuenta";
    return this.http.post<any>(url, data);
  }

  operation_record(data:any):Observable<any> {
    const url = this.baseUrl + "auditoria/registrar";
    return this.http.post<any>(url, data);
  }

  get_equipment_list(data:any): Observable<any> {
    const url = "http://localhost:3000/servicios/consultar";
    // const url = this.baseUrl + "servicios/consultar";
    return this.http.post<any>(url, data);
  }
}
