import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase = "https://localhost:44300/api/user/";
  constructor(
      private httpClient: HttpClient
  ) { }

  // Optiene la lista de usuaiors
  getAll() {
    return this.httpClient.get(`${this.urlBase}`);
  }

  // Optiene un usuario por su codigo 
  getByCode(code: string) {
    return this.httpClient.get(`${this.urlBase}${code}`);
  }

  // login
  login(code: string, pass: string) {
    return this.httpClient.get(`${this.urlBase}login?code=${code}&password=${pass}`);
  }

}
