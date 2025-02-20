import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  constructor(private http: HttpClient) {}

  loginAdmin(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`https://localhost:7211/api/Admin/login-admin`, credentials);
  }

}
