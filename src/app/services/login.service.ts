import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtRequest } from '../models/jwt-request';




@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  login(request: JwtRequest) {
    return this.http.post("https://bitfood-backend.onrender.com/auth/login", request);
  }
  verificar() {
    let token = sessionStorage.getItem("token");
    return token != null;

  }
}
