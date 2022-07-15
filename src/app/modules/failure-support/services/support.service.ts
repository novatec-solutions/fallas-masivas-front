import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  public baseUrl!: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.url;
  }
  activate_package(data:any):Observable<any> {
    const url = "http://localhost:3000/paquetes/activar";
    // const url = this.baseUrl + "paquetes/activar";
    return this.http.post<any>(url, data);
  }
}
