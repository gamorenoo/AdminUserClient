import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private urlBase = "https://localhost:44300/api/role/";
  constructor(
      private httpClient: HttpClient
  ) { }

  // Optiene la lista de roles
  getAll() {
    return this.httpClient.get(`${this.urlBase}`);
  }

}
