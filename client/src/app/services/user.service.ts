import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/auth';
  constructor(private http: HttpClient) {}


  //get User
  getUser() {
    return this.http.get(`${this.apiUrl}/user`);
  }

}
