import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api/auth';
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  register(
    username: string,
    email: string,
    password: string,
    role: string = 'user'
  ) {
    const body = { username, email, password, role };
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  forgot(email: string) {
    return this.http.post(`${this.apiUrl}/forgot-password`, {
      email,
    });
  }

  checkResetPasswordToken(id: string | undefined, token: string | undefined) {
    const body = { id, token };
    return this.http.post(`${this.apiUrl}/verify-reset`, body as any);
  }
  resetPassword(id: string | undefined, token: string | undefined, password: string) {
    const body = { id, token, password };
    return this.http.post(`${this.apiUrl}/reset-password`, body);
  }

logout() {
  return this.http.post<{ message: string }>(`${this.apiUrl}/logout`, {}).pipe(
    tap(response => console.log(response.message)),
    catchError(error => {
      console.error('Logout failed:', error);
      return throwError(() => new Error('Logout failed'));
    })
  );
}
sendInvitationEmail(email: string) {
  const body = { email };
  return this.http.post(`${this.apiUrl}/send-invitation-email`, body);
}
}
